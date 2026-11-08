import { useParams } from "react-router-dom";
import { OPERATIONAL_CONTROLS } from "@/content/sig.controls";
import {
  getAdjacentSlug,
  getReadyTopics,
  getTopicBySlug,
} from "@/content/sig.navigation";
import { assetUrl } from "@/lib/assetUrl";
import { EmergencyBoard } from "./EmergencyBoard";
import { DeliverableViewer } from "./viewers/DeliverableViewer";
import { DownloadLink } from "./viewers/DownloadLink";
import { IndicatorDashboard } from "./IndicatorDashboard";
import { OperationalControlTable } from "./OperationalControlTable";
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
  const skipSpreadsheetPreview = topic.slug === "control-operacional";
  const extraWorkbook = topic.files[1]?.endsWith(".xlsx") ? topic.files[1] : undefined;
  const isReport = topic.slug === "seguimiento-medicion";

  return (
    <div
      className={
        isReport
          ? "mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16"
          : "mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-12"
      }
    >
      <RoomChrome
        title={topic.title}
        position={displayPosition}
        total={readyTopics.length}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />

      <div className={isReport ? "space-y-16 md:space-y-20" : "space-y-12"}>
        <div
          className={
            isReport
              ? "mx-auto max-w-[68ch] text-lg leading-8 text-pretty text-brand-plum-ink/90"
              : "max-w-3xl whitespace-pre-line text-lg leading-relaxed text-brand-plum-ink/85"
          }
        >
          {topic.body}
        </div>
        {topic.sipocRows ? <SipocTable rows={topic.sipocRows} /> : null}
        {topic.slug === "control-operacional" ? (
          <OperationalControlTable rows={OPERATIONAL_CONTROLS} />
        ) : null}
        {topic.slug === "seguimiento-medicion" ? <IndicatorDashboard /> : null}
        {topic.slug === "emergencias" ? <EmergencyBoard /> : null}

        <section
          className={
            isReport
              ? "w-full min-w-0 border-t border-brand-plum/10 pt-16 md:pt-20"
              : "w-full min-w-0 border-t border-brand-plum/10 pt-8"
          }
          aria-label={topic.kind === "text" ? "Documento del tema" : "Entregable adjunto"}
        >
          {skipSpreadsheetPreview ? (
            <DownloadLink href={assetUrl(topic.files[0] ?? "")}>Descargar Excel</DownloadLink>
          ) : (
            <DeliverableViewer topic={topic} />
          )}
          {extraWorkbook ? (
            <div className="mt-6">
              <DownloadLink href={assetUrl(extraWorkbook)}>Descargar matriz de desastres</DownloadLink>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
