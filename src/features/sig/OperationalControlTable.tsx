import type { OperationalControlRow } from '@/content/sig.controls';

export function OperationalControlTable({ rows }: { rows: readonly OperationalControlRow[] }) {
  const processes = [...new Set(rows.map((row) => row.process))];

  return (
    <div className="space-y-6">
      {processes.map((process) => {
        const group = rows.filter((row) => row.process === process);
        const number = group[0]?.processNumber;
        return (
          <section
            key={process}
            className="overflow-x-auto rounded-[var(--radius-card)] border border-brand-plum/15"
          >
            <h3 className="bg-brand-plum px-4 py-2 text-sm font-semibold text-white">
              {number}. {process}
            </h3>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-brand-cream text-left">
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
          </section>
        );
      })}
    </div>
  );
}
