import { Fragment, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import {
  INDICATOR_FILTERS,
  INDICATOR_SUMMARY,
  SIG_INDICATORS,
  type IndicatorComponent,
  type SigIndicator,
} from '@/content/sig.indicators';

const FILTER_LABEL: Record<IndicatorComponent, string> = {
  ambiental: 'Ambiental',
  sst: 'SST',
  informacion: 'Información',
  procesos: 'Procesos',
};

function deltaLabel(row: SigIndicator): string {
  const delta = row.result - row.baseline;
  const sign = delta > 0 ? '+' : '';
  return `${sign}${delta} ${row.unit}`;
}

export function IndicatorDashboard() {
  const [filter, setFilter] = useState<'todos' | IndicatorComponent>('todos');
  const [openCode, setOpenCode] = useState<string | null>(null);
  const visible = SIG_INDICATORS.filter((row) => filter === 'todos' || row.component === filter);
  const percentRows = visible.filter((row) => row.unit !== 'n');
  const countRows = visible.filter((row) => row.unit === 'n');
  const chips = useMemo(
    () =>
      (['ambiental', 'sst', 'informacion', 'procesos'] as IndicatorComponent[]).map((component) => {
        const group = SIG_INDICATORS.filter((row) => row.component === component);
        const meeting = group.filter((row) => row.status === 'Cumple').length;
        return `${FILTER_LABEL[component]} ${meeting} de ${group.length}`;
      }),
    [],
  );

  return (
    <div className="space-y-6">
      <p className="text-lg font-semibold text-brand-plum-ink">
        {INDICATOR_SUMMARY.meetingTarget} de {INDICATOR_SUMMARY.total} cumplen meta
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-[var(--radius-pill)] bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-plum"
          >
            {chip}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {INDICATOR_FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`rounded-[var(--radius-pill)] px-3 py-1.5 text-sm font-semibold ${
              filter === item.id
                ? 'bg-brand-plum text-white'
                : 'bg-white text-brand-plum ring-1 ring-brand-plum/20'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {percentRows.length > 0 ? (
        <div className="overflow-x-auto" aria-hidden="true">
          <BarChart width={720} height={320} data={percentRows}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="code" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="baseline" name="Línea base" fill="#5f2157" />
            <Bar dataKey="result" name="Resultado" fill="#f7941d" />
            <Bar dataKey="target" name="Meta" fill="#ffcb05" />
          </BarChart>
        </div>
      ) : null}
      {countRows.length > 0 ? (
        <div className="overflow-x-auto" aria-hidden="true">
          <p className="mb-2 text-sm font-semibold text-brand-plum">Incidentes reportados (conteo)</p>
          <BarChart width={360} height={240} data={countRows}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="code" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="baseline" name="Línea base" fill="#5f2157" />
            <Bar dataKey="result" name="Resultado" fill="#f7941d" />
            <Bar dataKey="target" name="Meta" fill="#ffcb05" />
          </BarChart>
        </div>
      ) : null}
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-brand-plum/15">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-brand-plum text-white">
            <tr>
              <th className="px-3 py-2">Código</th>
              <th className="px-3 py-2">Indicador</th>
              <th className="px-3 py-2">Sep</th>
              <th className="px-3 py-2">Oct</th>
              <th className="px-3 py-2">Meta</th>
              <th className="px-3 py-2">Δ</th>
              <th className="px-3 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <Fragment key={row.code}>
                <tr className="odd:bg-white even:bg-brand-cream/40">
                  <td className="border-t border-brand-plum/10 px-3 py-2 font-semibold">{row.code}</td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">
                    <button
                      type="button"
                      className="text-left font-medium text-brand-plum hover:text-brand-orange"
                      onClick={() => setOpenCode(openCode === row.code ? null : row.code)}
                    >
                      {row.name}
                    </button>
                  </td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">
                    {row.baseline} {row.unit}
                  </td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">
                    {row.result} {row.unit}
                  </td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">
                    {row.target} {row.unit}
                  </td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">{deltaLabel(row)}</td>
                  <td
                    className={`border-t border-brand-plum/10 px-3 py-2 font-medium ${
                      row.status === 'Cumple' ? 'text-emerald-800' : 'text-brand-orange'
                    }`}
                  >
                    {row.status}
                  </td>
                </tr>
                {openCode === row.code ? (
                  <tr>
                    <td colSpan={7} className="bg-brand-cream px-4 py-3 text-sm text-brand-plum-ink/85">
                      <p>
                        <strong>Fórmula:</strong> {row.formula}
                      </p>
                      <p>
                        <strong>Fuente:</strong> {row.source}
                      </p>
                      <p>
                        <strong>Responsable:</strong> {row.owner}
                      </p>
                      <p>
                        <strong>Interpretación:</strong> {row.interpretation}
                      </p>
                      <p>
                        <strong>Acción:</strong> {row.action}
                      </p>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
