import { useState } from 'react';
import { DownloadLink } from './DownloadLink';

export function ImageViewer(props: { src: string; alt: string; downloadHref: string }) {
  const [isEnlarged, setIsEnlarged] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <img src={props.src} alt={props.alt} className="w-full" />
        <button
          onClick={() => setIsEnlarged(!isEnlarged)}
          className="mt-2 rounded border border-black/20 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-black/5"
        >
          Ver grande
        </button>
      </div>
      <DownloadLink href={props.downloadHref} />
      {isEnlarged && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsEnlarged(false)}
        >
          <img src={props.src} alt={props.alt} className="max-h-[90vh] max-w-[90vw]" />
        </dialog>
      )}
    </div>
  );
}
