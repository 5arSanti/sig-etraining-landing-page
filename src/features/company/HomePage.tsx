import { Link } from 'react-router-dom';
import { routes } from '@/app/routes';
import { Section } from '@/features/chrome/Section';
import {
  businessLines,
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
      <Section tone="dark">
        <div className="space-y-8 text-center">
          <p className="text-xl text-brand-amber">{hero.kicker}</p>
          <h1 className="text-6xl font-bold leading-tight tracking-tight">{hero.title}</h1>
          <div className="flex justify-center gap-4">
            <a
              href={routes.contacto}
              className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white transition hover:bg-brand-amber"
            >
              {hero.contactCta}
            </a>
            <Link
              to={routes.sig}
              className="rounded-lg border-2 border-brand-orange px-6 py-3 font-semibold text-white transition hover:bg-brand-orange/10"
            >
              {hero.sigCta}
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="text-center">
          <p className="text-7xl font-bold text-brand-amber">{tenure.years}</p>
          <p className="mt-2 text-2xl">{tenure.label}</p>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-brand-charcoal">{essence.heading}</h2>
          <p className="text-xl text-brand-charcoal">{essence.body}</p>
        </div>
      </Section>

      <Section tone="dark">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold">{whoTeaser.heading}</h2>
          <p className="mb-6 text-xl">{whoTeaser.body}</p>
          <Link
            to={routes.nosotros}
            className="inline-block rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white transition hover:bg-brand-amber"
          >
            {whoTeaser.cta}
          </Link>
        </div>
      </Section>

      <Section>
        <p className="mb-12 text-center text-xl text-brand-charcoal">{portfolioIntro}</p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {businessLines.map((line) => (
            <div key={line.title} className="rounded-lg border-2 border-brand-orange/20 p-6">
              <h3 className="mb-3 text-xl font-bold text-brand-charcoal">{line.title}</h3>
              <p className="text-brand-charcoal">{line.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <h2 className="mb-8 text-center text-4xl font-bold">Nuestras Alianzas</h2>
        <div className="mb-8">
          <h3 className="mb-4 text-center text-2xl font-semibold">Cloud Partners</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {cloudAlliances.map((partner) => (
              <div key={partner} className="rounded-lg border border-white/20 px-6 py-3">
                {partner}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-center text-2xl font-semibold">Nuestras Marcas</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {houseBrands.map((brand) => (
              <div
                key={brand}
                className="rounded-lg border border-brand-amber bg-brand-amber/10 px-6 py-3 font-semibold text-brand-amber"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="mb-12 text-center text-4xl font-bold text-brand-charcoal">Casos de Éxito</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {successCases.map((item) => (
            <div key={item.title} className="rounded-lg bg-brand-cream p-6">
              <h3 className="mb-3 text-2xl font-bold text-brand-charcoal">{item.title}</h3>
              <p className="mb-4 text-brand-charcoal">{item.summary}</p>
              <ul className="space-y-1">
                {item.facts.map((fact, idx) => (
                  <li key={idx} className="text-sm text-brand-charcoal/80">
                    • {fact}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contacto" tone="dark">
        <div className="text-center">
          <h2 className="mb-8 text-4xl font-bold">{contact.heading}</h2>
          <div className="mx-auto max-w-2xl space-y-4">
            <div>
              {contact.addressLines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            <p className="text-xl">
              <a href={`tel:${contact.phone}`} className="text-brand-amber hover:underline">
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
