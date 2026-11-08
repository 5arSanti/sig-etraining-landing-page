import { Fragment, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
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

function useFigureWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(960);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => setWidth(Math.max(node.clientWidth, 320));
    update();

    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}

function ChartBlock({
  title,
  rows,
  height,
}: {
  title: string;
  rows: SigIndicator[];
  height: number;
}) {
  const { ref, width } = useFigureWidth();
  if (rows.length === 0) return null;

  return (
    <figure ref={ref} className="mx-auto w-full">
      <figcaption className="mb-5 text-center text-base font-semibold text-brand-plum">{title}</figcaption>
      <div className="flex justify-center">
        <BarChart
          width={width}
          height={height}
          data={rows}
          margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
          barCategoryGap="22%"
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ead9e4" />
          <XAxis dataKey="code" tick={{ fill: '#5f2157', fontSize: 14, fontWeight: 600 }} />
          <YAxis tick={{ fill: '#5f2157', fontSize: 12 }} width={48} />
          <Tooltip />
          <Legend wrapperStyle={{ paddingTop: 12 }} />
          <Bar dataKey="baseline" name="Línea base" fill="#5f2157" />
          <Bar dataKey="result" name="Resultado" fill="#f7941d" />
          <Bar dataKey="target" name="Meta" fill="#ffcb05" />
        </BarChart>
      </div>
    </figure>
  );
}

