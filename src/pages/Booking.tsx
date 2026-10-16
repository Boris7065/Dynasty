import { useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ADDRESS, LINKS, SERVICES } from "../data";
import {
  BARBERS,
  SLOTS,
  barberLabel,
  downloadICS,
  fmtDay,
  fmtTime,
  googleCalUrl,
  listBookings,
  makeRef,
  nextDays,
  removeBooking,
  saveBooking,
  smsHref,
  type BarberId,
  type Booking,
} from "../lib/booking";
import {
  Eyebrow,
  IconArrowRight,
  IconArrowUpRight,
  IconPhone,
  IconPin,
  IconX,
  Reveal,
  Tri,
} from "../components/kit";
import { cn } from "../utils/cn";

type Step = 1 | 2 | 3;

const STEPS: { n: Step; label: string }[] = [
  { n: 1, label: "Service" },
  { n: 2, label: "Date & Time" },
  { n: 3, label: "Your Details" },
];

const inputCls =
  "w-full border border-line bg-ink px-4 py-3.5 text-sm text-bone placeholder:text-ash/50 transition-colors focus:border-gold";

/* ------------------------------------------------------------------ */

export default function Booking() {
  const [params] = useSearchParams();
  const [step, setStep] = useState<Step>(1);
  const [serviceId, setServiceId] = useState<string | null>(
    SERVICES.some((s) => s.id === params.get("service"))
      ? (params.get("service") as string)
      : null
  );
  const [barber, setBarber] = useState<BarberId>("no-preference");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [myBookings, setMyBookings] = useState<Booking[]>(() => listBookings());
  const listRef = useRef<HTMLDivElement>(null);

  const days = useMemo(() => nextDays(14), []);
  const service = SERVICES.find((s) => s.id === serviceId) ?? null;

  const refresh = () => setMyBookings(listBookings());

  const submit = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[+()\-.\s\d]{7,17}$/.test(form.phone.trim()))
      e.phone = "Enter a phone number the shop can reach you on.";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      e.email = "That email doesn't look right — or leave it blank.";
    setErrors(e);
    if (Object.keys(e).length || !service || !date || !time) return;

    const booking: Booking = {
      ref: makeRef(),
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      barber,
      date,
      time,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      notes: form.notes.trim() || undefined,
      createdAt: Date.now(),
    };
    try {
      saveBooking(booking);
    } catch {
      setErrors({
        save:
          "We couldn't save this booking on your device (storage is blocked). Use Booksy instead, or call the shop.",
      });
      return;
    }
    refresh();
    setConfirmed(booking);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const cancel = (ref: string) => {
    removeBooking(ref);
    refresh();
  };

  const reset = () => {
    setConfirmed(null);
    setStep(1);
    setServiceId(null);
    setBarber("no-preference");
    setDate(null);
    setTime(null);
    setForm({ name: "", phone: "", email: "", notes: "" });
    setErrors({});
  };

  return (
    <main className="pt-28 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-8 pb-12 md:pb-16">
          <Reveal>
            <Link
              to="/"
              className="link-under inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ash transition-colors hover:text-gold"
            >
              <IconArrowRight className="h-4 w-4 rotate-180" />
              Back to Dynasty Barbers
            </Link>
            <Eyebrow className="mt-8">
              <Tri className="mr-2 inline-block h-2.5 w-3 text-gold" />
              Book a Chair
            </Eyebrow>
            <h1 className="h-display mt-4 text-6xl leading-[0.9] md:text-8xl">
              Reserve your cut<span className="text-gold">.</span>
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-ash">
              Pick your service, a day and a time, and you'll get a booking
              reference. The shop confirms your slot by call or text on the
              number you give. Prefer instant online scheduling? Booksy is
              right there too.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 pb-24 lg:grid-cols-12">
          {/* ============ main column ============ */}
          <div className="lg:col-span-8">
            {confirmed ? (
              <Confirmed booking={confirmed} onReset={reset} />
            ) : (
              <div className="border border-line bg-coal p-6 md:p-10">
                {/* progress */}
                <ol className="flex items-center gap-2 md:gap-4" aria-label="Booking progress">
                  {STEPS.map((s, i) => (
                    <li key={s.n} className="flex items-center gap-2 md:gap-4">
                      <button
                        onClick={() => s.n < step && setStep(s.n)}
                        disabled={s.n > step}
                        className={cn(
                          "flex items-center gap-2.5",
                          s.n < step && "cursor-pointer",
                          s.n > step && "cursor-default"
                        )}
                        aria-current={s.n === step ? "step" : undefined}
                      >
                        <span
                          className={cn(
                            "h-display flex h-9 w-9 items-center justify-center border text-lg",
                            s.n === step
                              ? "border-gold bg-gold text-ink"
                              : s.n < step
                                ? "border-gold/50 text-gold"
                                : "border-line text-ash"
                          )}
                        >
                          {s.n}
                        </span>
                        <span
                          className={cn(
                            "hidden text-[11px] font-bold uppercase tracking-[0.2em] sm:block",
                            s.n === step ? "text-bone" : "text-ash"
                          )}
                        >
                          {s.label}
                        </span>
                      </button>
                      {i < STEPS.length - 1 && (
                        <span
                          aria-hidden
                          className={cn(
                            "h-px w-5 md:w-10",
                            s.n < step ? "bg-gold/60" : "bg-line"
                          )}
                        />
                      )}
                    </li>
                  ))}
                </ol>

                {/* STEP 1 — service */}
                {step === 1 && (
                  <div className="fade-swap mt-10">
                    <h2 className="h-display text-4xl md:text-5xl">
                      What are we cutting<span className="text-gold">?</span>
                    </h2>
                    <div className="mt-8 border-t border-line" role="radiogroup" aria-label="Choose a service">
                      {SERVICES.map((s) => {
                        const selected = s.id === serviceId;
                        return (
                          <button
                            key={s.id}
                            role="radio"
                            aria-checked={selected}
                            onClick={() => setServiceId(s.id)}
                            className={cn(
                              "flex w-full cursor-pointer items-baseline gap-4 border-b border-line px-2 py-5 text-left transition-colors md:px-4",
                              selected ? "bg-smoke" : "hover:bg-smoke/50"
                            )}
                          >
                            <Tri
                              className={cn(
                                "h-2.5 w-3 shrink-0 self-center transition-opacity",
                                selected ? "text-gold opacity-100" : "opacity-0"
                              )}
                            />
                            <span className="flex-1">
                              <span className="flex flex-wrap items-center gap-3 text-base font-semibold md:text-lg">
                                {s.name}
                                {s.flag && (
                                  <span className="border border-gold/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
                                    {s.flag}
                                  </span>
                                )}
                              </span>
                              <span className="mt-1 block text-sm text-ash">{s.note}</span>
                            </span>
                            <span className={cn("h-display text-2xl md:text-3xl", selected ? "text-gold" : "text-ash")}>
                              {s.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <p className="eyebrow mt-9">Barber preference</p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {BARBERS.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setBarber(b.id)}
                          aria-pressed={barber === b.id}
                          className={cn(
                            "cursor-pointer border px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors",
                            barber === b.id
                              ? "border-gold bg-gold text-ink"
                              : "border-line text-bone hover:border-gold hover:text-gold"
                          )}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-ash/80">
                      "First available" books you with whoever the shop seats you with.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-xs text-ash/80">
                        Starting rates — your barber confirms the final price when
                        the slot is confirmed.
                      </p>
                      <button
                        onClick={() => {
                          setErrors({});
                          if (service) setStep(2);
                        }}
                        disabled={!service}
                        className={cn("btn-gold", !service && "cursor-not-allowed opacity-40")}
                      >
                        Pick a Time
                        <IconArrowRight className="arr h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2 — date & time */}
                {step === 2 && (
                  <div className="fade-swap mt-10">
                    <h2 className="h-display text-4xl md:text-5xl">
                      When works for you<span className="text-gold">?</span>
                    </h2>
                    <p className="mt-3 text-sm text-ash">
                      The next two weeks. Times are first-come requests — the
                      shop confirms each one.
                    </p>

                    <p className="eyebrow mt-9">Day</p>
                    <div className="no-scrollbar -mx-5 mt-4 flex gap-2.5 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:grid-cols-7 md:px-0">
                      {days.map((d) => {
                        const selected = d.iso === date;
                        return (
                          <button
                            key={d.iso}
                            onClick={() => setDate(d.iso)}
                            aria-pressed={selected}
                            className={cn(
                              "flex min-w-[64px] shrink-0 cursor-pointer flex-col items-center border px-3 py-3.5 transition-colors md:min-w-0",
                              selected
                                ? "border-gold bg-gold text-ink"
                                : "border-line text-bone hover:border-gold"
                            )}
                          >
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                              {d.dow}
                            </span>
                            <span className={cn("h-display mt-1 text-3xl", selected ? "text-ink" : "text-bone")}>
                              {d.num}
                            </span>
                            <span
                              className={cn(
                                "text-[10px] font-bold uppercase tracking-[0.2em]",
                                selected ? "text-ink/70" : "text-ash"
                              )}
                            >
                              {d.mon}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <p className="eyebrow mt-9">Time</p>
                    <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                      {SLOTS.map((t) => {
                        const selected = t === time;
                        return (
                          <button
                            key={t}
                            onClick={() => setTime(t)}
                            aria-pressed={selected}
                            className={cn(
                              "cursor-pointer border px-3 py-3 text-sm font-semibold transition-colors",
                              selected
                                ? "border-gold bg-gold text-ink"
                                : "border-line text-bone hover:border-gold hover:text-gold"
                            )}
                          >
                            {fmtTime(t)}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                      <button onClick={() => setStep(1)} className="btn-line">
                        <IconArrowRight className="h-4 w-4 rotate-180" />
                        Back
                      </button>
                      <button
                        onClick={() => {
                          setErrors({});
                          if (date && time) setStep(3);
                        }}
                        disabled={!date || !time}
                        className={cn("btn-gold", (!date || !time) && "cursor-not-allowed opacity-40")}
                      >
                        Your Details
                        <IconArrowRight className="arr h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 — details */}
                {step === 3 && service && date && time && (
                  <div className="fade-swap mt-10">
                    <h2 className="h-display text-4xl md:text-5xl">
                      Who's in the chair<span className="text-gold">?</span>
                    </h2>
                    <div className="mt-6 border border-line bg-ink px-5 py-4 text-sm text-ash">
                      <span className="font-semibold text-bone">{service.name}</span>
                      {" · "}
                      {fmtDay(date)} · {fmtTime(time)} · {barberLabel(barber)}
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="bk-name" className="eyebrow">
                          Full name *
                        </label>
                        <input
                          id="bk-name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={cn(inputCls, "mt-3", errors.name && "border-clay")}
                          placeholder="Your name"
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <p role="alert" className="mt-1.5 text-xs text-[#e59a7c]">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="bk-phone" className="eyebrow">
                          Phone *
                        </label>
                        <input
                          id="bk-phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className={cn(inputCls, "mt-3", errors.phone && "border-clay")}
                          placeholder="(954) 555-0100"
                          aria-invalid={!!errors.phone}
                        />
                        {errors.phone && (
                          <p role="alert" className="mt-1.5 text-xs text-[#e59a7c]">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="bk-email" className="eyebrow">
                          Email (optional)
                        </label>
                        <input
                          id="bk-email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={cn(inputCls, "mt-3", errors.email && "border-clay")}
                          placeholder="you@example.com"
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p role="alert" className="mt-1.5 text-xs text-[#e59a7c]">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="bk-notes" className="eyebrow">
                          Notes (optional)
                        </label>
                        <input
                          id="bk-notes"
                          type="text"
                          value={form.notes}
                          onChange={(e) => setForm({ ...form, notes: e.target.value })}
                          className={cn(inputCls, "mt-3")}
                          placeholder="Style, reference photo, first visit…"
                        />
                      </div>
                    </div>

                    {errors.save && (
                      <p
                        role="alert"
                        className="mt-6 border border-clay/60 bg-ink px-4 py-3 text-sm text-[#e59a7c]"
                      >
                        {errors.save}
                      </p>
                    )}

                    <p className="mt-8 text-xs leading-relaxed text-ash/80">
                      Submitting creates a booking request held on this device
                      with a reference code. The shop confirms your slot on the
                      number you provide — no account, no card.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                      <button onClick={() => setStep(2)} className="btn-line">
                        <IconArrowRight className="h-4 w-4 rotate-180" />
                        Back
                      </button>
                      <button onClick={submit} className="btn-gold">
                        Confirm Booking
                        <IconArrowRight className="arr h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============ my bookings ============ */}
            <div ref={listRef} className="mt-14" id="my-bookings">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <h2 className="h-display text-3xl md:text-4xl">
                  Your bookings<span className="text-gold">.</span>
                </h2>
                <span className="text-xs uppercase tracking-[0.2em] text-ash">
                  Stored on this device
                </span>
              </div>
              {myBookings.length === 0 ? (
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-ash">
                  No bookings saved on this device yet. Once you confirm a
                  request, it shows up here with its reference code, calendar
                  export and a way to reach the shop.
                </p>
              ) : (
                <ul className="mt-2">
                  {myBookings.map((b) => (
                    <li
                      key={b.ref}
                      className="flex flex-col gap-4 border-b border-line py-5 md:flex-row md:items-center"
                    >
                      <span className="h-display shrink-0 text-2xl tracking-[0.05em] text-gold">
                        {b.ref}
                      </span>
                      <span className="flex-1 text-sm leading-relaxed text-ash">
                        <span className="font-semibold text-bone">{b.serviceName}</span>
                        {" · "}
                        {fmtDay(b.date)} · {fmtTime(b.time)} · {barberLabel(b.barber)}
                        <span className="mt-0.5 block text-xs text-ash/70">
                          {b.name} · {b.phone}
                          {b.notes ? ` · "${b.notes}"` : ""}
                        </span>
                      </span>
                      <span className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-bold uppercase tracking-[0.18em]">
                        <button
                          onClick={() => downloadICS(b)}
                          className="cursor-pointer text-gold link-under"
                        >
                          Calendar
                        </button>
                        <a href={smsHref(b)} className="text-gold link-under">
                          SMS Shop
                        </a>
                        <button
                          onClick={() => cancel(b.ref)}
                          className="cursor-pointer text-ash transition-colors hover:text-bone"
                          aria-label={`Cancel booking ${b.ref}`}
                        >
                          <IconX className="h-4 w-4" />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ============ aside ============ */}
          <aside className="lg:col-span-4">
            <div className="border border-line bg-coal p-7 md:p-8 lg:sticky lg:top-28">
              <p className="eyebrow text-gold">How booking works</p>
              <ol className="mt-5 space-y-5">
                {[
                  ["Pick your service, day & time", "You lock in a request and get a booking reference code."],
                  ["The shop confirms your slot", "A call or text on your number — your barber confirms the final price."],
                  ["Walk in sharp", "Bring your reference photo and quote your reference code."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="h-display text-2xl leading-none text-gold/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-bone">{t}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-ash">{d}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border-t border-line pt-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ash">
                  Prefer instant online confirmation?
                </p>
                <a
                  href={LINKS.booksy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-4 w-full"
                >
                  Book on Booksy
                  <IconArrowUpRight className="arr h-4 w-4" />
                </a>
              </div>

              <div className="mt-7 space-y-2.5 border-t border-line pt-6 text-sm text-ash">
                <a
                  href={LINKS.phone}
                  className="flex items-center gap-2.5 font-semibold text-bone transition-colors hover:text-gold"
                >
                  <IconPhone className="h-4 w-4 text-gold" />
                  {LINKS.phoneDisplay}
                </a>
                <a
                  href={LINKS.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-gold"
                >
                  <IconPin className="h-4 w-4 text-gold" />
                  {ADDRESS.street}, Davie, FL 33328
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Confirmation                                                       */
/* ------------------------------------------------------------------ */

function Confirmed({ booking, onReset }: { booking: Booking; onReset: () => void }) {
  return (
    <div className="fade-swap border border-gold/50 bg-coal">
      <div aria-hidden className="h-1 w-full bg-gold" />
      <div className="p-6 md:p-10">
        <p className="eyebrow flex items-center gap-3">
          <Tri className="h-2.5 w-3 text-gold" />
          Booking request created
        </p>
        <h2 className="h-display mt-4 text-5xl leading-[0.95] md:text-6xl">
          You're on the list<span className="text-gold">.</span>
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="h-display border border-gold/50 bg-ink px-6 py-3 text-4xl tracking-[0.08em] text-gold md:text-5xl">
            {booking.ref}
          </span>
          <span className="border border-gold/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            Awaiting shop confirmation
          </span>
        </div>

        <dl className="mt-9 border-t border-line">
          {[
            ["Service", `${booking.serviceName} — ${booking.price} (starting rate)`],
            ["Barber", barberLabel(booking.barber)],
            ["Day", fmtDay(booking.date)],
            ["Time", fmtTime(booking.time)],
            ["Name", booking.name],
            ["Phone", booking.phone],
            ...(booking.email ? ([["Email", booking.email]] as [string, string][]) : []),
            ...(booking.notes ? ([["Notes", booking.notes]] as [string, string][]) : []),
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex flex-col gap-1 border-b border-line py-3.5 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <dt className="shrink-0 text-[11px] font-bold uppercase tracking-[0.2em] text-ash sm:w-28">
                {k}
              </dt>
              <dd className="text-sm font-semibold text-bone">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 max-w-xl text-xs leading-relaxed text-ash">
          The shop confirms every booking on the number you gave. To make sure
          it's seen right away, text or call the shop your reference code — or
          complete the same booking on Booksy for instant confirmation.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button onClick={() => downloadICS(booking)} className="btn-gold">
            Add to Calendar (.ics)
          </button>
          <a
            href={googleCalUrl(booking)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line"
          >
            Google Calendar
            <IconArrowUpRight className="arr h-4 w-4" />
          </a>
          <a href={smsHref(booking)} className="btn-line">
            Text the Shop
          </a>
          <a href={LINKS.phone} className="btn-line">
            <IconPhone className="h-4 w-4" />
            Call {LINKS.phoneDisplay}
          </a>
          <a
            href={LINKS.booksy}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line sm:col-span-2"
          >
            Complete Instantly on Booksy
            <IconArrowUpRight className="arr h-4 w-4" />
          </a>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
          <button
            onClick={() => document.getElementById("my-bookings")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="link-under text-sm font-bold uppercase tracking-[0.16em] text-gold"
          >
            View Your Bookings
          </button>
          <button onClick={onReset} className="btn-line">
            Book Another Cut
            <IconArrowRight className="arr h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
