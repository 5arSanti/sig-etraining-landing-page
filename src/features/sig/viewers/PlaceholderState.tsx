type PlaceholderStateProps = {
  title?: string;
  owner?: string;
  scope?: string;
};

export function PlaceholderState({ title, owner, scope }: PlaceholderStateProps) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-brand-plum/25 bg-brand-cream/40 p-8">
      <p className="font-semibold text-brand-plum">Contenido en construcción</p>
      {title ? <p className="mt-2 text-xl font-bold text-brand-plum-ink">{title}</p> : null}
      {owner ? <p className="mt-2 text-sm font-medium text-brand-orange">{owner}</p> : null}
      {scope ? <p className="mt-3 text-brand-plum-ink/85">{scope}</p> : null}
      <p className="mt-4 text-brand-muted">Este tema se publicará aquí.</p>
    </div>
  );
}
