<?php
/**
 * Student records, import, document storage and export helpers.
 * Data lives in storage/students.json and storage/documents.json.
 */
declare(strict_types=1);

// ---------------------------------------------------------------------
// Students
// ---------------------------------------------------------------------
function students_store(): array
{
    $s = store_read('students', ['next_id' => 1, 'items' => []]);
    $s['next_id'] = (int) ($s['next_id'] ?? 1);
    $s['items'] = $s['items'] ?? [];
    return $s;
}

/** All students sorted by S.No then name. */
function all_students(): array
{
    $items = array_values(students_store()['items']);
    usort($items, function ($a, $b) {
        $x = (int) $a['sno'];
        $y = (int) $b['sno'];
        if ($x === $y || $x === 0 || $y === 0) {
            if ($x !== $y) {
                return $x === 0 ? 1 : -1; // students without S.No go last
            }
            return strcasecmp($a['name'], $b['name']);
        }
        return $x <=> $y;
    });
    return $items;
}

function get_student(int $id): ?array
{
    return students_store()['items'][(string) $id] ?? null;
}

function find_student_by_admission_no(string $admissionNo): ?array
{
    $admissionNo = trim($admissionNo);
    foreach (students_store()['items'] as $s) {
        if (strcasecmp($s['admission_no'], $admissionNo) === 0) {
            return $s;
        }
    }
    return null;
}

/** Blank record with every configured field. */
function blank_student(): array
{
    $rec = [];
    foreach (array_keys(config('student_fields')) as $col) {
        $rec[$col] = '';
    }
    return $rec;
}

/**
 * Create or update a student. $fields holds student_fields columns.
 * Returns the saved record. Throws on duplicate / missing admission number.
 */
function save_student(?int $id, array $fields, ?string $newPassword = null): array
{
    $cols = array_keys(config('student_fields'));
    $clean = [];
    foreach ($cols as $c) {
        $clean[$c] = clean_cell($c, (string) ($fields[$c] ?? ''));
    }
    if ($clean['admission_no'] === '') {
        throw new RuntimeException('Admission number is required.');
    }
    if ($clean['name'] === '') {
        throw new RuntimeException('Name is required.');
    }

    $saved = null;
    store_update('students', function ($store) use ($id, $clean, $newPassword, &$saved) {
        $store['next_id'] = (int) ($store['next_id'] ?? 1);
        $store['items'] = $store['items'] ?? [];
        foreach ($store['items'] as $sid => $s) {
            if ((int) $sid !== (int) $id && strcasecmp($s['admission_no'], $clean['admission_no']) === 0) {
                throw new RuntimeException('Another student already has admission number ' . $clean['admission_no'] . '.');
            }
        }
        $now = gmdate('Y-m-d H:i:s');
        if ($id !== null && isset($store['items'][(string) $id])) {
            $rec = array_merge($store['items'][(string) $id], $clean);
            $rec['updated_at'] = $now;
            if ($newPassword !== null && $newPassword !== '') {
                $rec['password_hash'] = password_hash($newPassword, PASSWORD_DEFAULT);
            }
        } else {
            $id = $store['next_id']++;
            $rec = $clean;
            $rec['id'] = $id;
            $rec['password_hash'] = password_hash($newPassword !== null && $newPassword !== '' ? $newPassword : $clean['admission_no'], PASSWORD_DEFAULT);
            $rec['created_at'] = $now;
            $rec['updated_at'] = $now;
        }
        $store['items'][(string) $id] = $rec;
        $saved = $rec;
        return $store;
    }, ['next_id' => 1, 'items' => []]);
    return $saved;
}

function set_student_password(int $id, string $password): void
{
    store_update('students', function ($store) use ($id, $password) {
        if (isset($store['items'][(string) $id])) {
            $store['items'][(string) $id]['password_hash'] = password_hash($password, PASSWORD_DEFAULT);
            $store['items'][(string) $id]['updated_at'] = gmdate('Y-m-d H:i:s');
        }
        return $store;
    }, ['next_id' => 1, 'items' => []]);
}

/** Delete a student together with all uploaded documents. */
function delete_student(int $id): void
{
    foreach (array_keys(student_documents($id)) as $docType) {
        delete_document($id, $docType);
    }
    $dir = rtrim(config('upload_dir'), '/') . '/' . $id;
    if (is_dir($dir)) {
        foreach (glob($dir . '/*') ?: [] as $f) {
            @unlink($f);
        }
        @rmdir($dir);
    }
    store_update('students', function ($store) use ($id) {
        unset($store['items'][(string) $id]);
        return $store;
    }, ['next_id' => 1, 'items' => []]);
}

