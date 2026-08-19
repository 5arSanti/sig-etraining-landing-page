import { Outlet } from 'react-router-dom';
import { SkipLink } from '@/app/SkipLink';
import { AcademicRibbon } from '@/features/chrome/AcademicRibbon';
import { SiteFooter } from '@/features/chrome/SiteFooter';
import { SiteHeader } from '@/features/chrome/SiteHeader';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <AcademicRibbon />
      <SiteHeader />
      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
