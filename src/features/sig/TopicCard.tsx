import { Link } from 'react-router-dom';
import { routes } from '@/app/routes';
import type { SigTopic } from '@/content/sig.manifest';

export function TopicCard({ topic }: { topic: SigTopic }) {
  const isPlaceholder = topic.kind === 'placeholder';

  return (
    <Link
      to={routes.sigTopic(topic.slug)}
      className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {topic.number}
        </span>
        <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
      </div>
      <p className="mb-4 text-sm text-gray-600">{topic.summary}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
          Ver entregable
        </span>
        {isPlaceholder && (
          <span className="text-xs text-amber-600">Contenido en construcción</span>
        )}
      </div>
    </Link>
  );
}
