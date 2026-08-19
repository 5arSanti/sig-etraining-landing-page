import { Link } from 'react-router-dom';
import { routes } from '@/app/routes';

export function SigNotFound() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">No encontramos este tema</h1>
        <p className="mb-6 text-gray-600">
          El tema que buscas no existe o aún no ha sido publicado.
        </p>
        <Link
          to={routes.sig}
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Volver al SIG
        </Link>
      </div>
    </div>
  );
}
