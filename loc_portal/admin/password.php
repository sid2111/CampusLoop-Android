<?php
/** Admin: change own password. */
require __DIR__ . '/../lib/app.php';
$u = require_role('admin');
require_csrf();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $st = db()->prepare('SELECT * FROM admins WHERE id = ?');
    $st->execute([$u['id']]);
    $admin = $st->fetch();
    $new = (string) ($_POST['new'] ?? '');
    if (!$admin || !password_verify((string) ($_POST['current'] ?? ''), $admin['password_hash'])) {
        flash('error', 'Current password is incorrect.');
    } elseif (strlen($new) < 8) {
        flash('error', 'New password must be at least 8 characters.');
    } elseif ($new !== (string) ($_POST['confirm'] ?? '')) {
        flash('error', 'New password and confirmation do not match.');
    } else {
        db()->prepare('UPDATE admins SET password_hash = ? WHERE id = ?')
            ->execute([password_hash($new, PASSWORD_DEFAULT), $u['id']]);
        flash('success', 'Admin password changed.');
        redirect(base_url() . '/admin/index.php');
    }
    redirect(base_url() . '/admin/password.php');
}
render_header('Change Admin Password');
?>
<div class="card login">
  <form method="post" autocomplete="off">
    <?= csrf_field() ?>
    <label>Current password</label><input type="password" name="current" required>
    <label>New password</label><input type="password" name="new" required minlength="8">
    <label>Confirm new password</label><input type="password" name="confirm" required minlength="8">
    <div class="actions"><button class="btn" type="submit">Change password</button></div>
  </form>
</div>
<?php render_footer();
