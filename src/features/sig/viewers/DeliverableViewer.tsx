import { assertNever } from '@/lib/assertNever';
import { assetUrl } from '@/lib/assetUrl';
import type { SigTopic } from '@/content/sig.manifest';
import { ImageViewer } from './ImageViewer';
import { PdfViewer } from './PdfViewer';
import { PlaceholderState } from './PlaceholderState';
import { XlsxViewer } from './XlsxViewer';

export function DeliverableViewer({ topic }: { topic: SigTopic }) {
  const file = topic.files[0] ? assetUrl(topic.files[0]) : '';

  switch (topic.kind) {
    case 'image':
      return (
        <ImageViewer
          src={file}
          alt={topic.title}
          downloadHref={file}
        />
      );
    case 'pdf':
      return (
        <PdfViewer
          src={file}
          title={topic.title}
          downloadHref={file}
        />
      );
    case 'xlsx':
      return (
        <XlsxViewer src={file} downloadHref={file} />
      );
    case 'placeholder':
      return <PlaceholderState />;
    default:
      return assertNever(topic.kind);
  }
}
