<?php
/**
 * Student import, document storage and export helpers.
 */
declare(strict_types=1);

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
        $k = $norm($heading);
        $colFor[$db] = $headerIdx[$k] ?? null;
    }
    if ($colFor['admission_no'] === null || $colFor['name'] === null) {
        throw new RuntimeException('Excel must contain "Registration NO" and "Name" columns.');
    }

    $pdo = db();
    $created = $updated = 0;
    $skipped = [];

    $find = $pdo->prepare('SELECT id FROM students WHERE admission_no = ? COLLATE NOCASE');
    $cols = array_keys($fields);
    $insert = $pdo->prepare(
        'INSERT INTO students (' . implode(',', $cols) . ', password_hash) VALUES ('
        . implode(',', array_fill(0, count($cols), '?')) . ', ?)'
    );
    $updateSql = 'UPDATE students SET ' . implode(', ', array_map(fn($c) => "$c = ?", $cols))
        . ", updated_at = datetime('now') WHERE id = ?";
    $update = $pdo->prepare($updateSql);

    $pdo->beginTransaction();
    try {
        for ($r = 1; $r < count($rows); $r++) {
            $row = $rows[$r];
            $values = [];
            foreach ($cols as $c) {
                $idx = $colFor[$c];
                $v = $idx === null ? '' : (string) ($row[$idx] ?? '');
                $values[$c] = clean_cell($c, $v);
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

            $find->execute([$values['admission_no']]);
            $existing = $find->fetchColumn();
            if ($existing) {
                $update->execute([...array_values($values), (int) $existing]);
                $updated++;
            } else {
                $insert->execute([...array_values($values), password_hash($values['admission_no'], PASSWORD_DEFAULT)]);
                $created++;
            }
        }
        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        throw $e;
    }
    return ['created' => $created, 'updated' => $updated, 'skipped' => $skipped];
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
// Students
// ---------------------------------------------------------------------
function get_student(int $id): ?array
{
    $st = db()->prepare('SELECT * FROM students WHERE id = ?');
    $st->execute([$id]);
    $row = $st->fetch();
    return $row ?: null;
}

function all_students(): array
{
    return db()->query('SELECT * FROM students ORDER BY CAST(sno AS INTEGER), name')->fetchAll();
}

/** @return array<string, array> doc_type => document row */
function student_documents(int $studentId): array
{
    $st = db()->prepare('SELECT * FROM documents WHERE student_id = ?');
    $st->execute([$studentId]);
    $out = [];
    foreach ($st->fetchAll() as $d) {
        $out[$d['doc_type']] = $d;
    }
    return $out;
}

/** @return array<int, array<string, array>> student_id => (doc_type => row) */
function all_documents(): array
{
    $out = [];
    foreach (db()->query('SELECT * FROM documents')->fetchAll() as $d) {
        $out[(int) $d['student_id']][$d['doc_type']] = $d;
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
    $allowed = config('allowed_mime');
    if (!isset($allowed[$mime])) {
        return $docs[$docType] . ': only PDF, JPG or PNG files are allowed (got ' . $mime . ').';
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

    $st = db()->prepare(
        'INSERT INTO documents (student_id, doc_type, original_name, stored_name, mime, size, uploaded_by, uploaded_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, datetime(\'now\'))
         ON CONFLICT(student_id, doc_type) DO UPDATE SET
            original_name = excluded.original_name,
            stored_name   = excluded.stored_name,
            mime          = excluded.mime,
            size          = excluded.size,
            uploaded_by   = excluded.uploaded_by,
            uploaded_at   = excluded.uploaded_at'
    );
    $st->execute([
        $studentId, $docType,
        mb_substr(basename((string) $file['name']), 0, 200),
        $stored, $mime, (int) $file['size'], $uploadedBy,
    ]);
    return null;
}

function delete_document(int $studentId, string $docType): void
{
    $docs = student_documents($studentId);
    if (isset($docs[$docType])) {
        @unlink(document_path($docs[$docType]));
        $st = db()->prepare('DELETE FROM documents WHERE student_id = ? AND doc_type = ?');
        $st->execute([$studentId, $docType]);
    }
}

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
