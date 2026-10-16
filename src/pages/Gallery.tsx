import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GALLERY, LINKS } from "../data";
import {
  Eyebrow,
  IconArrowRight,
  IconArrowUpRight,
  IconX,
  Reveal,
  Tri,
} from "../components/kit";

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */

function Lightbox({
  start,
  onClose,
}: {
  start: number;
  onClose: () => void;
}) {
  const [cur, setCur] = useState(start);
  const closeRef = useRef<HTMLButtonElement>(null);

  const step = useCallback(
    (dir: number) =>
      setCur((c) => (c + dir + GALLERY.length) % GALLERY.length),
    []
  );

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, step]);

  const item = GALLERY[cur];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer — ${item.caption}`}
      className="fade-swap fixed inset-0 z-[100] flex flex-col bg-ink/95"
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-ash">
          {String(cur + 1).padStart(2, "0")}
          <span className="mx-1.5 text-ash/40">/</span>
          {String(GALLERY.length).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          onClick={onClose}
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-ash transition-colors hover:border-gold hover:text-gold"
          aria-label="Close image viewer (Escape)"
        >
          <IconX className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-8 md:px-24">
        <button
          onClick={() => step(-1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-line text-ash transition-colors hover:border-gold hover:text-gold md:flex lg:left-6"
        >
          <IconArrowRight className="h-5 w-5 rotate-180" />
        </button>

        <figure key={cur} className="fade-swap max-h-full">
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[70vh] w-auto max-w-full border border-line object-contain"
          />
          <figcaption className="mt-4 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ash">
            <Tri className="h-2 w-2.5 text-gold" />
            {item.caption}
          </figcaption>
        </figure>

        <button
          onClick={() => step(1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-line text-ash transition-colors hover:border-gold hover:text-gold md:flex lg:right-6"
        >
          <IconArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* mobile prev/next */}
      <div className="flex items-center justify-center gap-4 pb-6 md:hidden">
        <button
          onClick={() => step(-1)}
          aria-label="Previous image"
          className="flex h-12 w-12 cursor-pointer items-center justify-center border border-line text-ash"
        >
          <IconArrowRight className="h-5 w-5 rotate-180" />
        </button>
        <button
          onClick={() => step(1)}
          aria-label="Next image"
          className="flex h-12 w-12 cursor-pointer items-center justify-center border border-line text-ash"
        >
          <IconArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery page                                                       */
/* ------------------------------------------------------------------ */

export default function Gallery() {
  const [current, setCurrent] = useState<number | null>(null);

  return (
    <main className="pt-24 md:pt-28">
      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <Link
            to="/"
            className="link-under inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ash transition-colors hover:text-gold"
          >
            <IconArrowRight className="h-4 w-4 rotate-180" />
            Back to Dynasty Barbers
          </Link>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <Eyebrow>
                <Tri className="mr-2 inline-block h-2.5 w-3 text-gold" />
                The Work
              </Eyebrow>
              <h1 className="h-display mt-4 text-7xl leading-[0.9] md:text-9xl">
                Gallery<span className="text-gold">.</span>
              </h1>
              <p className="mt-5 max-w-xl leading-relaxed text-ash">
                Fades, tapers, scissor work, beard grooming and razor shaves —
                the kind of detail this shop is built around. Tap any image to
                see it larger.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <Link to="/book" className="btn-gold">
                Book Your Haircut
                <IconArrowRight className="arr h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Photo gallery" className="pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="columns-2 gap-5 md:columns-3">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={(i % 3) * 70} className="mb-5 break-inside-avoid">
                <button
                  onClick={() => setCurrent(i)}
                  className="group block w-full cursor-pointer border border-line bg-coal text-left"
                  aria-label={`Open image: ${g.caption}`}
                >
                  <span className="block overflow-hidden" style={{ aspectRatio: g.ratio }}>
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      className="img-zoom h-full w-full object-cover"
                    />
                  </span>
                  <span className="flex items-center justify-between gap-3 px-3.5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-ash transition-colors group-hover:text-gold">
                    {g.caption}
                    <IconArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-line pt-7 text-xs leading-relaxed text-ash md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl">
              Photography shown here is illustrative placeholder imagery.
              Fresh cuts from our chair are posted daily on{" "}
              <a
                href={LINKS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold link-under"
              >
                @dynasty_barbers
              </a>
              .
            </p>
            <p>
              Walk-ins accepted on daily availability — or{" "}
              <a href={LINKS.phone} className="text-gold link-under">
                call {LINKS.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {current !== null && <Lightbox start={current} onClose={() => setCurrent(null)} />}
    </main>
  );
}
