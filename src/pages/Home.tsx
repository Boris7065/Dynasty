import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ADDRESS,
  LINKS,
  REVIEWS,
  SERVICES,
  STYLE_CATEGORIES,
  WORK_STRIP,
} from "../data";
import {
  Eyebrow,
  IconArrowRight,
  IconArrowUpRight,
  IconChevronDown,
  IconNavigation,
  IconPhone,
  IconPin,
  IconScissors,
  Marquee,
  Reveal,
  Stars,
  Tri,
  useSectionNav,
} from "../components/kit";
import { cn } from "../utils/cn";

const IMG = {
  heroMain:
    "https://images.pexels.com/photos/4625626/pexels-photo-4625626.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1150",
  heroSmall:
    "https://images.pexels.com/photos/12464841/pexels-photo-12464841.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=680&h=510",
  storyMain:
    "https://images.pexels.com/photos/13138476/pexels-photo-13138476.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1040&h=720",
  storySmall:
    "https://images.pexels.com/photos/19664892/pexels-photo-19664892.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=860",
};

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */

function Hero() {
  const go = useSectionNav();
  return (
    <section aria-label="Intro" className="relative overflow-hidden pt-28 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-gold/[0.06] blur-3xl"
      />
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          {/* copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <Tri className="h-2.5 w-3 text-gold" />
                Davie, Florida · S University Drive
              </p>
            </Reveal>
            <h1 className="h-display mt-6 text-[13vw] leading-[0.9] sm:text-[84px] lg:text-7xl xl:text-8xl">
              <span className="mask-line">
                <span style={{ "--md": "120ms" } as React.CSSProperties}>Your Cut.</span>
              </span>
              <span className="mask-line text-gold">
                <span style={{ "--md": "300ms" } as React.CSSProperties}>
                  Your Confidence.
                </span>
              </span>
            </h1>
            <Reveal delay={150}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-ash md:text-lg">
                Dynasty Barbers is where clean fades, sharp lineups and precise
                scissor work meet personalized service — a barbershop on South
                University Drive, minutes from Griffin Road and NSU. The
                consultation matters as much as the finish.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/book" className="btn-gold">
                  Book Your Haircut
                  <IconArrowRight className="arr h-4 w-4" />
                </Link>
                <button onClick={() => go("work")} className="btn-line">
                  View Our Work
                </button>
              </div>
            </Reveal>
            <Reveal delay={350}>
              <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 text-sm text-ash">
                <a
                  href={LINKS.phone}
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <IconPhone className="h-4 w-4 text-gold" />
                  {LINKS.phoneDisplay}
                </a>
                <span className="inline-flex items-center gap-2">
                  <IconPin className="h-4 w-4 text-gold" />
                  4288 S University Dr, Davie
                </span>
                <span className="inline-flex items-center gap-2.5">
                  <Stars size="h-3 w-3" />
                  4.7 Google · 5.0 Booksy
                </span>
              </div>
            </Reveal>
          </div>

          {/* imagery */}
          <div className="relative pb-14 sm:pb-10 lg:col-span-5 lg:pb-0">
            <Reveal delay={200} className="relative">
              <div
                aria-hidden
                className="absolute -right-4 -top-4 hidden h-full w-full border border-gold/40 sm:block"
              />
              <div className="relative overflow-hidden border border-line">
                <img
                  src={IMG.heroMain}
                  alt="Barber finishing a fresh haircut in a modern barbershop"
                  className="kenburns aspect-[4/5] w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
                />
                <p className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.3em] text-bone/90">
                  From the chair, Davie
                </p>
              </div>
              <div className="absolute -bottom-9 -left-6 hidden w-48 border border-line bg-ink sm:block md:-left-12 md:w-56">
                <img
                  src={IMG.heroSmall}
                  alt="Razor-finished fade detail"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-ash">
                  Razor-finished
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* marquee */}
      <div className="mt-16 border-y border-line bg-coal py-4 md:mt-20">
        <Marquee
          items={[
            "Skin Fades",
            "Tapers",
            "Scissor Cuts",
            "Beard Trims",
            "Hot Towel Shaves",
            "Line-Ups",
            "Kids' Cuts",
            "VIP Grooming",
          ]}
        />
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STORY                                                              */
/* ================================================================== */

