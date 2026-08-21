import type { SipocRow } from '@/content/sig.manifest';

export function SipocTable({ rows }: { rows: readonly SipocRow[] }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-brand-plum/15">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-brand-plum text-left text-white">
            <th className="px-4 py-2 text-sm font-semibold">Proveedor</th>
            <th className="px-4 py-2 text-sm font-semibold">Entradas</th>
            <th className="px-4 py-2 text-sm font-semibold">Proceso</th>
            <th className="px-4 py-2 text-sm font-semibold">Salida</th>
            <th className="px-4 py-2 text-sm font-semibold">Cliente</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.provider}-${row.process}`} className="odd:bg-white even:bg-brand-cream">
              <td className="border-t border-brand-plum/10 px-4 py-2 text-sm text-brand-plum-ink">
                {row.provider}
              </td>
              <td className="border-t border-brand-plum/10 px-4 py-2 text-sm text-brand-plum-ink">
                {row.input}
              </td>
              <td className="border-t border-brand-plum/10 px-4 py-2 text-sm text-brand-plum-ink">
                {row.process}
              </td>
              <td className="border-t border-brand-plum/10 px-4 py-2 text-sm text-brand-plum-ink">
                {row.output}
              </td>
              <td className="border-t border-brand-plum/10 px-4 py-2 text-sm text-brand-plum-ink">
                {row.customer}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
