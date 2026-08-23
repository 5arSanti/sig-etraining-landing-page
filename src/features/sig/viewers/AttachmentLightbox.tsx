import { useEffect, type ReactNode } from 'react';

type AttachmentLightboxProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  toolbar?: ReactNode;
  children: ReactNode;
};

export function AttachmentLightbox({
  open,
  onClose,
  title,
  toolbar,
  children,
}: AttachmentLightboxProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-brand-plum-deep/96 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white">
        <p className="truncate text-sm font-semibold">{title}</p>
        <div className="flex shrink-0 items-center gap-2">
          {toolbar}
          <button
            type="button"
            onClick={onClose}
            className="rounded-[var(--radius-pill)] bg-white/15 px-4 py-1.5 text-sm font-semibold transition hover:bg-white/25"
          >
            Cerrar
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
