import { Link } from 'react-router-dom';
import { routes } from '@/app/routes';

export function SigNotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-2xl font-bold text-brand-plum-ink">No encontramos este tema</h1>
      <p className="mb-6 text-brand-muted">
        El enlace no coincide con un entregable del Sistema Integrado de Gestión.
      </p>
      <Link
        to={routes.sig}
        className="inline-block rounded-[var(--radius-pill)] bg-brand-orange px-6 py-3 font-semibold text-white transition hover:bg-brand-orange-deep"
      >
        Volver al SIG
      </Link>
    </div>
  );
}
