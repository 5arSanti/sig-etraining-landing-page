import { NavLink } from 'react-router-dom';
import { routes } from '@/app/routes';

const links = [
  { to: routes.home, label: 'Inicio', end: true },
  { to: routes.nosotros, label: 'Nosotros', end: true },
  { to: routes.sig, label: 'Sistema Integrado de Gestión', end: false },
  { to: routes.contacto, label: 'Contacto', end: true },
] as const;

export function SiteHeader() {
  return (
    <header className="bg-white text-brand-charcoal border-b border-black/10 px-4 py-3 flex items-center justify-between gap-4">
      <NavLink to={routes.home} className="flex items-center gap-2 shrink-0">
        <img src="/brand/logo-etraining.webp" alt="Etraining" className="h-8 w-auto" />
      </NavLink>
      <nav aria-label="Principal" className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `hover:text-brand-orange ${isActive && !link.to.includes('#') ? 'text-brand-orange' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
