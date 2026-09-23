import * as XLSX from 'xlsx';

export interface ExportColumn {
  key: string;
  label: string;
}

/**
 * Export tabular data to an Excel (.xlsx) file using SheetJS (XLSX).
 * Only the provided records and columns are exported.
 */
export function exportToExcel(
  data: Record<string, any>[],
  filename: string,
  columns: ExportColumn[],
  sheetName = 'Sheet1'
): void {
  const rows = data.map((item) => {
    const row: Record<string, any> = {};
    columns.forEach((col) => {
      const val = item[col.key];
      row[col.label] = val !== undefined && val !== null ? val : '';
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName.slice(0, 31));
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

/**
 * Export tabular data to a RFC 4180 compliant CSV file with UTF-8 BOM.
 * Excel and Google Sheets open this immediately with proper character encodings.
 */
export function exportToCSV(
  data: Record<string, any>[],
  filename: string,
  columns: ExportColumn[]
): void {
  const headerLine = columns.map((c) => `"${c.label.replace(/"/g, '""')}"`).join(',');

  const rowLines = data.map((item) => {
    return columns
      .map((col) => {
        const rawVal = item[col.key];
        const val = rawVal !== undefined && rawVal !== null ? String(rawVal) : '';
        return `"${val.replace(/"/g, '""')}"`;
      })
      .join(',');
  });

  // \uFEFF is the UTF-8 Byte Order Mark (BOM) to force Excel to parse as UTF-8
  const csvContent = '\uFEFF' + [headerLine, ...rowLines].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
