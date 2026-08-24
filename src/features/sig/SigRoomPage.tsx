import { useParams } from "react-router-dom";
import {
  getAdjacentSlug,
  getReadyTopics,
  getTopicBySlug,
} from "@/content/sig.navigation";
import { DeliverableViewer } from "./viewers/DeliverableViewer";
import { RoomChrome } from "./RoomChrome";
import { SigNotFound } from "./SigNotFound";
import { SipocTable } from "./SipocTable";
import { useSigKeyboardNav } from "./useSigKeyboardNav";

export function SigRoomPage() {
  const { slug } = useParams<{ slug: string }>();
  const topic = slug ? getTopicBySlug(slug) : undefined;

  if (!topic) {
    return <SigNotFound />;
  }

  const prevSlug = getAdjacentSlug(topic.slug, "prev");
  const nextSlug = getAdjacentSlug(topic.slug, "next");

  useSigKeyboardNav(prevSlug, nextSlug);

  const readyTopics = getReadyTopics();
  const position = readyTopics.findIndex((t) => t.slug === topic.slug);
  const displayPosition = position !== -1 ? position + 1 : null;

  return (
    <div className="mx-auto px-20 py-10 md:py-12">
      <RoomChrome
        title={topic.title}
        position={displayPosition}
        total={readyTopics.length}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />

      <div className="space-y-10">
        <div className="space-y-6">
          <div className="whitespace-pre-line text-lg leading-relaxed text-brand-plum-ink/85">
            {topic.body}
          </div>
          {topic.sipocRows ? <SipocTable rows={topic.sipocRows} /> : null}
        </div>

        <section
          className="w-full min-w-0 border-t border-brand-plum/10 pt-8"
          aria-label={topic.kind === 'text' ? 'Documento del tema' : 'Entregable adjunto'}
        >
          <DeliverableViewer topic={topic} />
        </section>
      </div>
    </div>
  );
}
