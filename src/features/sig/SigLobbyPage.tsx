import { SIG_LOBBY_INTRO, SIG_TOPICS } from '@/content/sig.manifest';
import { IsoClauseMap } from './IsoClauseMap';
import { TopicCard } from './TopicCard';

export function SigLobbyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-brand-plum-ink md:text-4xl">
          Sistema Integrado de Gestión
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-brand-muted">{SIG_LOBBY_INTRO}</p>
      </div>

      <nav aria-label="Temas del SIG" className="mt-12 max-w-3xl">
        {SIG_TOPICS.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </nav>

      <IsoClauseMap />
    </div>
  );
}
