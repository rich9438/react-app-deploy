/** Value types that can appear in a CSV cell. */
type Cell = string | number | null | undefined;

/**
 * Serialize rows to CSV and trigger a browser download.
 * Prepends a UTF-8 BOM so Excel renders Chinese characters correctly.
 * Ported from the original `downloadCsv`.
 */
export function downloadCsv(filename: string, rows: Cell[][]): void {
  const csv = rows
    .map((r) =>
      r
        .map((cell) => {
          const s = String(cell == null ? "" : cell);
          if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
          return s;
        })
        .join(","),
    )
    .join("\r\n");

  const blob = new Blob(["﻿" + csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
