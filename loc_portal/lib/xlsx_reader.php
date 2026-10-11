<?php
/**
 * Minimal XLSX reader (no external dependencies).
 * Reads the first worksheet and returns an array of rows (arrays of strings).
 * Supports shared strings, inline strings and plain numeric values.
 */
declare(strict_types=1);

function xlsx_read_rows(string $path): array
{
    if (!is_file($path)) {
        throw new RuntimeException("Excel file not found: $path");
    }
    $zip = new ZipArchive();
    if ($zip->open($path) !== true) {
        throw new RuntimeException('Could not open Excel file (is it a valid .xlsx?).');
    }

    // Shared strings (optional).
    $shared = [];
    $ssXml = $zip->getFromName('xl/sharedStrings.xml');
    if ($ssXml !== false) {
        $ss = new SimpleXMLElement($ssXml);
        $ss->registerXPathNamespace('m', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main');
        foreach ($ss->si as $si) {
            $shared[] = xlsx_text($si);
        }
    }

    // Locate the first sheet via workbook rels; fall back to sheet1.xml.
    $sheetPath = 'xl/worksheets/sheet1.xml';
    $wbXml = $zip->getFromName('xl/workbook.xml');
    $relXml = $zip->getFromName('xl/_rels/workbook.xml.rels');
    if ($wbXml !== false && $relXml !== false) {
        $wb = new SimpleXMLElement($wbXml);
        $first = $wb->sheets->sheet[0] ?? null;
        if ($first !== null) {
            $rid = (string) $first->attributes('http://schemas.openxmlformats.org/officeDocument/2006/relationships')->id;
            $rels = new SimpleXMLElement($relXml);
            foreach ($rels->Relationship as $rel) {
                if ((string) $rel['Id'] === $rid) {
                    $target = ltrim((string) $rel['Target'], '/');
                    $sheetPath = str_starts_with($target, 'xl/') ? $target : 'xl/' . $target;
                }
            }
        }
    }

    $sheetXml = $zip->getFromName($sheetPath);
    $zip->close();
    if ($sheetXml === false) {
        throw new RuntimeException('Worksheet not found inside Excel file.');
    }

    $sheet = new SimpleXMLElement($sheetXml);
    $rows = [];
    foreach ($sheet->sheetData->row as $row) {
        $cells = [];
        $maxIdx = -1;
        foreach ($row->c as $c) {
            $ref = (string) $c['r'];
            $idx = xlsx_col_index(preg_replace('/\d+/', '', $ref));
            $type = (string) $c['t'];
            if ($type === 'inlineStr') {
                $val = xlsx_text($c->is);
            } elseif ($type === 's') {
                $val = $shared[(int) $c->v] ?? '';
            } elseif ($type === 'b') {
                $val = ((string) $c->v === '1') ? 'TRUE' : 'FALSE';
            } else {
                $val = isset($c->v) ? (string) $c->v : '';
                // Normalise scientific notation produced for long numbers.
                if ($val !== '' && preg_match('/^-?\d+(\.\d+)?E[+-]?\d+$/i', $val)) {
                    $val = number_format((float) $val, 0, '', '');
                }
            }
            $cells[$idx] = trim($val);
            $maxIdx = max($maxIdx, $idx);
        }
        $out = [];
        for ($i = 0; $i <= $maxIdx; $i++) {
            $out[] = $cells[$i] ?? '';
        }
        $rows[] = $out;
    }
    return $rows;
}

function xlsx_text(SimpleXMLElement $node): string
{
    $parts = [];
    foreach ($node->xpath('.//*[local-name()="t"]') as $t) {
        $parts[] = (string) $t;
    }
    return implode('', $parts);
}

function xlsx_col_index(string $letters): int
{
    $n = 0;
    foreach (str_split(strtoupper($letters)) as $ch) {
        $n = $n * 26 + (ord($ch) - 64);
    }
    return $n - 1;
}
