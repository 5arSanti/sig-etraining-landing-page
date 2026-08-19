import { Link } from 'react-router-dom';
import { GROUP_LABEL, TEAM } from '@/content/team';
import { routes } from '@/app/routes';

export function AcademicRibbon() {
  const names = TEAM.map((member) => member.name).join(' · ');

  return (
    <div className="bg-brand-dark text-white text-sm leading-snug px-4 py-2">
      <Link to={routes.sig} className="underline-offset-2 hover:underline">
        Presentación SIG · {GROUP_LABEL}
      </Link>
      <span className="block sm:inline sm:before:content-['—'] sm:before:mx-2">{names}</span>
    </div>
  );
}
