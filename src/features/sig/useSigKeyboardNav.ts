import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/app/routes';
import type { SigSlug } from '@/content/sig.manifest';

export function useSigKeyboardNav(prev: SigSlug | null, next: SigSlug | null) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) {
        return;
      }

      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if (event.key === 'ArrowLeft' && prev) {
        navigate(routes.sigTopic(prev));
      } else if (event.key === 'ArrowRight' && next) {
        navigate(routes.sigTopic(next));
      }
    }

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [prev, next, navigate]);
}
