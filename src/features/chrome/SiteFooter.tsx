import { GROUP_LABEL, TEAM } from '@/content/team';

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white px-4 py-10 mt-auto">
      <p className="font-semibold">Etraining</p>
      <p>Calle 59 a Bis No 5-53 · Oficina 206 · Edificio Link 760</p>
      <p>Bogotá D.C. · 110231 · Colombia</p>
      <p>PBX: +57 310 2129861</p>
      <p>
        <a className="text-brand-amber underline" href="mailto:comunicaciones@etraining.edu.co">
          comunicaciones@etraining.edu.co
        </a>
      </p>
      <p>Lun – Vie · 8:00 AM – 6:00 PM</p>
      <p className="mt-6 text-sm text-white/80">
        Presentación SIG · {GROUP_LABEL} · {TEAM.map((member) => member.name).join(' · ')}
      </p>
    </footer>
  );
}
