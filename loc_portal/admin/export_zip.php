<?php
/**
 * Admin: download a ZIP containing one folder per student (named after the
 * student) with their documents named exactly:
 *   Aadhar Card, Birth Certificate, Father Aadhar Card, Marksheet, Mother Aadhar Card
 * Also includes the Excel sheet of all details at the root.
 */
require __DIR__ . '/../lib/app.php';
require_role('admin');
set_time_limit(0);

$docTypes = config('documents');
$students = all_students();
$docsAll = all_documents();
$folders = student_folder_names($students);

$tmp = tempnam(sys_get_temp_dir(), 'loc_zip_');
$zip = new ZipArchive();
if ($zip->open($tmp, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
    http_response_code(500);
    exit('Could not create ZIP file.');
}

$rootDir = safe_name(config('class_label')) . ' LOC Documents';
$missingReport = [];

foreach ($students as $s) {
    $sid = (int) $s['id'];
    $folder = $rootDir . '/' . $folders[$sid];
    $zip->addEmptyDir($folder);
    $d = $docsAll[$sid] ?? [];
    foreach ($docTypes as $key => $label) {
        if (isset($d[$key]) && is_file(document_path($d[$key]))) {
            $ext = pathinfo($d[$key]['stored_name'], PATHINFO_EXTENSION);
            $zip->addFile(document_path($d[$key]), $folder . '/' . safe_name($label) . '.' . $ext);
        } else {
            $missingReport[] = $s['admission_no'] . "\t" . $s['name'] . "\t" . $label;
        }
    }
}

// Excel of all details at the root of the ZIP.
$fields = config('student_fields');
$headers = array_values($fields);
$headers[] = 'Username';
foreach ($docTypes as $label) $headers[] = $label;
$rows = [];
foreach ($students as $s) {
    $row = [];
    foreach (array_keys($fields) as $col) $row[] = $s[$col];
    $row[] = $s['admission_no'];
    $d = $docsAll[(int) $s['id']] ?? [];
    foreach ($docTypes as $key => $label) $row[] = isset($d[$key]) ? 'Uploaded' : 'Pending';
    $rows[] = $row;
}
$xlsxTmp = tempnam(sys_get_temp_dir(), 'loc_xlsx_');
xlsx_write($xlsxTmp, $headers, $rows, 'Class IX A');
$zip->addFile($xlsxTmp, $rootDir . '/Student_Details.xlsx');

if ($missingReport) {
    $zip->addFromString($rootDir . '/MISSING_DOCUMENTS.txt',
        "Admission No\tName\tMissing Document\n" . implode("\n", $missingReport) . "\n");
}
$zip->close();
unlink($xlsxTmp);

$name = safe_name(config('class_label')) . '_LOC_Documents_' . date('Y-m-d') . '.zip';
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . str_replace(' ', '_', $name) . '"');
header('Content-Length: ' . filesize($tmp));
readfile($tmp);
unlink($tmp);
