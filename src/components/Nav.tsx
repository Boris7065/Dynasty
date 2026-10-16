import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LINKS, NAV_LINKS } from "../data";
import {
  IconMenu,
  IconPhone,
  IconX,
  IconArrowRight,
  IconInstagram,
  IconFacebook,
  IconTikTok,
  IconYouTube,
  Tri,
  Wordmark,
  scrollBehavior,
  useSectionNav,
} from "./kit";
import { cn } from "../utils/cn";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const go = useSectionNav();
  const menuRef = useRef<HTMLDivElement>(null);

  /* solid header after scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll while menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* close on Escape, focus first control */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    menuRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* active section highlighting on home */
  useEffect(() => {
    if (pathname !== "/") {
      setActive("");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  const pick = (id: string) => {
    setOpen(false);
    go(id);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled ? "border-b border-line bg-ink" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-4 px-5 md:px-8">
          <Link
            to="/"
            className="shrink-0"
            aria-label="Dynasty Barbers — home"
            onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
          >
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-5 lg:flex xl:gap-7">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => pick(l.id)}
                className={cn(
                  "link-under cursor-pointer py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors xl:text-[12px] xl:tracking-[0.18em]",
                  active === l.id ? "active text-gold" : "text-bone/85 hover:text-bone"
                )}
              >
                {l.label}
              </button>
            ))}
            <Link
              to="/gallery"
              className={cn(
                "link-under py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors xl:text-[12px] xl:tracking-[0.18em]",
                pathname === "/gallery"
                  ? "active text-gold"
                  : "text-bone/85 hover:text-bone"
              )}
            >
              Gallery
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <a
              href={LINKS.phone}
              className="hidden items-center gap-2 text-sm font-semibold text-ash transition-colors hover:text-gold xl:inline-flex"
            >
              <IconPhone className="h-4 w-4 text-gold" />
              {LINKS.phoneDisplay}
            </a>
            <Link
              to="/book"
              aria-current={pathname === "/book" ? "page" : undefined}
              className={cn(
                "btn-gold hidden px-5 py-3 md:inline-flex",
                pathname === "/book" && "bg-brass"
              )}
            >
              Book Now
            </Link>
            <button
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-bone transition-colors hover:border-gold hover:text-gold lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* -------- mobile menu -------- */}
      <div
        ref={menuRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 z-[70] flex flex-col bg-ink outline-none transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-line px-5">
          <Wordmark />
          <button
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-bone transition-colors hover:border-gold hover:text-gold"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-8">
          {[{ id: "top", label: "Home" }, ...NAV_LINKS, { id: "gallery", label: "Gallery" }].map(
            (l, i) => (
              <div
                key={l.id}
                className={cn(
                  "border-b border-line transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                )}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              >
                {l.id === "gallery" ? (
                  <Link
                    to="/gallery"
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="text-xs font-bold text-ash">10</span>
                    <span className="h-display text-4xl tracking-[0.04em] uppercase">
                      Gallery
                    </span>
                  </Link>
                ) : l.id === "top" ? (
                  <button
                    onClick={() => {
                      setOpen(false);
                      window.scrollTo({ top: 0, behavior: scrollBehavior() });
                    }}
                    className="flex w-full cursor-pointer items-baseline gap-4 py-4 text-left"
                  >
                    <span className="text-xs font-bold text-ash">00</span>
                    <span className="h-display text-4xl tracking-[0.04em] uppercase">
                      Home
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => pick(l.id)}
                    className="flex w-full cursor-pointer items-baseline gap-4 py-4 text-left"
                  >
                    <span className="text-xs font-bold text-ash">
                      {String(i).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "h-display text-4xl tracking-[0.04em] uppercase",
                        active === l.id ? "text-gold" : "text-bone"
                      )}
                    >
                      {l.label}
                    </span>
                  </button>
                )}
              </div>
            )
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/book" onClick={() => setOpen(false)} className="btn-gold">
              Book a Chair
              <IconArrowRight className="arr h-4 w-4" />
            </Link>
            <a href={LINKS.phone} className="btn-line">
              <IconPhone className="h-4 w-4" />
              {LINKS.phoneDisplay}
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5">
            <Tri className="h-3 w-4 text-gold" />
            <a href={LINKS.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-ash transition-colors hover:text-gold">
              <IconInstagram className="h-5 w-5" />
            </a>
            <a href={LINKS.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-ash transition-colors hover:text-gold">
              <IconFacebook className="h-5 w-5" />
            </a>
            <a href={LINKS.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-ash transition-colors hover:text-gold">
              <IconTikTok className="h-5 w-5" />
            </a>
            <a href={LINKS.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-ash transition-colors hover:text-gold">
              <IconYouTube className="h-5 w-5" />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