function Story() {
  return (
    <section id="story" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-8 lg:grid-cols-12">
        {/* imagery */}
        <Reveal className="relative order-2 lg:order-1 lg:col-span-5">
          <div className="relative">
            <div className="overflow-hidden border border-line">
              <img
                src={IMG.storyMain}
                alt="Barbershop interior with leather chairs and mirrors"
                loading="lazy"
                className="aspect-[10/7] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-4 w-40 border border-line bg-ink sm:-right-8 sm:w-52">
              <img
                src={IMG.storySmall}
                alt="Barber at work in a modern barbershop"
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <div
              aria-hidden
              className="absolute -left-4 -top-4 hidden h-full w-full border border-gold/30 sm:block"
            />
          </div>
        </Reveal>

        {/* copy */}
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow index="01">Our Story</Eyebrow>
            <h2 className="h-display mt-5 text-5xl leading-[0.95] md:text-7xl">
              Precision is
              <br />
              <span className="text-gold">the point.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ash md:text-lg">
              A fresh cut starts with you. Dynasty Barbers is a Davie barbershop
              built on considered details — the consultation, the cut, and the
              way you walk out the door. Current styles, clean finishes, and a
              chair that's open to everyone in the neighborhood.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <dl className="mt-9 border-y border-line">
              {[
                ["Personalized service", "From the first question to the last look in the mirror"],
                ["Tailored to you", "Styling around your hair, your routine, your face"],
                ["Clean, detailed work", "Sharp, current finishes on every appointment"],
              ].map(([t, d], i) => (
                <div
                  key={t}
                  className={cn(
                    "flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6",
                    i > 0 && "border-t border-line"
                  )}
                >
                  <dt className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.14em] text-bone sm:w-56 sm:shrink-0">
                    <Tri className="h-2 w-2.5 shrink-0 text-gold" />
                    {t}
                  </dt>
                  <dd className="text-sm text-ash">{d}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={260}>
            <blockquote className="mt-9 border-l-2 border-gold pl-5">
              <p className="text-xl font-medium leading-snug md:text-2xl">
                "We believe in personalized customer service."
              </p>
              <cite className="mt-2 block text-sm not-italic text-ash">
                — Dynasty Barbers, Davie FL
              </cite>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  WORK                                                               */
/* ================================================================== */

function Work() {
  return (
    <section id="work" className="border-y border-line bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Eyebrow index="02">Our Work</Eyebrow>
            <h2 className="h-display mt-5 text-5xl md:text-7xl">
              From the chair<span className="text-gold">.</span>
            </h2>
            <p className="mt-4 max-w-lg text-ash">
              Real cuts. Sharp finishes. A look at the detail this shop is
              built around — fades, tapers, scissor work and razor shaves.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              to="/gallery"
              className="link-under inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-gold"
            >
              View Full Gallery
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>

      <Reveal delay={150}>
        <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:-mx-8 md:px-8">
          {WORK_STRIP.map((w, i) => (
            <figure key={w.caption} className="w-[72vw] shrink-0 snap-start sm:w-[340px]">
              <div className="group overflow-hidden border border-line bg-smoke">
                <div style={{ aspectRatio: w.ratio }}>
                  <img
                    src={w.src}
                    alt={w.alt}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="img-zoom h-full w-full object-cover"
                  />
                </div>
              </div>
              <figcaption className="mt-3 flex items-baseline gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-ash">
                <span className="text-gold">{String(i + 1).padStart(2, "0")}</span>
                {w.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-[1400px] flex-wrap items-center justify-between gap-5 px-5 md:px-8">
        <p className="max-w-xl text-xs leading-relaxed text-ash">
          Photography shown is illustrative. Fresh cuts from our chair are
          posted daily on{" "}
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
        <Link to="/gallery" className="btn-line">
          Open the Gallery
          <IconArrowRight className="arr h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SERVICES                                                           */
/* ================================================================== */

function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow index="03">Services &amp; Price List</Eyebrow>
            <h2 className="h-display mt-5 text-5xl md:text-7xl">
              The menu<span className="text-gold">.</span>
            </h2>
          </Reveal>
          <ul className="mt-10">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 60}>
                <div className="group border-b border-line py-5 first:border-t">
                  <div className="flex items-baseline gap-4">
                    <h3 className="flex items-center gap-3 text-lg font-semibold md:text-xl">
                      {s.name}
                      {s.flag && (
                        <span className="border border-gold/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
                          {s.flag}
                        </span>
                      )}
                    </h3>
                    <span
                      aria-hidden
                      className="relative -top-1 flex-1 border-b border-dotted border-line/80"
                    />
                    <span className="h-display text-3xl tracking-[0.04em] text-gold">
                      {s.price}
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-md text-sm text-ash">{s.note}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={200} className="lg:sticky lg:top-28">
            <div className="border border-line bg-coal p-7 md:p-8">
              <p className="eyebrow text-gold">Starting prices</p>
              <p className="mt-4 text-sm leading-relaxed text-ash">
                Prices shown are starting rates. Final price and what's included
                vary by barber and service — your barber confirms the details
                before you sit down.
              </p>
              <a
                href={LINKS.booksy}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-7 w-full"
              >
                See Live Prices on Booksy
                <IconArrowRight className="arr h-4 w-4" />
              </a>
              <p className="mt-5 text-xs leading-relaxed text-ash/80">
                Walk-ins are accepted based on daily barber availability.
                Scheduled appointments take priority.
              </p>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STYLES                                                             */
/* ================================================================== */

function Styles() {
  const [activeId, setActiveId] = useState(STYLE_CATEGORIES[0].id);
  const active =
    STYLE_CATEGORIES.find((c) => c.id === activeId) ?? STYLE_CATEGORIES[0];

  return (
    <section id="styles" className="border-y border-line bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <Eyebrow index="04">Haircut Styles</Eyebrow>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <h2 className="h-display text-5xl md:text-7xl">
              Find your next look<span className="text-gold">.</span>
            </h2>
            <p className="max-w-sm text-sm text-ash">
              Fades, tapers, scissor work, textured styles and full grooming —
              shaped around your hair, your routine, and your style.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* category rail */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="border-t border-line">
                  {STYLE_CATEGORIES.map((c, i) => {
                    const isActive = c.id === activeId;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setActiveId(c.id)}
                        aria-pressed={isActive}
                        className={cn(
                          "flex w-full cursor-pointer items-baseline gap-4 border-b border-line py-4 text-left transition-colors duration-300",
                          isActive ? "text-gold" : "text-bone hover:text-brass"
                        )}
                      >
                        <span className={cn("text-xs font-bold", isActive ? "text-gold" : "text-ash")}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-display text-3xl tracking-[0.03em] md:text-4xl">
                          {c.name}
                        </span>
                        <Tri
                          className={cn(
                            "ml-auto h-2.5 w-3 shrink-0 self-center transition-opacity duration-300",
                            isActive ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="mt-6 max-w-sm text-xs leading-relaxed text-ash">
                  These are style categories and inspiration, not a fixed
                  menu. Bring a reference photo — your barber will confirm what
                  fits your hair type, face shape and routine.
                </p>
              </Reveal>
            </div>
          </div>

          {/* active panel */}
          <div className="lg:col-span-7">
            <div key={active.id} className="fade-swap grid items-start gap-8 md:grid-cols-2">
              <div className="group overflow-hidden border border-line">
                <img
                  src={active.img}
                  alt={active.alt}
                  loading="lazy"
                  className="img-zoom aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="md:pt-2">
                <p className="text-lg leading-relaxed text-ash">{active.desc}</p>
                <ul className="mt-7 grid gap-x-6 sm:grid-cols-2">
                  {active.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-3 border-b border-line py-2.5 text-sm text-bone/90"
                    >
                      <Tri className="h-2 w-2.5 shrink-0 text-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link to={`/book?service=${active.id}`} className="btn-line mt-8">
                  Book This Style
                  <IconArrowRight className="arr h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  PROMOTIONS                                                         */
/* ================================================================== */

function Promotions() {
  return (
    <section id="offers" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <Eyebrow index="05">Promotions</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative mt-10 border border-gold/50 bg-coal">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-gold"
            />
            <div className="grid md:grid-cols-[minmax(0,340px)_1fr]">
              <div className="flex flex-col items-center justify-center border-b border-dashed border-gold/40 p-10 text-center md:border-b-0 md:border-l">
                <p className="h-display text-[5.5rem] leading-none text-gold md:text-[7rem]">
                  50%
                </p>
                <p className="eyebrow mt-3 tracking-[0.24em]">
                  Off your first standard cut
                </p>
              </div>
              <div className="p-8 md:p-12">
                <p className="eyebrow text-gold">Member offer — Crunch Fitness</p>
                <h2 className="h-display mt-4 max-w-xl text-4xl leading-[0.95] md:text-6xl">
                  New client? Half off your first visit.
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed text-ash">
                  Active Crunch Fitness members can get 50% off their first
                  standard haircut through the quarterly DYN▲STY member offer.
                  One use per person.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={LINKS.crunch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    Claim the Crunch Offer
                    <IconArrowRight className="arr h-4 w-4" />
                  </a>
                  <a href={LINKS.phone} className="btn-line">
                    <IconPhone className="h-4 w-4" />
                    {LINKS.phoneDisplay}
                  </a>
                </div>
                <p className="mt-6 max-w-xl text-xs leading-relaxed text-ash/80">
                  Subject to the original offer's terms and eligibility — verify
                  the offer is still active when you claim it or call the shop.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  REVIEWS                                                            */
/* ================================================================== */

function Reviews() {
  return (
    <section id="reviews" className="border-y border-line bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <Eyebrow index="06">Customer Reviews</Eyebrow>
          <h2 className="h-display mt-5 text-5xl md:text-7xl">
            What clients say<span className="text-gold">.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* scores */}
          <div className="space-y-5 lg:col-span-4">
            <Reveal>
              <div className="border border-line bg-ink p-7">
                <div className="flex items-end gap-5">
                  <span className="h-display text-7xl leading-none text-gold">
                    {REVIEWS.google.score}
                  </span>
                  <div className="pb-1">
                    <Stars />
                    <p className="mt-1.5 text-xs text-ash">
                      {REVIEWS.google.count} reviews · Google
                    </p>
                  </div>
                </div>
                <a
                  href={LINKS.googlePlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold link-under"
                >
                  Read them on Google
                  <IconArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="border border-line bg-ink p-7">
                <div className="flex items-end gap-5">
                  <span className="h-display text-7xl leading-none text-gold">
                    {REVIEWS.booksy.score}
                  </span>
                  <div className="pb-1">
                    <Stars />
                    <p className="mt-1.5 text-xs text-ash">
                      {REVIEWS.booksy.count} reviews · Booksy
                    </p>
                    <p className="text-xs text-ash/70">
                      {REVIEWS.booksy.barber}
                    </p>
                  </div>
                </div>
                <a
                  href={LINKS.booksy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold link-under"
                >
                  Read them on Booksy
                  <IconArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <p className="text-xs leading-relaxed text-ash/80">
                Scores are a snapshot from the shop's website
                ({REVIEWS.google.asOf.replace("as of ", "")}) and change over
                time — check the live ratings on each platform.
              </p>
            </Reveal>
          </div>

          {/* quotes */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {REVIEWS.google.quotes.map((q, i) => (
              <Reveal key={q} delay={i * 80} className={cn("h-full", i === 0 && "sm:col-span-2")}>
                <figure className="relative h-full border border-line bg-ink p-7">
                  <span
                    aria-hidden
                    className="h-display absolute -top-1 left-5 text-6xl text-gold/25"
                  >
                    "
                  </span>
                  <blockquote className="relative pt-4 text-base leading-relaxed text-bone/90 md:text-lg">
                    {q}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ash">
                    <Stars size="h-2.5 w-2.5" />
                    Google review
                  </figcaption>
                </figure>
              </Reveal>
            ))}
            {REVIEWS.booksy.quotes.map((q, i) => (
              <Reveal key={q} delay={i * 80} className="h-full">
                <figure className="relative h-full border border-gold/25 bg-ink p-7">
                  <span
                    aria-hidden
                    className="h-display absolute -top-1 left-5 text-6xl text-gold/25"
                  >
                    "
                  </span>
                  <blockquote className="relative pt-4 text-base leading-relaxed text-bone/90 md:text-lg">
                    {q}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ash">
                    <IconScissors className="h-3.5 w-3.5 text-gold" />
                    Booksy · {REVIEWS.booksy.barber}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  COACHING                                                           */
/* ================================================================== */

const TOPICS = [
  "Barber business development",
  "Pricing & service positioning",
  "Marketing & customer acquisition",
  "Building a loyal clientele",
  "Professional growth & organization",
];

function Coaching() {
  return (
    <section id="coaching" className="bg-gold py-24 text-ink md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ink/60">
                <Tri className="h-2.5 w-3 text-ink" />
                For Barbers · Coaching &amp; Mentorship
              </p>
              <h2 className="h-display mt-5 text-6xl leading-[0.9] md:text-8xl">
                Ready for your
                <br />
                next level?
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/75">
                Build the business behind your craft. Dynasty Barbers mentors
                barbers on stronger pricing, smarter marketing, building
                demand — and learning alongside other ambitious barbers.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <ul className="border-t border-ink/25">
                {TOPICS.map((t, i) => (
                  <li
                    key={t}
                    className="flex items-baseline gap-5 border-b border-ink/25 py-4 text-sm font-bold uppercase tracking-[0.1em] md:text-base"
                  >
                    <span className="h-display text-2xl text-ink/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={LINKS.coachInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-ink text-bone hover:bg-coal"
                >
                  DM Esteban — "Level Up"
                  <IconArrowUpRight className="arr h-4 w-4" />
                </a>
                <a href={LINKS.phone} className="btn border border-ink/40 text-ink hover:border-ink">
                  <IconPhone className="h-4 w-4" />
                  Call the shop
                </a>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-ink/60">
                Program details, availability and barber opportunities are
                shared on request.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  LOCATION                                                           */
/* ================================================================== */

function Location() {
  return (
    <section id="location" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-start gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow index="07">Booking &amp; Location</Eyebrow>
            <h2 className="h-display mt-5 text-5xl leading-[0.95] md:text-7xl">
              Book your cut
              <br />
              <span className="text-gold">near NSU.</span>
            </h2>
            <p className="mt-7 max-w-xl leading-relaxed text-ash">
              Find us on South University Drive in Davie — near Griffin Road,
              south of the Nova Southeastern University (NSU) Fort Lauderdale /
              Davie campus. Book right here on the site, straight through
              Booksy, or call and we'll plan your visit.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <address className="mt-9 border border-line bg-coal p-7 not-italic">
              <p className="h-display text-3xl tracking-[0.05em]">
                DYN<span className="text-gold">▲</span>STY Barbers Barbershop
              </p>
              <p className="mt-2 leading-relaxed text-ash">
                {ADDRESS.street}
                <br />
                {ADDRESS.city}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-sm font-semibold">
                <a href={LINKS.phone} className="text-gold link-under">
                  {LINKS.phoneDisplay}
                </a>
                <a
                  href={LINKS.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold link-under"
                >
                  Directions
                </a>
                <a
                  href={LINKS.booksy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold link-under"
                >
                  Book on Booksy
                </a>
              </div>
            </address>
            <p className="mt-5 text-xs leading-relaxed text-ash/80">
              {ADDRESS.areas}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/book" className="btn-gold">
                Book Your Haircut
                <IconArrowRight className="arr h-4 w-4" />
              </Link>
              <a
                href={LINKS.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line"
              >
                <IconNavigation className="h-4 w-4" />
                Get Directions
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="relative min-h-[340px] border border-line lg:min-h-[520px]">
          <iframe
            title="Map to Dynasty Barbers — 4288 S University Dr, Davie, FL 33328"
            src={LINKS.mapEmbed}
            className="absolute inset-0 h-full w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FAQ                                                                */
/* ================================================================== */

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "How do I book an appointment?",
    a: (
      <>
        The fastest way is{" "}
        <Link to="/book" className="text-gold link-under">
          right here on the site
        </Link>{" "}
        — pick your service, a day and a time, and you'll get a booking
        reference the shop confirms with you by call or text. Prefer instant
        online scheduling? Use our{" "}
        <a href={LINKS.booksy} target="_blank" rel="noopener noreferrer" className="text-gold link-under">
          Booksy calendar
        </a>{" "}
        and choose your barber and an open time. Call{" "}
        <a href={LINKS.phone} className="text-gold link-under">
          {LINKS.phoneDisplay}
        </a>{" "}
        if you'd like a hand choosing your barber.
      </>
    ),
  },
  {
    q: "Where is the barbershop located?",
    a: (
      <>
        4288 S University Dr, Davie, FL 33328 — near Griffin Road and south of
        the NSU Fort Lauderdale / Davie campus.{" "}
        <a href={LINKS.directions} target="_blank" rel="noopener noreferrer" className="text-gold link-under">
          Get directions on Google Maps
        </a>
        .
      </>
    ),
  },
  {
    q: "What are your prices?",
    a: (
      <>
        Starting prices: haircut $40+, haircut + beard $50+, kids' haircut
        $40+, lineup $25+, beard trim $30+, VIP grooming $70+. Final price
        depends on your barber and service — check{" "}
        <a href={LINKS.booksy} target="_blank" rel="noopener noreferrer" className="text-gold link-under">
          Booksy
        </a>{" "}
        for the latest menu and availability.
      </>
    ),
  },
  {
    q: "Do you take walk-ins?",
    a: (
      <>
        Walk-ins are accepted based on daily barber availability. Scheduled
        appointments take priority, so we recommend booking ahead or calling
        the shop first.
      </>
    ),
  },
  {
    q: "I'm not sure which style suits me — where do I start?",
    a: (
      <>
        Bring a reference photo. We'll walk through it with you — hair type,
        face shape, your routine — and confirm the style, service and price
        before the clipper comes out.
      </>
    ),
  },
  {
    q: "Is the Crunch Fitness offer available?",
    a: (
      <>
        Active Crunch Fitness members can get 50% off their first standard
        haircut through the quarterly member offer — one use per person.{" "}
        <a href={LINKS.crunch} target="_blank" rel="noopener noreferrer" className="text-gold link-under">
          Claim it here
        </a>
        , or call the shop to confirm it's currently active.
      </>
    ),
  },
  {
    q: "Do you offer coaching or barber opportunities?",
    a: (
      <>
        Yes — Dynasty Barbers mentors barbers on business development,
        pricing, marketing and building a clientele. DM{" "}
        <a href={LINKS.coachInstagram} target="_blank" rel="noopener noreferrer" className="text-gold link-under">
          Esteban "Level Up" on Instagram
        </a>{" "}
        to ask about coaching, availability and programs.
      </>
    ),
  },
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="border-t border-line bg-coal py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow index="08">FAQ</Eyebrow>
              <h2 className="h-display mt-5 text-5xl leading-[0.95] md:text-6xl">
                Before your
                <br />
                visit<span className="text-gold">.</span>
              </h2>
              <p className="mt-6 max-w-sm text-ash">
                Find your shop, choose your service, and plan your next cut.
                Anything else — just call.
              </p>
              <a
                href={LINKS.phone}
                className="mt-7 inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.16em] text-gold link-under"
              >
                <IconPhone className="h-4 w-4" />
                {LINKS.phoneDisplay}
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <ul className="border-t border-line">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q} className="border-b border-line">
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full cursor-pointer items-center gap-5 py-5 text-left"
                    >
                      <span
                        className={cn(
                          "h-display text-xl transition-colors",
                          isOpen ? "text-gold" : "text-ash/60"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-base font-semibold transition-colors md:text-lg",
                          isOpen ? "text-gold" : "text-bone"
                        )}
                      >
                        {f.q}
                      </span>
                      <IconChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-ash transition-transform duration-300",
                          isOpen && "rotate-180 text-gold"
                        )}
                      />
                    </button>
                    <div id={`faq-panel-${i}`} className={cn("acc", isOpen && "open")}>
                      <div>
                        <p className="max-w-2xl pb-6 pl-11 text-sm leading-relaxed text-ash md:text-base">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Work />
      <Services />
      <Styles />
      <Promotions />
      <Reviews />
      <Coaching />
      <Location />
      <Faq />
      <div className="border-t border-line bg-ink py-4">
        <Marquee dark items={["Your Cut. Your Confidence.", "Dynasty Barbers — Davie FL"]} />
      </div>
    </main>
  );
}
