<?php
/**
 * Application bootstrap: config, database, session and helpers.
 * Every page starts with: require __DIR__ . '/../lib/app.php';
 */
declare(strict_types=1);

define('APP_ROOT', dirname(__DIR__));

$CONFIG = require APP_ROOT . '/config.php';

require_once __DIR__ . '/store.php';
require_once __DIR__ . '/xlsx_reader.php';
require_once __DIR__ . '/xlsx_writer.php';
require_once __DIR__ . '/students.php';

// ---------------------------------------------------------------------
// Session
// ---------------------------------------------------------------------
if (PHP_SAPI !== 'cli' && session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'httponly' => true,
        'samesite' => 'Lax',
        'secure'   => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    ]);
    session_start();
}

// ---------------------------------------------------------------------
// Storage (JSON files – see lib/store.php) and default admin account
// ---------------------------------------------------------------------
function admins_all(): array
{
    $admins = store_read('admins', []);
    if (!$admins) {
        global $CONFIG;
        $admins = store_update('admins', function ($cur) use ($CONFIG) {
            if ($cur) {
                return $cur;
            }
            return [[
                'id'            => 1,
                'username'      => $CONFIG['admin_username'],
                'password_hash' => password_hash($CONFIG['admin_password'], PASSWORD_DEFAULT),
                'created_at'    => gmdate('Y-m-d H:i:s'),
            ]];
        }, []);
    }
    return $admins;
}

function admin_find(int $id): ?array
{
    foreach (admins_all() as $a) {
        if ((int) $a['id'] === $id) {
            return $a;
        }
    }
    return null;
}

function admin_set_password(int $id, string $password): void
{
    store_update('admins', function ($admins) use ($id, $password) {
        foreach ($admins as &$a) {
            if ((int) $a['id'] === $id) {
                $a['password_hash'] = password_hash($password, PASSWORD_DEFAULT);
            }
        }
        return $admins;
    }, []);
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------
function h(?string $s): string
{
    return htmlspecialchars((string) $s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function config(string $key)
{
    global $CONFIG;
    return $CONFIG[$key] ?? null;
}

function redirect(string $to): never
{
    header('Location: ' . $to);
    exit;
}

function flash(string $type, string $message): void
{
    $_SESSION['flash'][] = [$type, $message];
}

function take_flashes(): array
{
    $f = $_SESSION['flash'] ?? [];
    unset($_SESSION['flash']);
    return $f;
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(16));
    }
    return $_SESSION['csrf'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="csrf" value="' . h(csrf_token()) . '">';
}

function require_csrf(): void
{
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!hash_equals(csrf_token(), (string) ($_POST['csrf'] ?? ''))) {
            http_response_code(400);
            exit('Invalid form token. Please go back and try again.');
        }
    }
}

// ---------------------------------------------------------------------
// Authentication
// ---------------------------------------------------------------------
function current_user(): ?array
{
    return $_SESSION['user'] ?? null;
}

function login_student(string $username, string $password): bool
{
    $row = find_student_by_admission_no($username);
    if ($row && password_verify($password, $row['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['user'] = ['role' => 'student', 'id' => (int) $row['id'], 'name' => $row['name']];
        return true;
    }
    return false;
}

function login_admin(string $username, string $password): bool
{
    $row = null;
    foreach (admins_all() as $a) {
        if (strcasecmp($a['username'], trim($username)) === 0) {
            $row = $a;
        }
    }
    if ($row && password_verify($password, $row['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['user'] = ['role' => 'admin', 'id' => (int) $row['id'], 'name' => $row['username']];
        return true;
    }
    return false;
}

function logout(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
}

function require_role(string $role): array
{
    $u = current_user();
    if (!$u || $u['role'] !== $role) {
        redirect(base_url() . '/index.php');
    }
    return $u;
}

/** URL prefix of the portal root (e.g. "/loc_portal"), without trailing slash. */
function base_url(): string
{
    static $base = null;
    if ($base !== null) {
        return $base;
    }
    $script = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '/');
    $docRel = str_replace('\\', '/', dirname($script));
    // If we're inside /admin, strip it.
    if (preg_match('#/admin$#', $docRel)) {
        $docRel = substr($docRel, 0, -6);
    }
    $base = rtrim($docRel, '/');
    return $base;
}

// ---------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------
function render_header(string $title): void
{
    $u = current_user();
    $b = base_url();
    $school = h(config('school_name'));
    $portal = h(config('portal_name'));
    echo "<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\">";
    echo "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";
    echo '<title>' . h($title) . " – $portal</title>";
    echo '<link rel="stylesheet" href="' . h($b) . '/assets/style.css">';
    echo "</head><body><header class=\"top\"><div class=\"brand\"><strong>$school</strong><span>$portal · " . h(config('class_label')) . '</span></div>';
    echo '<nav>';
    if ($u) {
        if ($u['role'] === 'admin') {
            echo '<a href="' . h($b) . '/admin/index.php">Students</a>';
            echo '<a href="' . h($b) . '/admin/edit.php">Add student</a>';
            echo '<a href="' . h($b) . '/admin/import.php">Import</a>';
            echo '<a href="' . h($b) . '/admin/password.php">Password</a>';
        } else {
            echo '<a href="' . h($b) . '/student.php">My Documents</a>';
            echo '<a href="' . h($b) . '/password.php">Password</a>';
        }
        echo '<span class="who">' . h($u['name']) . '</span>';
        echo '<a class="btn small" href="' . h($b) . '/logout.php">Logout</a>';
    }
    echo '</nav></header><main>';
    foreach (take_flashes() as [$type, $msg]) {
        echo '<div class="flash ' . h($type) . '">' . h($msg) . '</div>';
    }
    echo '<h1>' . h($title) . '</h1>';
}

function render_footer(): void
{
    echo '</main><footer>' . h(config('school_name')) . ' · ' . h(config('portal_name')) . '</footer></body></html>';
}
