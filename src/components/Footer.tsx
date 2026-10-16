import { Link } from "react-router-dom";
import { ADDRESS, LINKS, NAV_LINKS, SERVICES } from "../data";
import {
  IconArrowUpRight,
  IconFacebook,
  IconInstagram,
  IconNavigation,
  IconPhone,
  IconPin,
  IconTikTok,
  IconYouTube,
  Tri,
  Wordmark,
  useSectionNav,
} from "./kit";

const SOCIALS = [
  { label: "Instagram", href: LINKS.social.instagram, Icon: IconInstagram },
  { label: "Facebook", href: LINKS.social.facebook, Icon: IconFacebook },
  { label: "TikTok", href: LINKS.social.tiktok, Icon: IconTikTok },
  { label: "YouTube", href: LINKS.social.youtube, Icon: IconYouTube },
];

export default function Footer() {
  const go = useSectionNav();

  return (
    <footer className="border-t border-line bg-coal">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            <Wordmark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ash">
              Your Cut. Your Confidence. Clean fades, tapers, scissor work and
              grooming on South University Drive, Davie.
            </p>
            <ul className="mt-7 flex items-center gap-4">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Dynasty Barbers on ${label}`}
                    className="inline-flex h-10 w-10 items-center justify-center border border-line text-ash transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* explore */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link
                  to="/book"
                  className="font-semibold text-gold transition-colors hover:text-brass"
                >
                  Book a Chair
                </Link>
              </li>
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="cursor-pointer text-sm text-ash transition-colors hover:text-gold"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/gallery"
                  className="text-sm text-ash transition-colors hover:text-gold"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </nav>

          {/* services */}
          <div className="lg:col-span-3">
            <p className="eyebrow text-gold">Menu</p>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-3">
                  <span className="text-sm text-ash">{s.name}</span>
                  <span className="text-xs font-semibold text-bone/70">
                    {s.price.replace("from ", "")}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={LINKS.booksy}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold link-under"
            >
              Live prices &amp; booking on Booksy
              <IconArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* visit */}
          <div className="lg:col-span-2">
            <p className="eyebrow text-gold">Visit</p>
            <address className="mt-5 text-sm not-italic leading-relaxed text-ash">
              {ADDRESS.street}
              <br />
              {ADDRESS.city}
              <br />
              <a href={LINKS.phone} className="mt-2 inline-block font-semibold text-bone transition-colors hover:text-gold">
                {LINKS.phoneDisplay}
              </a>
            </address>
            <a
              href={LINKS.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-gold link-under"
            >
              <IconNavigation className="h-4 w-4" />
              Directions
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 text-xs text-ash md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2">
            <Tri className="h-2.5 w-3 text-gold" />
            <span>
              © {new Date().getFullYear()} DYN▲STY Barbers Barbershop · Davie, FL
            </span>
          </p>
          <p className="flex items-center gap-2">
            <IconPin className="h-3.5 w-3.5 text-gold" />
            <IconPhone className="h-3.5 w-3.5 text-gold" />
            <span>Your Cut. Your Confidence.</span>
          </p>
          <p className="text-ash/70">
            Prices shown are starting rates. Photography shown is illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
