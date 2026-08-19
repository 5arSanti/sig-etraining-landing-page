export function DownloadLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2 rounded border border-black/20 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-black/5"
    >
      Descargar adjunto
    </a>
  );
}
