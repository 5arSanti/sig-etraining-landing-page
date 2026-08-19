import { DownloadLink } from './DownloadLink';

export function PdfViewer(props: { src: string; title: string; downloadHref: string }) {
  return (
    <div className="flex flex-col gap-4">
      <iframe title={props.title} src={props.src} className="h-[70vh] w-full bg-white" />
      <DownloadLink href={props.downloadHref} />
    </div>
  );
}
