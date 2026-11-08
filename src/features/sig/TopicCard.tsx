import { Link } from 'react-router-dom';
import { routes } from '@/app/routes';
import type { SigTopic } from '@/content/sig.manifest';

export function TopicCard({ topic }: { topic: SigTopic }) {
  const isPlaceholder = topic.kind === 'placeholder';

  return (
    <Link
      to={routes.sigTopic(topic.slug)}
      className="group grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3 border-b border-brand-plum/10 py-4 transition hover:border-brand-orange/40"
    >
      <span className="text-sm font-bold tabular-nums text-brand-orange">{topic.number}</span>
      <div>
        <h3 className="text-lg font-semibold text-brand-plum-ink group-hover:text-brand-orange">
          {topic.title}
        </h3>
        <p className="mt-1 text-sm leading-snug text-brand-muted">{topic.summary}</p>
        {isPlaceholder ? (
          <p className="mt-1 text-xs font-medium text-brand-plum">Contenido en construcción</p>
        ) : null}
      </div>
    </Link>
  );
}
