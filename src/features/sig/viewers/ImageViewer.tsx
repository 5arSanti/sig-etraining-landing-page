import { useState } from 'react';
import { AttachmentLightbox } from './AttachmentLightbox';
import { DownloadLink } from './DownloadLink';

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.25;

function ZoomToolbar({
  scale,
  onZoomIn,
  onZoomOut,
  onReset,
}: {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-[var(--radius-pill)] bg-white/10 p-1">
      <button
        type="button"
        onClick={onZoomOut}
        disabled={scale <= ZOOM_MIN}
        aria-label="Reducir zoom"
        className="rounded-full px-2.5 py-1 text-sm font-bold text-white transition hover:bg-white/15 disabled:opacity-40"
      >
        −
      </button>
      <span className="min-w-[3rem] text-center text-xs font-semibold tabular-nums text-white/90">
        {Math.round(scale * 100)}%
      </span>
      <button
        type="button"
        onClick={onZoomIn}
        disabled={scale >= ZOOM_MAX}
        aria-label="Aumentar zoom"
        className="rounded-full px-2.5 py-1 text-sm font-bold text-white transition hover:bg-white/15 disabled:opacity-40"
      >
        +
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-white/15"
      >
        Restablecer
      </button>
    </div>
  );
}

export function ImageViewer(props: { src: string; alt: string; downloadHref: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const openLightbox = () => {
    setScale(1);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setScale(1);
  };

  const zoomIn = () => setScale((value) => Math.min(ZOOM_MAX, value + ZOOM_STEP));
  const zoomOut = () => setScale((value) => Math.max(ZOOM_MIN, value - ZOOM_STEP));
  const resetZoom = () => setScale(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-brand-plum/10 bg-white shadow-[0_8px_24px_rgba(64,10,62,0.08)]">
        <img
          src={props.src}
          alt={props.alt}
          className="mx-auto block max-h-[min(70vh,960px)] w-full object-contain"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={openLightbox}
          className="rounded-[var(--radius-pill)] bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-orange-deep"
        >
          Ver a detalle
        </button>
        <DownloadLink href={props.downloadHref} />
      </div>

      <AttachmentLightbox
        open={isOpen}
        onClose={closeLightbox}
        title={props.alt}
        toolbar={
          <ZoomToolbar
            scale={scale}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onReset={resetZoom}
          />
        }
      >
        <div className="h-full overflow-auto overscroll-contain">
          <div className="flex min-h-full w-full justify-center p-6">
            <img
              src={props.src}
              alt={props.alt}
              draggable={false}
              style={{ width: `${scale * 100}%` }}
              className="h-auto max-w-none object-contain transition-[width] duration-150 ease-out"
            />
          </div>
        </div>
      </AttachmentLightbox>
    </div>
  );
}
