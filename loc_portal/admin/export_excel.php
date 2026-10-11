<?php
/**
 * Admin: download an Excel sheet with every student's details (same columns
 * as the original sheet) plus username and document upload status.
 */
require __DIR__ . '/../lib/app.php';
require_role('admin');

$fields = config('student_fields');
$docTypes = config('documents');
$students = all_students();
$docsAll = all_documents();

$headers = array_values($fields);
$headers[] = 'Username';
foreach ($docTypes as $label) {
    $headers[] = $label;
}
$headers[] = 'Documents Uploaded';
$headers[] = 'Last Upload';

$rows = [];
foreach ($students as $s) {
    $row = [];
    foreach (array_keys($fields) as $col) {
        $row[] = $s[$col];
    }
    $row[] = $s['admission_no'];
    $d = $docsAll[(int) $s['id']] ?? [];
    $last = '';
    foreach ($docTypes as $key => $label) {
        if (isset($d[$key])) {
            $row[] = 'Uploaded (' . $d[$key]['uploaded_at'] . ')';
            $last = max($last, $d[$key]['uploaded_at']);
        } else {
            $row[] = 'Pending';
        }
    }
    $row[] = count($d) . ' / ' . count($docTypes);
    $row[] = $last;
    $rows[] = $row;
}

$tmp = tempnam(sys_get_temp_dir(), 'loc_xlsx_');
xlsx_write($tmp, $headers, $rows, 'Class IX A');
$name = 'LOC_Students_' . preg_replace('/[^A-Za-z0-9]+/', '_', config('class_label')) . '_' . date('Y-m-d') . '.xlsx';

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment; filename="' . $name . '"');
header('Content-Length: ' . filesize($tmp));
readfile($tmp);
unlink($tmp);
