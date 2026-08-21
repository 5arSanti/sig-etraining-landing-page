import { useParams } from 'react-router-dom';
import { getAdjacentSlug, getReadyTopics, getTopicBySlug } from '@/content/sig.navigation';
import { DeliverableViewer } from './viewers/DeliverableViewer';
import { RoomChrome } from './RoomChrome';
import { SigNotFound } from './SigNotFound';
import { SipocTable } from './SipocTable';
import { useSigKeyboardNav } from './useSigKeyboardNav';

export function SigRoomPage() {
  const { slug } = useParams<{ slug: string }>();
  const topic = slug ? getTopicBySlug(slug) : undefined;

  if (!topic) {
    return <SigNotFound />;
  }

  const prevSlug = getAdjacentSlug(topic.slug, 'prev');
  const nextSlug = getAdjacentSlug(topic.slug, 'next');

  useSigKeyboardNav(prevSlug, nextSlug);

  const readyTopics = getReadyTopics();
  const position = readyTopics.findIndex((t) => t.slug === topic.slug);
  const displayPosition = position !== -1 ? position + 1 : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
      <RoomChrome
        title={topic.title}
        position={displayPosition}
        total={readyTopics.length}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-6 whitespace-pre-line text-brand-plum-ink/85">{topic.body}</div>
          {topic.sipocRows && <SipocTable rows={topic.sipocRows} />}
        </div>
        <div>
          <DeliverableViewer topic={topic} />
        </div>
      </div>
    </div>
  );
}