function ReportCopy({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[68ch] text-pretty">{children}</div>;
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
    <article className="flex flex-col gap-16 md:gap-20">
      <section>
        <ReportCopy>
          <h2 className="text-center text-2xl font-bold tracking-tight text-brand-plum-ink">
            Cómo leer estas gráficas
          </h2>
          <p className="mt-5 text-lg leading-8 text-brand-plum-ink/90">{INDICATOR_READ_GUIDE}</p>
        </ReportCopy>
      </section>

      <section className="border-t border-brand-plum/10 pt-16 md:pt-20">
        <ReportCopy>
          <h2 className="text-center text-2xl font-bold tracking-tight text-brand-plum-ink">
            Balance de los resultados
          </h2>
          <p className="mt-5 text-center text-2xl font-semibold text-brand-plum-ink">
            {INDICATOR_SUMMARY.meetingTarget} de {INDICATOR_SUMMARY.total} cumplen meta
          </p>
          <p className="mt-4 text-lg leading-8 text-brand-plum-ink/90">
            Los doce indicadores avanzaron respecto de septiembre. Solo {meetingList} alcanzaron la
            meta. Cada componente queda en 1 de 3; el 33,3 % no describe el avance general de la
            empresa.
          </p>
        </ReportCopy>
        <table className="mx-auto mt-10 w-full max-w-3xl text-left text-base">
          <thead>
            <tr className="border-b border-brand-plum/15 text-brand-plum">
              <th className="py-3 pr-6 font-semibold">Componente</th>
              <th className="py-3 pr-6 font-semibold">Cumplen</th>
              <th className="py-3 font-semibold">Metas</th>
            </tr>
          </thead>
          <tbody>
            {balance.map((row) => (
              <tr key={row.component} className="border-b border-brand-plum/10">
                <td className="py-3.5 pr-6">{row.label}</td>
                <td className="py-3.5 pr-6 tabular-nums">
                  {row.meeting} de {row.total}
                </td>
                <td className="py-3.5 tabular-nums">33,3 %</td>
              </tr>
            ))}
            <tr className="font-semibold text-brand-plum-ink">
              <td className="py-3.5 pr-6">Total</td>
              <td className="py-3.5 pr-6 tabular-nums">
                {INDICATOR_SUMMARY.meetingTarget} de {INDICATOR_SUMMARY.total}
              </td>
              <td className="py-3.5 tabular-nums">33,3 %</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="border-t border-brand-plum/10 pt-16 md:pt-20">
        <ReportCopy>
          <h2 className="text-center text-2xl font-bold tracking-tight text-brand-plum-ink">
            Recorrido por componente
          </h2>
          <p className="mt-5 text-lg leading-8 text-brand-plum-ink/90">
            El informe agrupa tres indicadores por perspectiva. Empiece por ambiental, como el
            documento, y abra una fila para ver fórmula, interpretación y acción.
          </p>
        </ReportCopy>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {INDICATOR_FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setFilter(item.id);
                setOpenCode(null);
              }}
              className={`min-h-11 rounded-[var(--radius-pill)] px-4 py-2 text-sm font-semibold ${
                filter === item.id
                  ? 'bg-brand-plum text-white'
                  : 'bg-white text-brand-plum ring-1 ring-brand-plum/20'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-[68ch] text-center text-base leading-7 text-brand-muted">
          {filter !== 'todos'
            ? CHART_SENSE[filter]
            : 'Los porcentajes van juntos; I2 (incidentes) se grafica aparte porque es un conteo, no un porcentaje.'}
        </p>
        <div className="mt-10">
          <ChartBlock
            title={
              filter === 'todos'
                ? 'Porcentajes: línea base, octubre y meta'
                : `${FILTER_LABEL[filter]}: línea base, octubre y meta`
            }
            rows={percentRows}
            height={400}
          />
        </div>
        <div className="mt-12">
          <ChartBlock title="Incidentes reportados (conteo)" rows={countRows} height={320} />
        </div>
        <div className="mt-12 overflow-x-auto">
          <table className="min-w-full text-left text-base" aria-label="Indicadores del componente">
            <thead className="bg-brand-plum text-white">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Código</th>
                <th className="px-5 py-3.5 font-semibold">Indicador</th>
                <th className="px-5 py-3.5 font-semibold">Sep</th>
                <th className="px-5 py-3.5 font-semibold">Oct</th>
                <th className="px-5 py-3.5 font-semibold">Meta</th>
                <th className="px-5 py-3.5 font-semibold">Δ</th>
                <th className="px-5 py-3.5 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <Fragment key={row.code}>
                  <tr className="odd:bg-white even:bg-brand-cream/40">
                    <td className="border-t border-brand-plum/10 px-5 py-3.5 font-semibold">{row.code}</td>
                    <td className="border-t border-brand-plum/10 px-5 py-3.5">
                      <button
                        type="button"
                        className="text-left font-medium text-brand-plum hover:text-brand-orange"
                        onClick={() => setOpenCode(openCode === row.code ? null : row.code)}
                      >
                        {row.name}
                      </button>
                    </td>
                    <td className="border-t border-brand-plum/10 px-5 py-3.5 tabular-nums">
                      {row.baseline} {row.unit}
                    </td>
                    <td className="border-t border-brand-plum/10 px-5 py-3.5 tabular-nums">
                      {row.result} {row.unit}
                    </td>
                    <td className="border-t border-brand-plum/10 px-5 py-3.5 tabular-nums">
                      {row.target} {row.unit}
                    </td>
                    <td className="border-t border-brand-plum/10 px-5 py-3.5 tabular-nums">{deltaLabel(row)}</td>
                    <td
                      className={`border-t border-brand-plum/10 px-5 py-3.5 font-medium ${
                        row.status === 'Cumple' ? 'text-emerald-800' : 'text-brand-orange'
                      }`}
                    >
                      {row.status}
                    </td>
                  </tr>
                  {openCode === row.code ? (
                    <tr>
                      <td colSpan={7} className="bg-brand-cream px-6 py-5 text-base leading-7 text-brand-plum-ink/90">
                        <p>
                          <strong>Fórmula:</strong> {row.formula}
                        </p>
                        <p className="mt-2">
                          <strong>Fuente:</strong> {row.source}
                        </p>
                        <p className="mt-2">
                          <strong>Responsable:</strong> {row.owner}
                        </p>
                        <p className="mt-2">
                          <strong>Interpretación:</strong> {row.interpretation}
                        </p>
                        <p className="mt-2">
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

      <section className="border-t border-brand-plum/10 pt-16 md:pt-20">
        <ReportCopy>
          <h2 className="text-center text-2xl font-bold tracking-tight text-brand-plum-ink">Plan de acción</h2>
          <p className="mt-5 text-lg leading-8 text-brand-plum-ink/90">
            El informe cierra con prioridades para la siguiente medición. Si un resultado sigue
            fuera de meta, hay que analizar la causa; no basta con repetir la misma actividad.
          </p>
        </ReportCopy>
        <div className="mt-10 overflow-x-auto">
          <table className="min-w-full text-left text-base" aria-label="Plan de acción">
            <thead className="bg-brand-plum text-white">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Prioridad</th>
                <th className="px-5 py-3.5 font-semibold">Hallazgo</th>
                <th className="px-5 py-3.5 font-semibold">Acción</th>
                <th className="px-5 py-3.5 font-semibold">Responsable</th>
                <th className="px-5 py-3.5 font-semibold">Plazo</th>
              </tr>
            </thead>
            <tbody>
              {INDICATOR_ACTION_PLAN.map((row) => (
                <tr key={row.finding} className="odd:bg-white even:bg-brand-cream/40">
                  <td className="border-t border-brand-plum/10 px-5 py-3.5 font-medium text-brand-orange">
                    {row.priority}
                  </td>
                  <td className="border-t border-brand-plum/10 px-5 py-3.5">{row.finding}</td>
                  <td className="border-t border-brand-plum/10 px-5 py-3.5">{row.action}</td>
                  <td className="border-t border-brand-plum/10 px-5 py-3.5">{row.owner}</td>
                  <td className="border-t border-brand-plum/10 px-5 py-3.5">{row.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
