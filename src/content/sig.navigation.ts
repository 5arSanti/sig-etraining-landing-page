import type { SigSlug, SigTopic } from './sig.manifest';
import { SIG_TOPICS } from './sig.manifest';

export function getTopicBySlug(
  slug: string,
  topics: readonly SigTopic[] = SIG_TOPICS,
): SigTopic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function getReadyTopics(topics: readonly SigTopic[] = SIG_TOPICS): SigTopic[] {
  return topics.filter((topic) => topic.kind !== 'placeholder');
}

export function getAdjacentSlug(
  currentSlug: string,
  direction: 'prev' | 'next',
  topics: readonly SigTopic[] = SIG_TOPICS,
): SigSlug | null {
  const ready = getReadyTopics(topics);
  const currentIndex = ready.findIndex((topic) => topic.slug === currentSlug);
  if (currentIndex === -1) {
    return direction === 'prev' ? (ready.at(-1)?.slug ?? null) : null;
  }
  const target = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
  return ready[target]?.slug ?? null;
}
