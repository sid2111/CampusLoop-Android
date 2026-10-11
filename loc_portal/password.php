<?php
/** Student: change own password. */
require __DIR__ . '/lib/app.php';
$u = require_role('student');
require_csrf();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $current = (string) ($_POST['current'] ?? '');
    $new = (string) ($_POST['new'] ?? '');
    $confirm = (string) ($_POST['confirm'] ?? '');
    $student = get_student($u['id']);
    if (!$student || !password_verify($current, $student['password_hash'])) {
        flash('error', 'Current password is incorrect.');
    } elseif (strlen($new) < 6) {
        flash('error', 'New password must be at least 6 characters.');
    } elseif ($new !== $confirm) {
        flash('error', 'New password and confirmation do not match.');
    } else {
        $st = db()->prepare("UPDATE students SET password_hash = ?, updated_at = datetime('now') WHERE id = ?");
        $st->execute([password_hash($new, PASSWORD_DEFAULT), $u['id']]);
        flash('success', 'Password changed.');
        redirect(base_url() . '/student.php');
    }
    redirect(base_url() . '/password.php');
}
render_header('Change Password');
?>
<div class="card login">
  <form method="post" autocomplete="off">
    <?= csrf_field() ?>
    <label>Current password</label><input type="password" name="current" required>
    <label>New password</label><input type="password" name="new" required minlength="6">
    <label>Confirm new password</label><input type="password" name="confirm" required minlength="6">
    <div class="actions"><button class="btn" type="submit">Change password</button></div>
  </form>
</div>
<?php render_footer();
