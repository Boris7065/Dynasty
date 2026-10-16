import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";

/* ---------------------------------------------------------------- */
/*  Motion preference helper                                         */
/* ---------------------------------------------------------------- */

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollBehavior = (): ScrollBehavior =>
  prefersReducedMotion() ? "auto" : "smooth";

/* ---------------------------------------------------------------- */
/*  Section navigation that works across the home + gallery routes   */
/* ---------------------------------------------------------------- */

export function useSectionNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pending = useRef<string | null>(null);

  useEffect(() => {
    if (pathname === "/" && pending.current) {
      const id = pending.current;
      pending.current = null;
      window.setTimeout(
        () =>
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: scrollBehavior(), block: "start" }),
        90
      );
    }
  }, [pathname]);

  return (id: string) => {
    if (pathname === "/") {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    } else {
      pending.current = id;
      navigate("/");
    }
  };
}

/* ---------------------------------------------------------------- */
/*  Scroll reveal                                                    */
/* ---------------------------------------------------------------- */

export function Reveal({
  as = "div",
  className,
  delay = 0,
  children,
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      style={{ "--rd": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------- */
/*  Brand                                                            */
/* ---------------------------------------------------------------- */

export function Tri({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M10 0l10 16H0Z" />
    </svg>
  );
}

export function Wordmark({
  className,
  sub = true,
  light = false,
}: {
  className?: string;
  sub?: boolean;
  light?: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="h-display text-2xl tracking-[0.08em]">
        DYN
        <Tri className="mx-[0.09em] inline-block h-[0.5em] w-[0.66em] translate-y-[0.09em] text-gold" />
        STY
      </span>
      {sub && (
        <span
          className={cn(
            "mt-[3px] text-[9px] font-bold uppercase tracking-[0.42em]",
            light ? "text-ink/60" : "text-ash"
          )}
        >
          Barbers
        </span>
      )}
    </span>
  );
}

/* ---------------------------------------------------------------- */
/*  Section eyebrow + stars                                          */
/* ---------------------------------------------------------------- */

export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      {index && (
        <>
          <span className="text-gold">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}

export function Stars({ size = "h-3.5 w-3.5" }: { size?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-gold" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <IconStar key={i} className={size} />
      ))}
    </span>
  );
}

/* ---------------------------------------------------------------- */
/*  Marquee                                                          */
/* ---------------------------------------------------------------- */

export function Marquee({
  items,
  className,
  dark = false,
}: {
  items: string[];
  className?: string;
  dark?: boolean;
}) {
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span
            className={cn(
              "h-display whitespace-nowrap px-6 text-2xl tracking-[0.06em] uppercase md:text-3xl",
              dark ? "text-bone" : "text-ink"
            )}
          >
            {t}
          </span>
          <Tri
            className={cn("h-2.5 w-3 shrink-0", dark ? "text-gold" : "text-ink/50")}
          />
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("marquee", className)}>
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Icons — single stroke family, 24px grid                          */
/* ---------------------------------------------------------------- */

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function IconPin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.92 6.26 6.58.57-5 4.35 1.5 6.45L12 16.9 6 19.63l1.5-6.45-5-4.35 6.58-.57L12 2z" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconX({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconNavigation({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M3 11 22 2l-9 19-2-8-8-2z" />
    </svg>
  );
}

export function IconScissors({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
    </svg>
  );
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8v.01" />
    </svg>
  );
}

export function IconFacebook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M14 4h-2a4 4 0 0 0-4 4v3H5.5v3.5H8V21h3.5v-6.5H14l.75-3.5H11.5V8.5a1 1 0 0 1 1-1H14V4z" />
    </svg>
  );
}

export function IconTikTok({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M14 3v11.5a4.25 4.25 0 1 1-4.25-4.25" />
      <path d="M14 3.8c.6 2.6 2.3 4.2 5 4.4" />
    </svg>
  );
}

export function IconYouTube({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="m10.5 9.5 5 2.5-5 2.5v-5z" />
    </svg>
  );
}
