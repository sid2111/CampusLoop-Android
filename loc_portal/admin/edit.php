<?php
/** Admin: add a new student or edit every field of an existing one. */
require __DIR__ . '/../lib/app.php';
require_role('admin');
$b = base_url();
$fields = config('student_fields');

$id = isset($_GET['id']) ? (int) $_GET['id'] : null;
$student = $id ? get_student($id) : null;
if ($id && !$student) {
    http_response_code(404);
    exit('Student not found');
}
$isNew = $student === null;
$values = $student ?? blank_student();

require_csrf();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = [];
    foreach (array_keys($fields) as $col) {
        $input[$col] = (string) ($_POST[$col] ?? '');
    }
    $values = array_merge($values, $input);
    $newPassword = trim((string) ($_POST['new_password'] ?? ''));
    try {
        if ($newPassword !== '' && strlen($newPassword) < 6) {
            throw new RuntimeException('Password must be at least 6 characters.');
        }
        $saved = save_student($isNew ? null : $id, $input, $newPassword !== '' ? $newPassword : null);
        flash('success', $isNew
            ? 'Student ' . $saved['name'] . ' created. Username and password: ' . $saved['admission_no'] . ($newPassword !== '' ? ' (custom password set)' : '')
            : 'Student details saved.');
        redirect($b . '/admin/student.php?id=' . (int) $saved['id']);
    } catch (Throwable $e) {
        flash('error', $e->getMessage());
    }
}

$selects = [
    'gender'      => ['', 'Male', 'Female', 'Other'],
    'blood_group' => ['', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'aadhar_card' => ['', 'Yes', 'No'],
];
render_header($isNew ? 'Add Student' : 'Edit: ' . $student['name'] . ' (' . $student['admission_no'] . ')');
?>
<div class="actions">
  <?php if ($isNew): ?>
    <a class="btn secondary" href="<?= h($b) ?>/admin/index.php">&larr; Back to list</a>
  <?php else: ?>
    <a class="btn secondary" href="<?= h($b) ?>/admin/student.php?id=<?= $id ?>">&larr; Back to student</a>
  <?php endif; ?>
</div>
<form method="post" class="card">
  <?= csrf_field() ?>
  <div class="details form-grid">
    <?php foreach ($fields as $col => $label): ?>
      <div>
        <label for="f_<?= h($col) ?>"><?= h($label) ?><?= in_array($col, ['admission_no', 'name'], true) ? ' *' : '' ?></label>
        <?php if (isset($selects[$col]) && (in_array($values[$col], $selects[$col], true))): ?>
          <select id="f_<?= h($col) ?>" name="<?= h($col) ?>">
            <?php foreach ($selects[$col] as $opt): ?>
              <option value="<?= h($opt) ?>" <?= $values[$col] === $opt ? 'selected' : '' ?>><?= $opt === '' ? '—' : h($opt) ?></option>
            <?php endforeach; ?>
          </select>
        <?php else: ?>
          <input type="text" id="f_<?= h($col) ?>" name="<?= h($col) ?>" value="<?= h($values[$col]) ?>"
                 <?= in_array($col, ['admission_no', 'name'], true) ? 'required' : '' ?>>
        <?php endif; ?>
      </div>
    <?php endforeach; ?>
    <div>
      <label for="f_pw"><?= $isNew ? 'Password (leave blank to use the admission number)' : 'New password (leave blank to keep current)' ?></label>
      <input type="text" id="f_pw" name="new_password" autocomplete="off">
    </div>
  </div>
  <p class="muted">The admission number is the student's username. Changing it changes their login username; their password stays the same unless you set a new one.</p>
  <div class="actions">
    <button class="btn" type="submit"><?= $isNew ? 'Create student' : 'Save changes' ?></button>
  </div>
</form>
<?php render_footer();
