<?php
/**
 * Serve an uploaded document. Students may fetch their own files; the
 * admin may fetch any. Files are named "<Document Name>.<ext>" on download.
 */
require __DIR__ . '/lib/app.php';
$u = current_user();
if (!$u) {
    redirect(base_url() . '/index.php');
}
$studentId = (int) ($_GET['student'] ?? 0);
$docType = (string) ($_GET['doc'] ?? '');
if ($u['role'] === 'student' && $u['id'] !== $studentId) {
    http_response_code(403);
    exit('Forbidden');
}
$docs = student_documents($studentId);
$doc = $docs[$docType] ?? null;
$path = $doc ? document_path($doc) : '';
if (!$doc || !is_file($path)) {
    http_response_code(404);
    exit('Document not found');
}
$label = config('documents')[$docType] ?? $docType;
$ext = pathinfo($doc['stored_name'], PATHINFO_EXTENSION);
$filename = safe_name($label) . '.' . $ext;
$inline = isset($_GET['inline']);

header('Content-Type: ' . $doc['mime']);
header('Content-Length: ' . filesize($path));
header('Content-Disposition: ' . ($inline ? 'inline' : 'attachment') . '; filename="' . $filename . '"');
header('X-Content-Type-Options: nosniff');
readfile($path);
