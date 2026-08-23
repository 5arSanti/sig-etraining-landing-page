import { useState } from 'react';
import type {
  ParsedRaciWorkbook,
  RaciLetter,
  RaciMatrix,
  RolesTable,
} from './parseRaciWorkbook';
import { classifyRaciCell } from './parseRaciWorkbook';

interface RaciGridProps {
  workbook: ParsedRaciWorkbook;
}

type View = 'matrix' | 'roles';

const RACI_STYLES: Record<RaciLetter, string> = {
  R: 'bg-brand-cream text-brand-plum font-bold',
  A: 'bg-brand-orange text-white font-bold',
  C: 'bg-brand-amber text-brand-plum-ink font-bold',
  I: 'bg-brand-plum/15 text-brand-plum font-bold',
};

function RaciLegend() {
  const items: { letter: RaciLetter; label: string }[] = [
    { letter: 'R', label: 'Responsable (ejecuta)' },
    { letter: 'A', label: 'A cargo (aprueba; uno por actividad)' },
    { letter: 'C', label: 'Consultado' },
    { letter: 'I', label: 'Informado' },
  ];

  return (
    <div className="rounded-[var(--radius-card)] border border-brand-plum/10 bg-white p-4 shadow-[0_8px_24px_rgba(64,10,62,0.08)]">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-plum">Leyenda RACI</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.letter} className="flex items-center gap-2 text-sm text-brand-plum-ink">
            <span
              className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs ${RACI_STYLES[item.letter]}`}
            >
              {item.letter}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriorityBadge({ value }: { value: string }) {
  if (!value) return null;
  const tone =
    value.toLowerCase() === 'alta'
      ? 'bg-brand-orange/15 text-brand-orange-deep'
      : value.toLowerCase() === 'media'
        ? 'bg-brand-amber/25 text-brand-plum'
        : 'bg-brand-plum/10 text-brand-muted';
  return (
    <span className={`rounded-[var(--radius-pill)] px-2 py-0.5 text-xs font-semibold ${tone}`}>
      {value}
    </span>
  );
}

function StatusBadge({ value }: { value: string }) {
  if (!value) return null;
  return (
    <span className="rounded-[var(--radius-pill)] bg-brand-plum/10 px-2 py-0.5 text-xs font-medium text-brand-plum">
      {value}
    </span>
  );
}

function MatrixTable({ matrix }: { matrix: RaciMatrix }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-brand-plum/10 bg-white shadow-[0_8px_24px_rgba(64,10,62,0.08)]">
      <div className="border-b border-brand-plum/10 bg-brand-plum px-4 py-3 text-white">
        <p className="text-lg font-bold">{matrix.title}</p>
        <p className="text-sm text-white/80">Asignación de responsabilidades por actividad del SIG</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-brand-plum/15 bg-brand-cream">
              <th
                className="sticky left-0 z-20 min-w-[18rem] border-r border-brand-plum/15 bg-brand-cream px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-brand-muted"
              >
                Prioridad · Estado · Actividad
              </th>
              {matrix.roleHeaders.map((header, index) => (
                <th
                  key={`${header}-${index}`}
                  className="min-w-[9.5rem] border-l border-brand-plum/10 px-2 py-2 text-center"
                >
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-wide text-brand-orange">
                    {matrix.groupHeaders[index]}
                  </span>
                  <span className="mt-1 block text-xs font-bold leading-snug text-brand-plum-ink">
                    {header}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.rows.map((row, rowIndex) => {
              if (row.kind === 'section') {
                return (
                  <tr key={`section-${rowIndex}`} className="bg-brand-plum text-white">
                    <td
                      colSpan={1 + matrix.roleHeaders.length}
                      className="sticky left-0 px-4 py-2.5 text-sm font-bold"
                    >
                      {row.label}
                    </td>
                  </tr>
                );
              }

              return (
                <tr
                  key={`activity-${rowIndex}`}
                  className="border-b border-brand-plum/8 odd:bg-white even:bg-brand-cream/40"
                >
                  <td className="sticky left-0 z-10 border-r border-brand-plum/15 bg-inherit px-3 py-2 align-top">
                    <div className="mb-2 flex flex-wrap gap-1">
                      <PriorityBadge value={row.priority} />
                      <StatusBadge value={row.status} />
                    </div>
                    <p className="font-medium leading-snug text-brand-plum-ink">{row.activity}</p>
                  </td>
                  {row.assignments.map((cell, cellIndex) => {
                    const raciType = classifyRaciCell(cell);
                    const colorClass = raciType ? RACI_STYLES[raciType] : 'text-brand-muted';
                    return (
                      <td
                        key={cellIndex}
                        className={`border-l border-brand-plum/8 px-2 py-2 text-center align-middle ${colorClass}`}
                      >
                        {cell || '—'}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RolesTableView({ roles }: { roles: RolesTable }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-brand-plum/10 bg-white shadow-[0_8px_24px_rgba(64,10,62,0.08)]">
      <div className="border-b border-brand-plum/10 bg-brand-plum px-4 py-3 text-white">
        <p className="text-lg font-bold">Roles y responsabilidades</p>
        <p className="text-sm text-white/80">Líderes del SIG y su alcance por proceso</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-brand-cream text-left text-xs font-bold uppercase tracking-wide text-brand-muted">
              {roles.headers.map((header) => (
                <th key={header} className="border-b border-brand-plum/10 px-4 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.rows.map((row) => (
              <tr key={row.person} className="border-b border-brand-plum/8 odd:bg-white even:bg-brand-cream/40">
                <td className="px-4 py-3 font-semibold text-brand-plum">{row.person}</td>
                <td className="px-4 py-3 font-medium text-brand-orange">{row.role}</td>
                <td className="px-4 py-3 text-brand-plum-ink">{row.processes}</td>
                <td className="px-4 py-3 text-brand-muted">{row.responsibilities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function RaciGrid({ workbook }: RaciGridProps) {
  const canShowMatrix = workbook.matrix !== null;
  const canShowRoles = workbook.roles !== null;
  const [view, setView] = useState<View>(canShowMatrix ? 'matrix' : 'roles');

  if (!canShowMatrix && !canShowRoles) {
    return null;
  }

  return (
    <div className="space-y-4">
      <RaciLegend />

      {canShowMatrix && canShowRoles ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setView('matrix')}
            className={`rounded-[var(--radius-pill)] px-4 py-2 text-sm font-semibold transition ${
              view === 'matrix'
                ? 'bg-brand-orange text-white'
                : 'border border-brand-plum/15 bg-white text-brand-plum hover:bg-brand-cream'
            }`}
          >
            Matriz RACI
          </button>
          <button
            type="button"
            onClick={() => setView('roles')}
            className={`rounded-[var(--radius-pill)] px-4 py-2 text-sm font-semibold transition ${
              view === 'roles'
                ? 'bg-brand-orange text-white'
                : 'border border-brand-plum/15 bg-white text-brand-plum hover:bg-brand-cream'
            }`}
          >
            Roles y responsabilidades
          </button>
        </div>
      ) : null}

      {view === 'matrix' && workbook.matrix ? <MatrixTable matrix={workbook.matrix} /> : null}
      {view === 'roles' && workbook.roles ? <RolesTableView roles={workbook.roles} /> : null}
    </div>
  );
}
