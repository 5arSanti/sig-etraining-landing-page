import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  tone?: 'light' | 'dark' | 'cream' | 'flush';
  children: ReactNode;
  className?: string;
};

export function Section({ id, tone = 'light', children, className = '' }: SectionProps) {
  const toneClass =
    tone === 'dark'
      ? 'bg-brand-plum-deep text-white'
      : tone === 'cream'
        ? 'bg-brand-cream text-brand-plum-ink'
        : tone === 'flush'
          ? 'bg-transparent text-brand-plum-ink'
          : 'bg-white text-brand-plum-ink';

  return (
    <section id={id} className={`${toneClass} px-4 py-16 md:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
