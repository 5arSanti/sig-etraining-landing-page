import { SIG_LOBBY_INTRO, SIG_TOPICS } from '@/content/sig.manifest';
import { TopicCard } from './TopicCard';

export function SigLobbyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold text-gray-900">
        Sistema Integrado de Gestión
      </h1>
      <p className="mb-8 text-lg text-gray-700">{SIG_LOBBY_INTRO}</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SIG_TOPICS.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </div>
  );
}
