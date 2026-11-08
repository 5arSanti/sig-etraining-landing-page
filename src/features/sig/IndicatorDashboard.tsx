import { Fragment, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import {
  INDICATOR_ACTION_PLAN,
  INDICATOR_FILTERS,
  INDICATOR_READ_GUIDE,
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

const CHART_SENSE: Record<IndicatorComponent, string> = {
  ambiental: 'A1 y A2 deben quedar por debajo de la meta; A3 debe superarla.',
  sst: 'S1, S2 y S3 deben alcanzar o superar la barra ámbar.',
  informacion: 'I1 e I3 deben superar la meta; I2 (conteo) debe quedar por debajo.',
  procesos: 'P1, P2 y P3 deben alcanzar o superar la barra ámbar.',
};

function deltaLabel(row: SigIndicator): string {
  const delta = row.result - row.baseline;
  const sign = delta > 0 ? '+' : '';
  return `${sign}${delta} ${row.unit}`;
}

function ChartBlock({
  title,
  rows,
  width,
  height,
}: {
  title: string;
  rows: SigIndicator[];
  width: number;
  height: number;
}) {
  if (rows.length === 0) return null;
  return (
    <div className="overflow-x-auto">
      <p className="mb-3 text-sm font-semibold text-brand-plum">{title}</p>
      <BarChart width={width} height={height} data={rows}>
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
  );
}

export function IndicatorDashboard() {
  const [filter, setFilter] = useState<'todos' | IndicatorComponent>('ambiental');
  const [openCode, setOpenCode] = useState<string | null>(null);
  const visible = SIG_INDICATORS.filter((row) => filter === 'todos' || row.component === filter);
  const percentRows = visible.filter((row) => row.unit !== 'n');
  const countRows = visible.filter((row) => row.unit === 'n');
  const balance = useMemo(
    () =>
      (['ambiental', 'sst', 'informacion', 'procesos'] as IndicatorComponent[]).map((component) => {
        const group = SIG_INDICATORS.filter((row) => row.component === component);
        const meeting = group.filter((row) => row.status === 'Cumple').length;
        return { component, label: FILTER_LABEL[component], meeting, total: group.length };
      }),
    [],
  );

  const meetingList = INDICATOR_SUMMARY.meetingCodes.join(', ');

  return (
    <div className="space-y-12">
      <section className="max-w-3xl space-y-3">
        <h2 className="text-xl font-bold text-brand-plum-ink">Cómo leer estas gráficas</h2>
        <p className="text-base leading-relaxed text-brand-plum-ink/85">{INDICATOR_READ_GUIDE}</p>
      </section>

      <section className="space-y-4">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-xl font-bold text-brand-plum-ink">Balance de los resultados</h2>
          <p className="text-lg font-semibold text-brand-plum-ink">
            {INDICATOR_SUMMARY.meetingTarget} de {INDICATOR_SUMMARY.total} cumplen meta
          </p>
          <p className="text-base leading-relaxed text-brand-plum-ink/85">
            Los doce indicadores avanzaron respecto de septiembre. Solo {meetingList} alcanzaron la
            meta. Cada componente queda en 1 de 3; el 33,3 % no describe el avance general de la
            empresa.
          </p>
        </div>
        <table className="max-w-xl text-left text-sm">
          <thead>
            <tr className="border-b border-brand-plum/15 text-brand-plum">
              <th className="py-2 pr-4 font-semibold">Componente</th>
              <th className="py-2 pr-4 font-semibold">Cumplen</th>
              <th className="py-2 font-semibold">Metas</th>
            </tr>
          </thead>
          <tbody>
            {balance.map((row) => (
              <tr key={row.component} className="border-b border-brand-plum/10">
                <td className="py-2 pr-4">{row.label}</td>
                <td className="py-2 pr-4">
                  {row.meeting} de {row.total}
                </td>
                <td className="py-2">33,3 %</td>
              </tr>
            ))}
            <tr className="font-semibold text-brand-plum-ink">
              <td className="py-2 pr-4">Total</td>
              <td className="py-2 pr-4">
                {INDICATOR_SUMMARY.meetingTarget} de {INDICATOR_SUMMARY.total}
              </td>
              <td className="py-2">33,3 %</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="space-y-5">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-xl font-bold text-brand-plum-ink">Recorrido por componente</h2>
          <p className="text-base leading-relaxed text-brand-plum-ink/85">
            El informe agrupa tres indicadores por perspectiva. Empiece por ambiental, como el
            documento, y abra una fila para ver fórmula, interpretación y acción.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {INDICATOR_FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setFilter(item.id);
                setOpenCode(null);
              }}
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
        {filter !== 'todos' ? (
          <p className="text-sm text-brand-muted">{CHART_SENSE[filter]}</p>
        ) : (
          <p className="text-sm text-brand-muted">
            Los porcentajes van juntos; I2 (incidentes) se grafica aparte porque es un conteo, no un
            porcentaje.
          </p>
        )}
        <ChartBlock
          title={
            filter === 'todos'
              ? 'Porcentajes: línea base, octubre y meta'
              : `${FILTER_LABEL[filter]}: línea base, octubre y meta`
          }
          rows={percentRows}
          width={filter === 'todos' ? 720 : 520}
          height={280}
        />
        <ChartBlock
          title="Incidentes reportados (conteo)"
          rows={countRows}
          width={360}
          height={240}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm" aria-label="Indicadores del componente">
            <thead className="bg-brand-plum text-white">
              <tr>
                <th className="px-3 py-2 font-semibold">Código</th>
                <th className="px-3 py-2 font-semibold">Indicador</th>
                <th className="px-3 py-2 font-semibold">Sep</th>
                <th className="px-3 py-2 font-semibold">Oct</th>
                <th className="px-3 py-2 font-semibold">Meta</th>
                <th className="px-3 py-2 font-semibold">Δ</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
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
      </section>

      <section className="space-y-4">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-xl font-bold text-brand-plum-ink">Plan de acción</h2>
          <p className="text-base leading-relaxed text-brand-plum-ink/85">
            El informe cierra con prioridades para la siguiente medición. Si un resultado sigue
            fuera de meta, hay que analizar la causa; no basta con repetir la misma actividad.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm" aria-label="Plan de acción">
            <thead className="bg-brand-plum text-white">
              <tr>
                <th className="px-3 py-2 font-semibold">Prioridad</th>
                <th className="px-3 py-2 font-semibold">Hallazgo</th>
                <th className="px-3 py-2 font-semibold">Acción</th>
                <th className="px-3 py-2 font-semibold">Responsable</th>
                <th className="px-3 py-2 font-semibold">Plazo</th>
              </tr>
            </thead>
            <tbody>
              {INDICATOR_ACTION_PLAN.map((row) => (
                <tr key={row.finding} className="odd:bg-white even:bg-brand-cream/40">
                  <td className="border-t border-brand-plum/10 px-3 py-2 font-medium text-brand-orange">
                    {row.priority}
                  </td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">{row.finding}</td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">{row.action}</td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">{row.owner}</td>
                  <td className="border-t border-brand-plum/10 px-3 py-2">{row.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