// ---------------------------------------------------------------------
// Excel import
// ---------------------------------------------------------------------
/**
 * Import students from an Excel sheet laid out like data/Student_Info_Sheet.xlsx.
 * Username and initial password are both the admission (registration) number.
 * Existing students (same admission number) are updated; their password and
 * uploaded documents are kept.
 *
 * @return array{created:int, updated:int, skipped:array}
 */
function import_students_from_excel(string $path, ?string $onlyClass = null, ?string $onlySection = null): array
{
    $fields = config('student_fields');
    $rows = xlsx_read_rows($path);
    if (count($rows) < 2) {
        throw new RuntimeException('The Excel sheet has no data rows.');
    }

    // Map headings (case/space-insensitive) -> column index.
    $norm = fn(string $s) => strtolower(preg_replace('/[^a-z0-9]+/i', '', $s));
    $headerIdx = [];
    foreach ($rows[0] as $i => $heading) {
        $headerIdx[$norm($heading)] = $i;
    }
    $colFor = [];
    foreach ($fields as $db => $heading) {
        $colFor[$db] = $headerIdx[$norm($heading)] ?? null;
    }
    if ($colFor['admission_no'] === null || $colFor['name'] === null) {
        throw new RuntimeException('Excel must contain "Registration NO" and "Name" columns.');
    }

    $created = $updated = 0;
    $skipped = [];
    $cols = array_keys($fields);

    store_update('students', function ($store) use ($rows, $cols, $colFor, $onlyClass, $onlySection, &$created, &$updated, &$skipped) {
        $store['next_id'] = (int) ($store['next_id'] ?? 1);
        $store['items'] = $store['items'] ?? [];
        $byAdm = [];
        foreach ($store['items'] as $sid => $s) {
            $byAdm[strtolower($s['admission_no'])] = (string) $sid;
        }
        $now = gmdate('Y-m-d H:i:s');

        for ($r = 1; $r < count($rows); $r++) {
            $row = $rows[$r];
            $values = [];
            foreach ($cols as $c) {
                $idx = $colFor[$c];
                $values[$c] = clean_cell($c, $idx === null ? '' : (string) ($row[$idx] ?? ''));
            }
            if ($values['admission_no'] === '' && $values['name'] === '') {
                continue; // blank row
            }
            if ($values['admission_no'] === '') {
                $skipped[] = 'Row ' . ($r + 1) . ': missing admission number';
                continue;
            }
            if ($onlyClass !== null && strcasecmp($values['class'], $onlyClass) !== 0) {
                $skipped[] = 'Row ' . ($r + 1) . ': class ' . $values['class'] . ' not ' . $onlyClass;
                continue;
            }
            if ($onlySection !== null && strcasecmp($values['section'], $onlySection) !== 0) {
                $skipped[] = 'Row ' . ($r + 1) . ': section ' . $values['section'] . ' not ' . $onlySection;
                continue;
            }

            $key = strtolower($values['admission_no']);
            if (isset($byAdm[$key])) {
                $sid = $byAdm[$key];
                $store['items'][$sid] = array_merge($store['items'][$sid], $values, ['updated_at' => $now]);
                $updated++;
            } else {
                $id = $store['next_id']++;
                $rec = $values;
                $rec['id'] = $id;
                $rec['password_hash'] = password_hash($values['admission_no'], PASSWORD_DEFAULT);
                $rec['created_at'] = $now;
                $rec['updated_at'] = $now;
                $store['items'][(string) $id] = $rec;
                $byAdm[$key] = (string) $id;
                $created++;
            }
        }
        return $store;
    }, ['next_id' => 1, 'items' => []]);

    return ['created' => $created, 'updated' => $updated, 'skipped' => $skipped];
}

/** Import the bundled sheet automatically when the portal is still empty. */
function auto_seed_if_empty(): ?array
{
    $file = config('seed_excel');
    if (!$file || !is_file($file) || students_store()['items']) {
        return null;
    }
    return import_students_from_excel($file, 'IX', 'A');
}

function clean_cell(string $col, string $v): string
{
    $v = trim(preg_replace('/\s+/u', ' ', $v));
    if ($col === 'phone' && ($v === '0' || $v === '0.0')) {
        $v = '';
    }
    if (in_array($col, ['phone', 'mother_aadhar', 'father_aadhar', 'udise', 'sno'], true)
        && preg_match('/^\d+\.0+$/', $v)) {
        $v = (string) (int) $v;
    }
    return $v;
}

// ---------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------
/** @return array<string, array> doc_type => document record */
function student_documents(int $studentId): array
{
    return store_read('documents', [])[(string) $studentId] ?? [];
}

/** @return array<int, array<string, array>> student_id => (doc_type => record) */
function all_documents(): array
{
    $out = [];
    foreach (store_read('documents', []) as $sid => $docs) {
        $out[(int) $sid] = $docs;
    }
    return $out;
}

