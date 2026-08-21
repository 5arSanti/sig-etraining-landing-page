import { Link } from 'react-router-dom';
import { routes } from '@/app/routes';
import { Section } from '@/features/chrome/Section';
import { BusinessLinesCarousel } from '@/features/company/BusinessLinesCarousel';
import {
  cloudAlliances,
  contact,
  essence,
  hero,
  houseBrands,
  portfolioIntro,
  successCases,
  tenure,
  whoTeaser,
} from '@/content/company';

export function HomePage() {
  return (
    <>
      <Section tone="dark" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(247,148,29,0.45), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 80%, rgba(255,203,5,0.28), transparent 50%)',
          }}
          aria-hidden="true"
        />
        <div className="et-reveal relative space-y-8 text-center">
          <p className="text-xl font-medium text-brand-amber md:text-2xl">{hero.kicker}</p>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
            {hero.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={routes.contacto}
              className="rounded-[var(--radius-pill)] bg-brand-orange px-7 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(247,148,29,0.35)] transition hover:bg-brand-amber hover:text-brand-plum-ink"
            >
              {hero.contactCta}
            </a>
            <Link
              to={routes.sig}
              className="rounded-[var(--radius-pill)] border-2 border-brand-amber px-7 py-3 font-semibold text-brand-amber transition hover:bg-brand-amber/15"
            >
              {hero.sigCta}
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <div className="text-center">
          <p className="text-6xl font-extrabold tracking-tight text-brand-orange md:text-7xl">
            {tenure.years}
          </p>
          <p className="mt-2 text-2xl font-medium text-brand-plum">{tenure.label}</p>
        </div>
      </Section>

      <Section tone="flush" className="!py-10 md:!py-14">
        <div className="et-reveal overflow-hidden rounded-[var(--radius-panel)] bg-gradient-to-br from-brand-orange via-[#ff9f2e] to-brand-amber px-6 py-12 text-center text-white shadow-[0_16px_40px_rgba(247,148,29,0.35)] md:px-12 md:py-14">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">{essence.heading}</h2>
          <p className="mb-8 text-lg text-white/95 md:text-xl">{essence.body}</p>

          <div className="relative mx-auto mb-10 max-w-3xl rounded-[1.25rem] bg-brand-plum-deep px-6 py-10 shadow-[0_10px_30px_rgba(64,10,62,0.35)]">
            <span
              className="absolute left-[18%] top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-brand-plum opacity-80"
              aria-hidden="true"
            />
            <span
              className="absolute right-[14%] top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand-amber"
              aria-hidden="true"
            />
            <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full ring-4 ring-white/20 md:h-56 md:w-56">
              <img
                src={essence.mediaSrc}
                alt="Comunidad educativa usando tecnología con Etraining"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <span
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-plum-deep/25"
                aria-hidden="true"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/90 bg-white/15 text-white backdrop-blur-[1px]">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-7 w-7 fill-current" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5L8 5.5Z" />
                  </svg>
                </span>
              </span>
            </div>
          </div>

          <Link
            to={routes.nosotros}
            className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-brand-orange-deep/55 px-6 py-3 font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-brand-plum-deep"
          >
            {essence.cta}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </Section>

      <Section tone="dark">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{whoTeaser.heading}</h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-white/90">{whoTeaser.body}</p>
          <Link
            to={routes.nosotros}
            className="inline-flex rounded-[var(--radius-pill)] bg-brand-orange px-7 py-3 font-semibold text-white transition hover:bg-brand-amber hover:text-brand-plum-ink"
          >
            {whoTeaser.cta}
          </Link>
        </div>
      </Section>

      <Section>
        <p className="mb-12 text-center text-lg text-brand-muted md:text-xl">{portfolioIntro}</p>
        <BusinessLinesCarousel />
      </Section>

      <Section tone="cream">
        <h2 className="mb-10 text-center text-3xl font-bold text-brand-plum-ink md:text-4xl">
          Alianzas
        </h2>
        <div className="mb-10">
          <h3 className="mb-5 text-center text-sm font-bold uppercase tracking-wide text-brand-orange">
            Gigantes tecnológicos
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {cloudAlliances.map((partner) => (
              <div
                key={partner}
                className="rounded-[var(--radius-pill)] border border-brand-plum/15 bg-white px-6 py-3 font-semibold text-brand-plum"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-center text-sm font-bold uppercase tracking-wide text-brand-orange">
            Nuestras marcas
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {houseBrands.map((brand) => (
              <div
                key={brand}
                className="rounded-[var(--radius-pill)] bg-brand-plum px-6 py-3 font-semibold text-brand-amber"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="mb-12 text-center text-3xl font-bold text-brand-plum-ink md:text-4xl">
          Casos de éxito
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {successCases.map((item) => (
            <article
              key={item.title}
              className="rounded-[var(--radius-card)] border border-brand-plum/10 bg-brand-cream p-6 shadow-[0_8px_24px_rgba(64,10,62,0.08)]"
            >
              <h3 className="mb-3 text-2xl font-bold text-brand-plum">{item.title}</h3>
              <p className="mb-4 text-brand-plum-ink/85">{item.summary}</p>
              <ul className="space-y-1.5">
                {item.facts.map((fact) => (
                  <li key={fact} className="text-sm text-brand-muted">
                    • {fact}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="contacto" tone="dark">
        <div className="text-center">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">{contact.heading}</h2>
          <div className="mx-auto max-w-2xl space-y-4 text-white/90">
            <div>
              {contact.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="text-xl">
              <a href={`tel:${contact.phoneHref}`} className="text-brand-amber hover:underline">
                {contact.phone}
              </a>
            </p>
            <p className="text-xl">
              <a href={`mailto:${contact.email}`} className="text-brand-amber hover:underline">
                {contact.email}
              </a>
            </p>
            <p className="text-sm text-white/70">{contact.hours}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
