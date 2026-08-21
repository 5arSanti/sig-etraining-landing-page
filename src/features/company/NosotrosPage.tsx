import { Section } from '@/features/chrome/Section';
import { nosotros } from '@/content/nosotros';

export function NosotrosPage() {
  return (
    <>
      <Section tone="dark" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 85% 20%, rgba(247,148,29,0.4), transparent 55%)',
          }}
          aria-hidden="true"
        />
        <div className="relative space-y-6 text-center">
          <h1 className="text-4xl font-extrabold md:text-5xl">{nosotros.heading}</h1>
          <p className="mx-auto max-w-3xl text-lg text-white/90">{nosotros.intro}</p>
          <p className="mx-auto max-w-3xl text-lg text-white/90">{nosotros.followUp}</p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="rounded-[var(--radius-card)] bg-brand-cream p-6 md:p-8">
            <h2 className="mb-4 text-3xl font-bold text-brand-orange">{nosotros.mission.heading}</h2>
            <p className="text-brand-plum-ink">{nosotros.mission.body}</p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-brand-cream p-6 md:p-8">
            <h2 className="mb-4 text-3xl font-bold text-brand-orange">{nosotros.purpose.heading}</h2>
            <p className="text-brand-plum-ink">{nosotros.purpose.body}</p>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div>
          <h2 className="mb-4 text-3xl font-bold">{nosotros.what.heading}</h2>
          <p className="text-lg text-white/90">{nosotros.what.body}</p>
        </div>
      </Section>

      <Section>
        <div className="space-y-12">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-brand-plum-ink">{nosotros.how.heading}</h2>
            <ul className="space-y-3">
              {nosotros.how.items.map((item) => (
                <li key={item} className="flex items-start text-brand-plum-ink">
                  <span className="mr-3 mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-bold text-brand-plum-ink">{nosotros.why.heading}</h2>
            <ul className="space-y-3">
              {nosotros.why.items.map((item) => (
                <li key={item} className="flex items-start text-brand-plum-ink">
                  <span className="mr-3 mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold">{nosotros.brands.heading}</h2>
          <p className="mx-auto max-w-3xl text-lg text-white/90">{nosotros.brands.body}</p>
        </div>
      </Section>
    </>
  );
}
