import React from "react";

export default function TableView({ table }) {
  if (!table) return null;

  // If table is an array of objects -> render columns from keys
  if (Array.isArray(table) && table.length > 0 && typeof table[0] === "object" && !Array.isArray(table[0])) {
    const columns = Object.keys(table[0]);
    return (
      <div className="mt-4 overflow-auto">
        <table className="min-w-full mt-3 border-collapse">
          <thead>
            <tr>{columns.map((c) => <th key={c} className="p-2 text-left border-b dark:border-gray-700">{c}</th>)}</tr>
          </thead>
          <tbody>
            {table.map((row, idx) => (
              <tr key={idx} className="odd:bg-gray-50 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-900">
                {columns.map(col => <td key={col} className="p-2 border-b dark:border-gray-700">{String(row[col])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // If table uses { columns: [...], rows: [[...], ...] }
  if (table.columns && table.rows) {
    return (
      <div className="mt-4 overflow-auto">
        <table className="min-w-full mt-3 border-collapse">
          <thead>
            <tr>{table.columns.map((c, i) => <th key={i} className="p-2 text-left border-b dark:border-gray-700">{c}</th>)}</tr>
          </thead>
          <tbody>
            {table.rows.map((row, rIdx) => (
              <tr key={rIdx} className="odd:bg-gray-50 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-900">
                {row.map((cell, cIdx) => <td key={cIdx} className="p-2 border-b dark:border-gray-700">{String(cell)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // fallback
  return <pre className="mt-3 text-sm text-gray-500">{JSON.stringify(table, null, 2)}</pre>;
}
