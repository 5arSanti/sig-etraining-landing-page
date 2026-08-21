import { SIG_LOBBY_INTRO, SIG_TOPICS } from '@/content/sig.manifest';
import { TopicCard } from './TopicCard';

export function SigLobbyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <h1 className="mb-4 text-3xl font-extrabold text-brand-plum-ink md:text-4xl">
        Sistema Integrado de Gestión
      </h1>
      <p className="mb-10 max-w-3xl text-lg text-brand-muted">{SIG_LOBBY_INTRO}</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SIG_TOPICS.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </div>
  );
}
