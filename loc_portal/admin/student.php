<?php
/** Admin: view one student's full data and documents; upload/replace/delete on their behalf; reset password. */
require __DIR__ . '/../lib/app.php';
require_role('admin');

$id = (int) ($_GET['id'] ?? 0);
$student = get_student($id);
if (!$student) {
    http_response_code(404);
    exit('Student not found');
}
$docTypes = config('documents');
$fields = config('student_fields');
$b = base_url();

require_csrf();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'upload') {
        $saved = 0;
        foreach ($docTypes as $key => $label) {
            if (!isset($_FILES[$key])) continue;
            $err = store_document($id, $key, $_FILES[$key], 'admin');
            if ($err !== null) flash('error', $err);
            elseif (($_FILES[$key]['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) $saved++;
        }
        if ($saved) flash('success', "$saved document(s) uploaded.");
    } elseif ($action === 'delete') {
        $key = (string) ($_POST['doc'] ?? '');
        if (isset($docTypes[$key])) {
            delete_document($id, $key);
            flash('success', $docTypes[$key] . ' deleted.');
        }
    } elseif ($action === 'reset_password') {
        $st = db()->prepare("UPDATE students SET password_hash = ?, updated_at = datetime('now') WHERE id = ?");
        $st->execute([password_hash($student['admission_no'], PASSWORD_DEFAULT), $id]);
        flash('success', 'Password reset to the admission number (' . $student['admission_no'] . ').');
    }
    redirect(base_url() . '/admin/student.php?id=' . $id);
}

$docs = student_documents($id);
render_header($student['name'] . ' (' . $student['admission_no'] . ')');
?>
<div class="actions">
  <a class="btn secondary" href="<?= h($b) ?>/admin/index.php">&larr; Back to list</a>
  <form method="post" style="display:inline" onsubmit="return confirm('Reset this student\'s password to their admission number?')">
    <?= csrf_field() ?><input type="hidden" name="action" value="reset_password">
    <button class="btn secondary" type="submit">Reset password to admission no.</button>
  </form>
</div>

<div class="card">
  <h2 style="margin-top:0">Student Details</h2>
  <dl class="details">
    <?php foreach ($fields as $col => $label): ?>
      <div><dt><?= h($label) ?></dt><dd><?= $student[$col] !== '' ? h($student[$col]) : '<span class="muted">—</span>' ?></dd></div>
    <?php endforeach; ?>
    <div><dt>Username</dt><dd><?= h($student['admission_no']) ?></dd></div>
  </dl>
</div>

<h2>Documents</h2>
<form method="post" enctype="multipart/form-data">
  <?= csrf_field() ?><input type="hidden" name="action" value="upload">
  <div class="doc-grid">
    <?php foreach ($docTypes as $key => $label): $d = $docs[$key] ?? null; ?>
      <div class="doc">
        <h3><?= h($label) ?>
          <?php if ($d): ?><span class="badge ok">Uploaded</span><?php else: ?><span class="badge missing">Pending</span><?php endif; ?>
        </h3>
        <?php if ($d): ?>
          <div class="meta"><?= h($d['original_name']) ?> · <?= format_bytes((int) $d['size']) ?> · <?= h($d['uploaded_at']) ?> · by <?= h($d['uploaded_by']) ?></div>
          <div class="row">
            <a class="btn small secondary" href="<?= h($b) ?>/download.php?student=<?= $id ?>&amp;doc=<?= h($key) ?>&amp;inline=1" target="_blank">View</a>
            <a class="btn small secondary" href="<?= h($b) ?>/download.php?student=<?= $id ?>&amp;doc=<?= h($key) ?>">Download</a>
          </div>
        <?php endif; ?>
        <div class="row"><input type="file" name="<?= h($key) ?>" accept=".pdf,.jpg,.jpeg,.png"></div>
      </div>
    <?php endforeach; ?>
  </div>
  <div class="actions"><button class="btn" type="submit">Upload selected documents</button></div>
</form>

<?php if ($docs): ?>
<h2>Delete a document</h2>
<div class="actions">
<?php foreach ($docs as $key => $d): ?>
  <form method="post" onsubmit="return confirm('Delete <?= h($docTypes[$key]) ?>?')">
    <?= csrf_field() ?><input type="hidden" name="action" value="delete"><input type="hidden" name="doc" value="<?= h($key) ?>">
    <button class="btn small danger" type="submit">Delete <?= h($docTypes[$key]) ?></button>
  </form>
<?php endforeach; ?>
</div>
<?php endif; ?>
<?php render_footer();
