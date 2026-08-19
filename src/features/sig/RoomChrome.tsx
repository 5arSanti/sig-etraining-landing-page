import { Link } from 'react-router-dom';
import { routes } from '@/app/routes';
import type { SigSlug } from '@/content/sig.manifest';

interface RoomChromeProps {
  title: string;
  position: number | null;
  total: number;
  prevSlug: SigSlug | null;
  nextSlug: SigSlug | null;
}

export function RoomChrome({ title, position, total, prevSlug, nextSlug }: RoomChromeProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {position !== null && (
          <span className="text-sm text-gray-600">
            {position} / {total}
          </span>
        )}
      </div>
      <div className="flex gap-4 text-sm">
        {prevSlug ? (
          <Link
            to={routes.sigTopic(prevSlug)}
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Anterior
          </Link>
        ) : (
          <span className="text-gray-400">Anterior</span>
        )}
        <span className="text-gray-400">|</span>
        {nextSlug ? (
          <Link
            to={routes.sigTopic(nextSlug)}
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Siguiente
          </Link>
        ) : (
          <span className="text-gray-400">Siguiente</span>
        )}
        <span className="text-gray-400">|</span>
        <Link to={routes.sig} className="text-blue-600 hover:text-blue-700 hover:underline">
          Índice
        </Link>
      </div>
    </div>
  );
}
