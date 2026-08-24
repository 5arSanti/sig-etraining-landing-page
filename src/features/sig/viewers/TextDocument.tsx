type TextDocumentProps = {
  title: string;
  organization: string;
  content: string;
};

export function TextDocument({ title, organization, content }: TextDocumentProps) {
  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-brand-plum/10 bg-white shadow-[0_8px_24px_rgba(64,10,62,0.08)]">
      <header className="border-b border-brand-orange/40 bg-brand-plum px-6 py-6 text-white md:px-10 md:py-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-amber">
          {organization}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
        <p className="mt-2 text-sm text-white/80">Sistema Integrado de Gestión</p>
      </header>

      <div className="bg-brand-cream/50 px-6 py-8 md:px-10 md:py-10">
        <blockquote className="border-l-4 border-brand-orange pl-5 md:pl-6">
          <p className="text-base leading-relaxed text-brand-plum-ink md:text-lg md:leading-[1.75]">
            {content}
          </p>
        </blockquote>

        <footer className="mt-8 border-t border-brand-plum/10 pt-6 text-sm text-brand-muted">
          <p className="font-semibold text-brand-plum">Alta Dirección · Etraining S.A.S.</p>
          <p className="mt-1">Política comunicada a todos los niveles de la organización.</p>
        </footer>
      </div>
    </article>
  );
}
