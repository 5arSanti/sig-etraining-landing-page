import { useState } from 'react';
import { EMERGENCY_EVENTS } from '@/content/sig.emergencies';

export function EmergencyBoard() {
  const [selectedId, setSelectedId] = useState(EMERGENCY_EVENTS[0]?.id ?? 'terremoto');
  const selected = EMERGENCY_EVENTS.find((event) => event.id === selectedId) ?? EMERGENCY_EVENTS[0];

  if (!selected) return null;

  return (
    <div className="space-y-5">
      <p className="max-w-3xl text-base leading-relaxed text-brand-plum-ink/85">
        Cuatro eventos. Abra uno para ver el antes, durante y después, y los procesos que se
        afectan.
      </p>
      <div className="flex flex-wrap gap-2">
        {EMERGENCY_EVENTS.map((event) => (
          <button
            key={event.id}
            type="button"
            onClick={() => setSelectedId(event.id)}
            className={`rounded-[var(--radius-pill)] px-3 py-1.5 text-sm font-semibold ${
              event.id === selectedId
                ? 'bg-brand-plum text-white'
                : 'bg-white text-brand-plum ring-1 ring-brand-plum/20'
            }`}
          >
            {event.title}
          </button>
        ))}
      </div>
      <h3 className="text-xl font-bold text-brand-plum-ink">
        {selected.title} — Riesgo {selected.risk}
      </h3>
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-brand-plum/15">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-brand-plum text-white">
            <tr>
              <th className="px-3 py-2">Área</th>
              <th className="px-3 py-2">Antes</th>
              <th className="px-3 py-2">Durante</th>
              <th className="px-3 py-2">Después</th>
            </tr>
          </thead>
          <tbody>
            {selected.phases.map((phase) => (
              <tr key={phase.area} className="odd:bg-white even:bg-brand-cream/40">
                <td className="border-t border-brand-plum/10 px-3 py-2 font-semibold text-brand-orange">
                  {phase.area}
                </td>
                <td className="border-t border-brand-plum/10 px-3 py-2">{phase.before}</td>
                <td className="border-t border-brand-plum/10 px-3 py-2">{phase.during}</td>
                <td className="border-t border-brand-plum/10 px-3 py-2">{phase.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-plum">
          Procesos afectados
        </h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-brand-plum-ink">
          {selected.processes.map((process) => (
            <li key={process}>{process}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
