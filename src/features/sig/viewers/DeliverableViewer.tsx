import { assertNever } from '@/lib/assertNever';
import type { SigTopic } from '@/content/sig.manifest';
import { ImageViewer } from './ImageViewer';
import { PdfViewer } from './PdfViewer';
import { PlaceholderState } from './PlaceholderState';
import { XlsxViewer } from './XlsxViewer';

export function DeliverableViewer({ topic }: { topic: SigTopic }) {
  switch (topic.kind) {
    case 'image':
      return (
        <ImageViewer
          src={topic.files[0] ?? ''}
          alt={topic.title}
          downloadHref={topic.files[0] ?? ''}
        />
      );
    case 'pdf':
      return (
        <PdfViewer
          src={topic.files[0] ?? ''}
          title={topic.title}
          downloadHref={topic.files[0] ?? ''}
        />
      );
    case 'xlsx':
      return (
        <XlsxViewer src={topic.files[0] ?? ''} downloadHref={topic.files[0] ?? ''} />
      );
    case 'placeholder':
      return <PlaceholderState />;
    default:
      return assertNever(topic.kind);
  }
}
