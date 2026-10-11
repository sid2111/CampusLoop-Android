<?php
/** Admin: list of all students with document status, exports. */
require __DIR__ . '/../lib/app.php';
require_role('admin');

$students = all_students();
$docsAll = all_documents();
$docTypes = config('documents');
$nDocs = count($docTypes);
$b = base_url();

$q = trim((string) ($_GET['q'] ?? ''));
if ($q !== '') {
    $students = array_values(array_filter($students, function ($s) use ($q) {
        return stripos($s['name'], $q) !== false
            || stripos($s['admission_no'], $q) !== false
            || stripos($s['father_name'], $q) !== false;
    }));
}

$complete = $partial = $none = 0;
foreach ($students as $s) {
    $n = count($docsAll[(int) $s['id']] ?? []);
    if ($n === $nDocs) $complete++;
    elseif ($n === 0) $none++;
    else $partial++;
}

render_header('Students – ' . config('class_label'));
?>
<div class="summary">
  <div class="stat"><b><?= count($students) ?></b><span>Students</span></div>
  <div class="stat"><b><?= $complete ?></b><span>All documents uploaded</span></div>
  <div class="stat"><b><?= $partial ?></b><span>Partially uploaded</span></div>
  <div class="stat"><b><?= $none ?></b><span>Nothing uploaded</span></div>
</div>

<div class="actions">
  <a class="btn" href="<?= h($b) ?>/admin/export_excel.php">Download Excel (all details)</a>
  <a class="btn" href="<?= h($b) ?>/admin/export_zip.php">Download ZIP (student folders)</a>
  <a class="btn secondary" href="<?= h($b) ?>/admin/import.php">Import students from Excel</a>
  <a class="btn secondary" href="<?= h($b) ?>/admin/edit.php">Add student</a>
</div>

<form class="search" method="get">
  <input type="text" name="q" value="<?= h($q) ?>" placeholder="Search by name, admission no. or father name">
  <button class="btn small" type="submit">Search</button>
  <?php if ($q !== ''): ?><a class="btn small secondary" href="<?= h($b) ?>/admin/index.php">Clear</a><?php endif; ?>
</form>

<div class="table-wrap">
<table>
  <thead>
    <tr>
      <th>S.No</th><th>Admission No</th><th>Name</th><th>Father Name</th><th>Phone</th><th>Status</th>
      <?php foreach ($docTypes as $label): ?><th><?= h($label) ?></th><?php endforeach; ?>
      <th>Uploaded</th><th></th>
    </tr>
  </thead>
  <tbody>
  <?php foreach ($students as $s): $d = $docsAll[(int) $s['id']] ?? []; $n = count($d); ?>
    <tr>
      <td><?= h($s['sno']) ?></td>
      <td><?= h($s['admission_no']) ?></td>
      <td><a href="<?= h($b) ?>/admin/student.php?id=<?= (int) $s['id'] ?>"><?= h($s['name']) ?></a></td>
      <td><?= h($s['father_name']) ?></td>
      <td><?= h($s['phone']) ?></td>
      <td><?= h($s['status']) ?></td>
      <?php foreach ($docTypes as $key => $label): ?>
        <td><?php if (isset($d[$key])): ?>
          <a class="badge ok" href="<?= h($b) ?>/download.php?student=<?= (int) $s['id'] ?>&amp;doc=<?= h($key) ?>&amp;inline=1" target="_blank">Yes</a>
        <?php else: ?><span class="badge missing">No</span><?php endif; ?></td>
      <?php endforeach; ?>
      <td><span class="badge <?= $n === $nDocs ? 'ok' : ($n ? 'partial' : 'missing') ?>"><?= $n ?>/<?= $nDocs ?></span></td>
      <td style="white-space:nowrap"><a class="btn small secondary" href="<?= h($b) ?>/admin/student.php?id=<?= (int) $s['id'] ?>">View</a>
          <a class="btn small secondary" href="<?= h($b) ?>/admin/edit.php?id=<?= (int) $s['id'] ?>">Edit</a></td>
    </tr>
  <?php endforeach; ?>
  <?php if (!$students): ?><tr><td colspan="<?= 8 + $nDocs ?>" class="muted">No students found. Use "Import students from Excel", "Add student", or place the sheet at data/Student_Info_Sheet.xlsx.</td></tr><?php endif; ?>
  </tbody>
</table>
</div>
<?php render_footer();
