<?php
/**
 * Student dashboard: view own details and upload LOC documents.
 */
require __DIR__ . '/lib/app.php';
$u = require_role('student');
$student = get_student($u['id']);
if (!$student) {
    logout();
    redirect(base_url() . '/index.php');
}
$docTypes = config('documents');

require_csrf();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = [];
    $saved = 0;
    foreach ($docTypes as $key => $label) {
        if (!isset($_FILES[$key])) {
            continue;
        }
        $err = store_document((int) $student['id'], $key, $_FILES[$key], 'student');
        if ($err !== null) {
            $errors[] = $err;
        } elseif (($_FILES[$key]['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) {
            $saved++;
        }
    }
    foreach ($errors as $e) {
        flash('error', $e);
    }
    if ($saved > 0) {
        flash('success', "$saved document(s) uploaded successfully.");
    } elseif (!$errors) {
        flash('info', 'No file was selected.');
    }
    redirect(base_url() . '/student.php');
}

$docs = student_documents((int) $student['id']);
$fields = config('student_fields');
$b = base_url();
render_header('My LOC Documents');
?>
<div class="card">
  <h2 style="margin-top:0">My Details</h2>
  <dl class="details">
    <?php foreach ($fields as $col => $label): ?>
      <div><dt><?= h($label) ?></dt><dd><?= h($student[$col]) !== '' ? h($student[$col]) : '<span class="muted">—</span>' ?></dd></div>
    <?php endforeach; ?>
  </dl>
</div>

<h2>Upload Documents</h2>
<p class="muted">Accepted formats: PDF, JPG, PNG (max <?= round(config('max_upload_bytes') / 1048576) ?> MB each).
   Uploading again replaces the earlier file.</p>
<form method="post" enctype="multipart/form-data">
  <?= csrf_field() ?>
  <div class="doc-grid">
    <?php foreach ($docTypes as $key => $label): $d = $docs[$key] ?? null; ?>
      <div class="doc">
        <h3><?= h($label) ?>
          <?php if ($d): ?><span class="badge ok">Uploaded</span><?php else: ?><span class="badge missing">Pending</span><?php endif; ?>
        </h3>
        <?php if ($d): ?>
          <div class="meta"><?= h($d['original_name']) ?> · <?= format_bytes((int) $d['size']) ?> · <?= h($d['uploaded_at']) ?></div>
          <a class="btn small secondary" href="<?= h($b) ?>/download.php?student=<?= (int) $student['id'] ?>&amp;doc=<?= h($key) ?>">View / Download</a>
        <?php endif; ?>
        <div class="row"><input type="file" name="<?= h($key) ?>" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"></div>
      </div>
    <?php endforeach; ?>
  </div>
  <div class="actions"><button class="btn" type="submit">Upload selected documents</button></div>
</form>
<?php render_footer();
