import { useState } from 'react';
import type { OperationalControlRow } from '@/content/sig.controls';

export function OperationalControlTable({ rows }: { rows: readonly OperationalControlRow[] }) {
  const processes = [...new Set(rows.map((row) => row.process))];
  const [selected, setSelected] = useState(processes[0] ?? '');
  const group = rows.filter((row) => row.process === selected);
  const number = group[0]?.processNumber;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(16rem,18rem)_minmax(0,1fr)] lg:items-start">
      <div>
        <p className="text-base leading-relaxed text-brand-plum-ink/85">
          Cinco procesos, tres controles cada uno. Abra un proceso para ver tipo, control y evidencia.
        </p>
        <div className="mt-4 flex flex-col gap-1">
          {processes.map((process) => {
            const processNumber = rows.find((row) => row.process === process)?.processNumber;
            return (
              <button
                key={process}
                type="button"
                onClick={() => setSelected(process)}
                aria-pressed={process === selected}
                className={`rounded-lg px-3 py-2 text-left text-sm leading-snug ${
                  process === selected
                    ? 'bg-brand-plum font-semibold text-white'
                    : 'text-brand-plum hover:bg-brand-cream'
                }`}
              >
                {processNumber}. {process}
              </button>
            );
          })}
        </div>
      </div>
      {group.length > 0 ? (
        <div className="overflow-x-auto">
          <h3 className="mb-3 text-lg font-semibold text-brand-plum-ink">
            {number}. {selected}
          </h3>
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="bg-brand-cream">
                <th className="px-4 py-2 text-sm font-semibold text-brand-plum">Tipo</th>
                <th className="px-4 py-2 text-sm font-semibold text-brand-plum">Control</th>
                <th className="px-4 py-2 text-sm font-semibold text-brand-plum">Evidencia</th>
              </tr>
            </thead>
            <tbody>
              {group.map((row) => (
                <tr key={`${row.process}-${row.type}-${row.control}`} className="odd:bg-white even:bg-brand-cream/40">
                  <td className="border-t border-brand-plum/10 px-4 py-2 text-sm font-medium text-brand-orange">
                    {row.type}
                  </td>
                  <td className="border-t border-brand-plum/10 px-4 py-2 text-sm text-brand-plum-ink">
                    {row.control}
                  </td>
                  <td className="border-t border-brand-plum/10 px-4 py-2 text-sm text-brand-muted">
                    {row.evidence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
