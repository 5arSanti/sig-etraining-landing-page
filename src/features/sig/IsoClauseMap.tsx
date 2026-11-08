import { Link } from 'react-router-dom';
import { routes } from '@/app/routes';
import { ISO_CLAUSE_COLUMNS, ISO_CLAUSE_GAPS, ISO_CLAUSE_INTRO } from '@/content/sig.isoClauses';

export function IsoClauseMap() {
  return (
    <section className="mb-10 rounded-[var(--radius-card)] border border-brand-plum/15 bg-brand-cream/60 p-6">
      <h2 className="text-xl font-bold text-brand-plum-ink">Qué ver en auditoría</h2>
      <p className="mt-2 text-sm text-brand-muted">{ISO_CLAUSE_INTRO}</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {ISO_CLAUSE_COLUMNS.map((column) => (
          <div key={column.standard}>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-orange">
              {column.standard}
            </h3>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={`${column.standard}-${link.numeral}-${link.slug}-${link.label}`}>
                  <Link
                    to={routes.sigTopic(link.slug)}
                    className="text-sm font-medium text-brand-plum hover:text-brand-orange"
                  >
                    {`${link.numeral} ${link.label}`.trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-brand-muted">
        Sin evidencia en este teatro: {ISO_CLAUSE_GAPS.join(' · ')}.
      </p>
    </section>
  );
}
