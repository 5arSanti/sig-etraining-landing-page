import { Link } from 'react-router-dom';
import { GROUP_LABEL, TEAM } from '@/content/team';
import { businessLines } from '@/content/company';
import { routes } from '@/app/routes';
import { assetUrl } from '@/lib/assetUrl';

const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Facebook', href: 'https://www.facebook.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/e-training-sas' },
  { label: 'YouTube', href: 'https://www.youtube.com/' },
] as const;

function SocialIcon({ label }: { label: string }) {
  const path =
    label === 'Instagram'
      ? 'M8 3.5h8A4.5 4.5 0 0 1 20.5 8v8a4.5 4.5 0 0 1-4.5 4.5H8A4.5 4.5 0 0 1 3.5 16V8A4.5 4.5 0 0 1 8 3.5Zm0 1.5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm8.25 1.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM12 8.25A3.75 3.75 0 1 1 12 15.75 3.75 3.75 0 0 1 12 8.25Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z'
      : label === 'Facebook'
        ? 'M14 8.5h2.5V6H14c-1.93 0-3.5 1.57-3.5 3.5V12H8.5v2.5H10.5V22h2.5v-7.5H15.5L16 12h-3v-2c0-.55.45-1 1-1Z'
        : label === 'LinkedIn'
          ? 'M6.5 9.5H4V20h2.5V9.5ZM5.25 4A1.75 1.75 0 1 0 5.25 7.5 1.75 1.75 0 0 0 5.25 4ZM20 13.1c0-2.7-1.45-4.1-3.95-4.1-1.35 0-2.35.6-2.8 1.35V9.5H11V20h2.5v-5.45c0-1.45.8-2.35 2.05-2.35 1.15 0 1.95.75 1.95 2.3V20H20v-6.9Z'
          : 'M10 8.5 16.5 12 10 15.5V8.5ZM4 7.5A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9Z';

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-brand-plum-footer text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <img
            src={assetUrl('/brand/logo-etraining.webp')}
            alt="Etraining"
            className="h-8 w-auto brightness-0 invert"
          />
          <p className="text-sm text-white/85">Diseñamos nuevas formas de aprender</p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-orange">
            Servicios
          </h2>
          <ul className="space-y-2 text-sm text-white/90">
            {businessLines.map((line) => (
              <li key={line.title}>{line.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-orange">
            Nosotros
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={routes.nosotros} className="hover:text-brand-amber">
                ¿Quiénes somos?
              </Link>
            </li>
            <li>
              <Link to={routes.sig} className="hover:text-brand-amber">
                Sistema Integrado de Gestión
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-orange">
            Contacto
          </h2>
          <div className="space-y-1 text-sm text-white/90">
            <p>Calle 59 a Bis No 5-53</p>
            <p>Oficina 206 Bogotá D.C. Edificio Link 760</p>
            <p>110231 – Colombia</p>
            <p>PBX: +57 310 2129861</p>
            <p>
              <a
                className="text-brand-amber underline-offset-2 hover:underline"
                href="mailto:comunicaciones@etraining.edu.co"
              >
                comunicaciones@etraining.edu.co
              </a>
            </p>
            <p className="pt-2">Horario</p>
            <p>Lun – Vie | 8:00 AM – 6:00 PM</p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="h-px flex-1 bg-gradient-to-r from-brand-orange via-brand-amber to-brand-plum"
          aria-hidden="true"
        />
        <div className="flex gap-3">
          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-brand-orange hover:text-brand-orange"
            >
              <SocialIcon label={item.label} />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/15 px-4 py-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright ©2025 Etraining</p>
          <p>
            Presentación SIG · {GROUP_LABEL} · {TEAM.map((member) => member.name).join(' · ')}
          </p>
        </div>
      </div>
    </footer>
  );
}
