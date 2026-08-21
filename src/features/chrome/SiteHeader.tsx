import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '@/app/routes';

const links = [
  { to: routes.home, label: 'Inicio', end: true },
  { to: routes.nosotros, label: 'Nosotros', end: true },
  { to: routes.sig, label: 'Sistema Integrado de Gestión', end: false },
  { to: routes.contacto, label: 'Contacto', end: true },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-plum/10 bg-white/95 text-brand-plum-ink backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <NavLink to={routes.home} className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          <img src="/brand/logo-etraining.webp" alt="Etraining" className="h-8 w-auto" />
        </NavLink>

        <nav aria-label="Principal" className="hidden items-center gap-x-5 text-sm font-medium md:flex">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `transition-colors hover:text-brand-orange ${
                  isActive && !link.to.includes('#') ? 'text-brand-orange' : 'text-brand-plum-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-plum/20 text-brand-plum md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((value) => !value)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Principal móvil"
          className="border-t border-brand-plum/10 px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm font-medium ${
                      isActive && !link.to.includes('#')
                        ? 'bg-brand-cream text-brand-orange'
                        : 'text-brand-plum-ink hover:bg-brand-cream'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
