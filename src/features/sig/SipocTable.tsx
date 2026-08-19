import type { SipocRow } from '@/content/sig.manifest';

export function SipocTable({ rows }: { rows: readonly SipocRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">
              Proveedor
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">
              Entradas
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">
              Proceso
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">
              Salida
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">
              Cliente
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                {row.provider}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                {row.input}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                {row.process}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                {row.output}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                {row.customer}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
