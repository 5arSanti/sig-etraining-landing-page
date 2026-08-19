import { Section } from '@/features/chrome/Section';
import { nosotros } from '@/content/nosotros';

export function NosotrosPage() {
  return (
    <>
      <Section tone="dark">
        <div className="space-y-6 text-center">
          <h1 className="text-5xl font-bold">{nosotros.heading}</h1>
          <p className="mx-auto max-w-3xl text-lg">{nosotros.intro}</p>
          <p className="mx-auto max-w-3xl text-lg">{nosotros.followUp}</p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-brand-orange">{nosotros.mission.heading}</h2>
            <p className="text-brand-charcoal">{nosotros.mission.body}</p>
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-bold text-brand-orange">{nosotros.purpose.heading}</h2>
            <p className="text-brand-charcoal">{nosotros.purpose.body}</p>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div>
          <h2 className="mb-4 text-3xl font-bold">{nosotros.what.heading}</h2>
          <p className="text-lg">{nosotros.what.body}</p>
        </div>
      </Section>

      <Section>
        <div className="space-y-12">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-brand-charcoal">{nosotros.how.heading}</h2>
            <ul className="space-y-3">
              {nosotros.how.items.map((item, idx) => (
                <li key={idx} className="flex items-start text-brand-charcoal">
                  <span className="mr-3 mt-1 text-brand-orange">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-bold text-brand-charcoal">{nosotros.why.heading}</h2>
            <ul className="space-y-3">
              {nosotros.why.items.map((item, idx) => (
                <li key={idx} className="flex items-start text-brand-charcoal">
                  <span className="mr-3 mt-1 text-brand-orange">•</span>
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
          <p className="mx-auto max-w-3xl text-lg">{nosotros.brands.body}</p>
        </div>
      </Section>
    </>
  );
}
