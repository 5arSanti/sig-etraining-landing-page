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
      <div className="mb-2 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-brand-plum-ink">{title}</h1>
        {position !== null && (
          <span className="shrink-0 rounded-[var(--radius-pill)] bg-brand-cream px-3 py-1 text-sm font-semibold text-brand-plum">
            {position} / {total}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-3 text-sm font-medium">
        {prevSlug ? (
          <Link
            to={routes.sigTopic(prevSlug)}
            className="text-brand-orange hover:text-brand-orange-deep hover:underline"
          >
            Anterior
          </Link>
        ) : (
          <span className="text-brand-muted/50">Anterior</span>
        )}
        <span className="text-brand-muted/40">|</span>
        {nextSlug ? (
          <Link
            to={routes.sigTopic(nextSlug)}
            className="text-brand-orange hover:text-brand-orange-deep hover:underline"
          >
            Siguiente
          </Link>
        ) : (
          <span className="text-brand-muted/50">Siguiente</span>
        )}
        <span className="text-brand-muted/40">|</span>
        <Link to={routes.sig} className="text-brand-orange hover:text-brand-orange-deep hover:underline">
          Índice
        </Link>
      </div>
    </div>
  );
}
