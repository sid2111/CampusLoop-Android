<?php
/** Admin: create/refresh students from an uploaded Excel sheet (same layout as data/Student_Info_Sheet.xlsx). */
require __DIR__ . '/../lib/app.php';
require_role('admin');
$b = base_url();

require_csrf();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (($_POST['source'] ?? '') === 'bundled') {
            $path = config('seed_excel');
        } else {
            $f = $_FILES['excel'] ?? null;
            if (!$f || $f['error'] !== UPLOAD_ERR_OK) {
                throw new RuntimeException('Please choose an .xlsx file to upload.');
            }
            $path = $f['tmp_name'];
        }
        $class = trim((string) ($_POST['class'] ?? ''));
        $section = trim((string) ($_POST['section'] ?? ''));
        $r = import_students_from_excel($path, $class !== '' ? $class : null, $section !== '' ? $section : null);
        flash('success', "Import finished: {$r['created']} created, {$r['updated']} updated, " . count($r['skipped']) . ' skipped.');
        foreach (array_slice($r['skipped'], 0, 10) as $skip) {
            flash('info', $skip);
        }
    } catch (Throwable $e) {
        flash('error', 'Import failed: ' . $e->getMessage());
    }
    redirect($b . '/admin/import.php');
}

render_header('Import Students from Excel');
?>
<div class="card">
  <p>The sheet must have the same headings as the original student info sheet
     (<em>S.No, Registration NO, Name, DOB, Address, Father Name, Phone, Mother Name, gender, house, …</em>).
     Each student's username and initial password is their <strong>Registration NO</strong> (admission number).
     Students already present are updated and keep their password and documents.</p>
  <form method="post" enctype="multipart/form-data">
    <?= csrf_field() ?>
    <label>Excel file (.xlsx)</label>
    <input type="file" name="excel" accept=".xlsx">
    <label>Only import class (optional)</label>
    <input type="text" name="class" value="IX" placeholder="e.g. IX">
    <label>Only import section (optional)</label>
    <input type="text" name="section" value="A" placeholder="e.g. A">
    <div class="actions">
      <button class="btn" type="submit" name="source" value="upload">Import uploaded file</button>
      <?php if (is_file(config('seed_excel'))): ?>
      <button class="btn secondary" type="submit" name="source" value="bundled">Import data/<?= h(basename(config('seed_excel'))) ?> from server</button>
      <?php endif; ?>
    </div>
  </form>
</div>
<?php render_footer();
