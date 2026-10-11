<?php
/**
 * Login page for students (admission number as username AND password)
 * and for the admin.
 */
require __DIR__ . '/lib/app.php';

$u = current_user();
if ($u) {
    redirect(base_url() . ($u['role'] === 'admin' ? '/admin/index.php' : '/student.php'));
}

require_csrf();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim((string) ($_POST['username'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');
    $role = $_POST['role'] ?? 'student';
    if ($username === '' || $password === '') {
        flash('error', 'Please enter both username and password.');
    } elseif ($role === 'admin' && login_admin($username, $password)) {
        redirect(base_url() . '/admin/index.php');
    } elseif ($role === 'student' && login_student($username, $password)) {
        redirect(base_url() . '/student.php');
    } else {
        flash('error', 'Invalid username or password.');
    }
    redirect(base_url() . '/index.php?role=' . urlencode($role));
}

$role = ($_GET['role'] ?? 'student') === 'admin' ? 'admin' : 'student';
render_header('Login');
?>
<div class="card login">
  <p class="muted">
    <?php if ($role === 'student'): ?>
      Students: log in with your <strong>admission number</strong> as both username and password
      (for example <code>16-8152</code>).
    <?php else: ?>
      Administrator login.
    <?php endif; ?>
  </p>
  <form method="post" autocomplete="off">
    <?= csrf_field() ?>
    <input type="hidden" name="role" value="<?= h($role) ?>">
    <label for="username"><?= $role === 'student' ? 'Admission number' : 'Username' ?></label>
    <input type="text" id="username" name="username" required autofocus>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required>
    <div class="actions">
      <button class="btn" type="submit">Login</button>
      <?php if ($role === 'student'): ?>
        <a class="btn secondary" href="?role=admin">Admin login</a>
      <?php else: ?>
        <a class="btn secondary" href="?role=student">Student login</a>
      <?php endif; ?>
    </div>
  </form>
</div>
<?php render_footer();
