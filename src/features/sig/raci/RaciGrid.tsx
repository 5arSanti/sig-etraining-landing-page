import { useState } from 'react';
import type { RaciSheet } from './parseRaciWorkbook';
import { classifyRaciCell } from './parseRaciWorkbook';

interface RaciGridProps {
  sheets: RaciSheet[];
}

export function RaciGrid({ sheets }: RaciGridProps) {
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const activeSheet = sheets[activeSheetIndex];

  if (!activeSheet) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-brand-charcoal">Leyenda RACI</h3>
        <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded bg-green-100 text-center font-bold text-green-800">R</span>
            <span className="text-brand-charcoal">Responsable (ejecuta; puede haber varios)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded bg-brand-orange text-center font-bold text-white">A</span>
            <span className="text-brand-charcoal">A cargo (aprueba; uno por actividad)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded bg-brand-amber text-center font-bold text-brand-charcoal">C</span>
            <span className="text-brand-charcoal">Consultado</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded bg-gray-100 text-center font-bold text-gray-600">I</span>
            <span className="text-brand-charcoal">Informado</span>
          </div>
        </div>
      </div>

      {sheets.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {sheets.map((sheet, index) => (
            <button
              type="button"
              key={sheet.name}
              onClick={() => setActiveSheetIndex(index)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                index === activeSheetIndex
                  ? 'bg-brand-orange text-white'
                  : 'bg-white text-brand-charcoal hover:bg-gray-50'
              }`}
            >
              {sheet.name}
            </button>
          ))}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <tbody className="divide-y divide-gray-200">
            {activeSheet.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  const raciType = classifyRaciCell(cell);
                  let cellClassName = 'px-4 py-2 whitespace-nowrap';
                  
                  if (raciType === 'R') {
                    cellClassName += ' bg-green-100 text-green-800 font-bold text-center';
                  } else if (raciType === 'A') {
                    cellClassName += ' bg-brand-orange text-white font-bold text-center';
                  } else if (raciType === 'C') {
                    cellClassName += ' bg-brand-amber text-brand-charcoal font-bold text-center';
                  } else if (raciType === 'I') {
                    cellClassName += ' bg-gray-100 text-gray-600 font-bold text-center';
                  } else {
                    cellClassName += ' text-brand-charcoal';
                  }

                  return (
                    <td key={cellIndex} className={cellClassName}>
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
