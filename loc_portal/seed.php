<?php
/**
 * Create / refresh all Class IX A students from data/Student_Info_Sheet.xlsx.
 *
 *   php seed.php                 # import the Excel named in config.php
 *   php seed.php path/to.xlsx    # import another sheet
 *
 * Each student's username AND initial password = admission (registration)
 * number. Re-running is safe: existing students are updated in place and
 * keep their password and uploaded documents.
 */
require __DIR__ . '/lib/app.php';

if (PHP_SAPI !== 'cli') {
    // Allow running from the browser only for a logged-in admin.
    $u = current_user();
    if (!$u || $u['role'] !== 'admin') {
        http_response_code(403);
        exit('Run from the command line (php seed.php) or log in as admin.');
    }
    header('Content-Type: text/plain');
}

$file = $argv[1] ?? config('seed_excel');
$result = import_students_from_excel($file, 'IX', 'A');

echo "Imported from: $file\n";
echo "Created: {$result['created']}\n";
echo "Updated: {$result['updated']}\n";
if ($result['skipped']) {
    echo "Skipped:\n  " . implode("\n  ", $result['skipped']) . "\n";
}
echo "Total students in database: " . count(all_students()) . "\n";
echo "Admin login: " . config('admin_username') . " / " . config('admin_password') . " (change it after first login)\n";
