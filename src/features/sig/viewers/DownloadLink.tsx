import type { ReactNode } from 'react';

export function DownloadLink({ href, children }: { href: string; children?: ReactNode }) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-brand-plum/20 bg-white px-4 py-2 text-sm font-semibold text-brand-plum transition hover:bg-brand-cream"
    >
      {children ?? 'Descargar adjunto'}
    </a>
  );
}
