import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  tone?: 'light' | 'dark';
  children: ReactNode;
};

export function Section({ id, tone = 'light', children }: SectionProps) {
  const toneClass = tone === 'dark' ? 'bg-brand-dark text-white' : 'bg-white text-brand-charcoal';
  return (
    <section id={id} className={`${toneClass} px-4 py-16`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
