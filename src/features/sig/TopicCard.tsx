import { Link } from 'react-router-dom';
import { routes } from '@/app/routes';
import type { SigTopic } from '@/content/sig.manifest';

export function TopicCard({ topic }: { topic: SigTopic }) {
  const isPlaceholder = topic.kind === 'placeholder';

  return (
    <Link
      to={routes.sigTopic(topic.slug)}
      className="group block rounded-[var(--radius-card)] border border-brand-plum/10 bg-white p-6 shadow-[0_8px_24px_rgba(64,10,62,0.08)] transition hover:-translate-y-0.5 hover:border-brand-orange/40 hover:shadow-[0_12px_28px_rgba(247,148,29,0.18)]"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-white">
          {topic.number}
        </span>
        <h3 className="text-lg font-semibold text-brand-plum-ink">{topic.title}</h3>
      </div>
      <p className="mb-4 text-sm text-brand-muted">{topic.summary}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-brand-orange group-hover:text-brand-orange-deep">
          Ver entregable
        </span>
        {isPlaceholder && (
          <span className="text-xs font-medium text-brand-plum">Contenido en construcción</span>
        )}
      </div>
    </Link>
  );
}
