<?php
/**
 * Tiny JSON file store – no database server or extension needed.
 * Each collection is one JSON file inside the storage directory. Writes are
 * serialised with a lock file and performed atomically (write temp + rename).
 */
declare(strict_types=1);

function store_dir(): string
{
    $dir = rtrim(config('storage_dir'), '/');
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
    return $dir;
}

function store_path(string $name): string
{
    return store_dir() . '/' . $name . '.json';
}

/** Read a collection (returns $default when the file does not exist yet). */
function store_read(string $name, $default = [])
{
    $path = store_path($name);
    if (!is_file($path)) {
        return $default;
    }
    $raw = file_get_contents($path);
    if ($raw === false || $raw === '') {
        return $default;
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : $default;
}

function store_write(string $name, $data): void
{
    $path = store_path($name);
    $tmp = $path . '.' . bin2hex(random_bytes(4)) . '.tmp';
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false || file_put_contents($tmp, $json, LOCK_EX) === false) {
        @unlink($tmp);
        throw new RuntimeException("Could not write $path – is the storage folder writable?");
    }
    if (!rename($tmp, $path)) {
        @unlink($tmp);
        throw new RuntimeException("Could not replace $path");
    }
}

/**
 * Read-modify-write a collection under an exclusive lock.
 * $fn receives the current data (by value) and must return the new data.
 */
function store_update(string $name, callable $fn, $default = [])
{
    $lock = fopen(store_dir() . '/.lock', 'c');
    if ($lock === false) {
        throw new RuntimeException('Could not open storage lock file.');
    }
    flock($lock, LOCK_EX);
    try {
        $data = store_read($name, $default);
        $data = $fn($data);
        store_write($name, $data);
        return $data;
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}
