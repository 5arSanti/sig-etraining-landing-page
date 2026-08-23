import { useState } from 'react';
import { AttachmentLightbox } from './AttachmentLightbox';
import { DownloadLink } from './DownloadLink';

export function PdfViewer(props: { src: string; title: string; downloadHref: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-brand-plum/10 bg-white shadow-[0_8px_24px_rgba(64,10,62,0.08)]">
        <iframe
          title={props.title}
          src={props.src}
          className="h-[min(70vh,900px)] w-full bg-white"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-[var(--radius-pill)] bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-orange-deep"
        >
          Ver a detalle
        </button>
        <DownloadLink href={props.downloadHref} />
      </div>

      <AttachmentLightbox open={isOpen} onClose={() => setIsOpen(false)} title={props.title}>
        <iframe title={props.title} src={props.src} className="h-full w-full bg-white" />
      </AttachmentLightbox>
    </div>
  );
}