function student_upload_dir(int $studentId): string
{
    $dir = rtrim(config('upload_dir'), '/') . '/' . $studentId;
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
    return $dir;
}

function document_path(array $doc): string
{
    return rtrim(config('upload_dir'), '/') . '/' . (int) $doc['student_id'] . '/' . $doc['stored_name'];
}

/** Allowed mime => extension map for a given document type. */
function allowed_mime_for(string $docType): array
{
    $allowed = config('allowed_mime');
    if (in_array($docType, config('image_only_documents') ?? [], true)) {
        $allowed = array_filter($allowed, fn($m) => str_starts_with($m, 'image/'), ARRAY_FILTER_USE_KEY);
    }
    return $allowed;
}

/**
 * Validate and store an uploaded file for a student/document type.
 * Returns an error message, or null on success.
 */
function store_document(int $studentId, string $docType, array $file, string $uploadedBy): ?string
{
    $docs = config('documents');
    if (!isset($docs[$docType])) {
        return 'Unknown document type.';
    }
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null; // nothing chosen for this field – not an error
    }
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return $docs[$docType] . ': upload failed (error code ' . $file['error'] . ').';
    }
    if ($file['size'] > config('max_upload_bytes')) {
        return $docs[$docType] . ': file is larger than ' . round(config('max_upload_bytes') / 1048576) . ' MB.';
    }
    if (!is_uploaded_file($file['tmp_name'])) {
        return $docs[$docType] . ': invalid upload.';
    }
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = (string) $finfo->file($file['tmp_name']);
    $allowed = allowed_mime_for($docType);
    if (!isset($allowed[$mime])) {
        $kinds = implode('/', array_map('strtoupper', array_unique(array_values($allowed))));
        return $docs[$docType] . ": only $kinds files are allowed (got $mime).";
    }
    $ext = $allowed[$mime];
    $dir = student_upload_dir($studentId);
    $stored = $docType . '.' . $ext;

    // Remove any previous version (possibly with a different extension).
    foreach (glob($dir . '/' . $docType . '.*') ?: [] as $old) {
        @unlink($old);
    }
    if (!move_uploaded_file($file['tmp_name'], $dir . '/' . $stored)) {
        return $docs[$docType] . ': could not save file on server.';
    }

    $record = [
        'student_id'    => $studentId,
        'doc_type'      => $docType,
        'original_name' => mb_substr(basename((string) $file['name']), 0, 200),
        'stored_name'   => $stored,
        'mime'          => $mime,
        'size'          => (int) $file['size'],
        'uploaded_by'   => $uploadedBy,
        'uploaded_at'   => gmdate('Y-m-d H:i:s'),
    ];
    store_update('documents', function ($all) use ($studentId, $docType, $record) {
        $all[(string) $studentId][$docType] = $record;
        return $all;
    }, []);
    return null;
}

function delete_document(int $studentId, string $docType): void
{
    $docs = student_documents($studentId);
    if (isset($docs[$docType])) {
        @unlink(document_path($docs[$docType]));
        store_update('documents', function ($all) use ($studentId, $docType) {
            unset($all[(string) $studentId][$docType]);
            if (empty($all[(string) $studentId])) {
                unset($all[(string) $studentId]);
            }
            return $all;
        }, []);
    }
}

// ---------------------------------------------------------------------
// Export helpers
// ---------------------------------------------------------------------
/** Safe folder/file name for ZIP entries (keeps spaces, strips path chars). */
function safe_name(string $s): string
{
    $s = preg_replace('/[\\\\\/:*?"<>|\x00-\x1F]+/', ' ', $s);
    $s = trim(preg_replace('/\s+/u', ' ', $s), " .");
    return $s === '' ? 'Unnamed' : $s;
}

/**
 * Folder name per student for the ZIP export: the student's name, with the
 * admission number appended only when two students share a name.
 * @return array<int, string> student_id => folder name
 */
function student_folder_names(array $students): array
{
    $byName = [];
    foreach ($students as $s) {
        $byName[strtolower(safe_name($s['name']))][] = $s;
    }
    $out = [];
    foreach ($byName as $group) {
        foreach ($group as $s) {
            $folder = safe_name($s['name']);
            if (count($group) > 1) {
                $folder .= ' (' . safe_name($s['admission_no']) . ')';
            }
            $out[(int) $s['id']] = $folder;
        }
    }
    return $out;
}

function format_bytes(int $b): string
{
    if ($b >= 1048576) {
        return round($b / 1048576, 1) . ' MB';
    }
    if ($b >= 1024) {
        return round($b / 1024) . ' KB';
    }
    return $b . ' B';
}
