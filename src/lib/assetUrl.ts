/** Prefix a public-path asset with Vite's BASE_URL (needed on GitHub Pages). */
export function assetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}
