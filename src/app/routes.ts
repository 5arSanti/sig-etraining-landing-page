export const routes = {
  home: '/',
  nosotros: '/nosotros',
  sig: '/sig',
  /** Home contact anchor; includes Vite BASE_URL for GitHub Pages. */
  contacto: `${import.meta.env.BASE_URL}#contacto`,
  sigTopic: (slug: string) => `/sig/${slug}`,
} as const;
