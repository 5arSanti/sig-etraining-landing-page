import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { businessLines, businessLinesHeading } from '@/content/company';
import { routes } from '@/app/routes';

function ArrowIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d={direction === 'prev' ? 'M15 6 9 12l6 6' : 'M9 6l6 6-6 6'}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BusinessLinesCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = Math.min(node.clientWidth * 0.85, 360);
    node.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <h2 className="mb-10 text-center text-3xl font-bold text-brand-plum-ink md:text-4xl">
        {businessLinesHeading}
      </h2>

      <button
        type="button"
        aria-label="Ver líneas anteriores"
        onClick={() => scrollByCard(-1)}
        className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-orange text-white shadow-md transition hover:bg-brand-orange-deep md:flex"
      >
        <ArrowIcon direction="prev" />
      </button>
      <button
        type="button"
        aria-label="Ver líneas siguientes"
        onClick={() => scrollByCard(1)}
        className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-orange text-white shadow-md transition hover:bg-brand-orange-deep md:flex"
      >
        <ArrowIcon direction="next" />
      </button>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 md:px-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {businessLines.map((line) => (
          <article
            key={line.title}
            className="flex w-[min(100%,20rem)] shrink-0 snap-start flex-col rounded-[var(--radius-card)] bg-brand-plum p-6 text-white shadow-[0_12px_28px_rgba(64,10,62,0.28)]"
          >
            <div className="relative mx-auto mb-6 h-40 w-40">
              <span
                className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_center,var(--color-brand-orange)_0%,transparent_70%)] opacity-80"
                aria-hidden="true"
              />
              <img
                src={line.imageSrc}
                alt=""
                className="relative h-full w-full rounded-full object-cover ring-4 ring-brand-orange/35"
                loading="lazy"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold leading-snug text-brand-orange">{line.title}</h3>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-white/90">{line.body}</p>
            <Link
              to={routes.nosotros}
              className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-pill)] bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-amber hover:text-brand-plum-ink"
            >
              Ver más
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
