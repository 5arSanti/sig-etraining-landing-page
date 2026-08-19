export const routes = {
  home: '/',
  nosotros: '/nosotros',
  sig: '/sig',
  contacto: '/#contacto',
  sigTopic: (slug: string) => `/sig/${slug}`,
} as const;
