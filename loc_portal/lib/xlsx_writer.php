<?php
/**
 * Minimal XLSX writer (no external dependencies).
 * xlsx_write($path, $headers, $rows, $sheetName) creates a single-sheet
 * workbook with a bold header row and auto column widths.
 */
declare(strict_types=1);

function xlsx_write(string $path, array $headers, array $rows, string $sheetName = 'Sheet1'): void
{
    $zip = new ZipArchive();
    if ($zip->open($path, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
        throw new RuntimeException('Could not create Excel file.');
    }

    $zip->addFromString('[Content_Types].xml',
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        . '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        . '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        . '<Default Extension="xml" ContentType="application/xml"/>'
        . '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
        . '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        . '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'
        . '</Types>');

    $zip->addFromString('_rels/.rels',
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        . '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        . '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
        . '</Relationships>');

    $zip->addFromString('xl/workbook.xml',
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        . '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        . '<sheets><sheet name="' . xlsx_esc(mb_substr($sheetName, 0, 31)) . '" sheetId="1" r:id="rId1"/></sheets>'
        . '</workbook>');

    $zip->addFromString('xl/_rels/workbook.xml.rels',
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        . '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        . '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'
        . '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
        . '</Relationships>');

    // Style 0 = normal, style 1 = bold header.
    $zip->addFromString('xl/styles.xml',
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        . '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        . '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>'
        . '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>'
        . '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'
        . '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
        . '<cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs>'
        . '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>'
        . '</styleSheet>');

    // Column widths.
    $widths = [];
    foreach ($headers as $i => $hdr) {
        $widths[$i] = mb_strlen((string) $hdr);
    }
    foreach ($rows as $row) {
        foreach (array_values($row) as $i => $v) {
            $widths[$i] = max($widths[$i] ?? 0, min(60, mb_strlen((string) $v)));
        }
    }
    $cols = '<cols>';
    foreach ($widths as $i => $w) {
        $cols .= '<col min="' . ($i + 1) . '" max="' . ($i + 1) . '" width="' . ($w + 2) . '" customWidth="1"/>';
    }
    $cols .= '</cols>';

    $sheet = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        . '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        . '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>'
        . $cols . '<sheetData>';
    $sheet .= xlsx_row(1, $headers, 1);
    $r = 2;
    foreach ($rows as $row) {
        $sheet .= xlsx_row($r++, array_values($row), 0);
    }
    $sheet .= '</sheetData></worksheet>';
    $zip->addFromString('xl/worksheets/sheet1.xml', $sheet);
    $zip->close();
}

function xlsx_row(int $r, array $values, int $style): string
{
    $out = '<row r="' . $r . '">';
    foreach ($values as $i => $v) {
        $ref = xlsx_col_letters($i) . $r;
        $v = (string) $v;
        $s = $style ? ' s="' . $style . '"' : '';
        if ($v === '') {
            continue;
        }
        // Keep IDs/phone numbers as text so Excel doesn't mangle them.
        $out .= '<c r="' . $ref . '" t="inlineStr"' . $s . '><is><t xml:space="preserve">' . xlsx_esc($v) . '</t></is></c>';
    }
    return $out . '</row>';
}

function xlsx_col_letters(int $idx): string
{
    $s = '';
    $idx++;
    while ($idx > 0) {
        $m = ($idx - 1) % 26;
        $s = chr(65 + $m) . $s;
        $idx = intdiv($idx - 1, 26);
    }
    return $s;
}

function xlsx_esc(string $s): string
{
    // Strip control chars not allowed in XML.
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', '', $s);
    return htmlspecialchars($s, ENT_XML1 | ENT_QUOTES, 'UTF-8');
}
