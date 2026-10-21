import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes } from "react";

export const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Section({ id, children, tone = "white", className = "" }: { id?: string; children: ReactNode; tone?: "white" | "mist" | "ink"; className?: string }) {
  const bg = tone === "mist" ? "bg-mist" : tone === "ink" ? "bg-ink text-white" : "bg-white";
  return (
    <section id={id} className={`${bg} px-5 py-16 md:px-10 md:py-24 ${className}`}>
      <div className="mx-auto max-w-[1200px]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-turq">{children}</p>;
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-3xl font-semibold leading-tight tracking-tight md:text-[40px] ${className}`}>{children}</h2>;
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`max-w-[620px] text-base leading-relaxed text-mute md:text-lg ${className}`}>{children}</p>;
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "light"; href?: string };
export function Button({ variant = "primary", href, className = "", children, ...rest }: BtnProps) {
  const base = "inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-[15px] font-semibold transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none";
  const v = {
    primary: "bg-blue text-white shadow-[0_8px_24px_-8px_rgba(0,119,182,0.6)] hover:bg-blue-deep",
    ghost: "border border-line bg-white text-ink hover:border-blue hover:text-blue",
    light: "bg-white text-ink hover:bg-mist",
  }[variant];
  const cls = `${base} ${v} ${className}`;
  return href ? <a href={href} className={cls}>{children}</a> : <button className={cls} {...rest}>{children}</button>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-white p-6 shadow-[0_10px_30px_-18px_rgba(11,42,56,0.25)] ${className}`}>{children}</div>;
}

export function Badge({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "turq" | "ok" | "warn" | "mute" }) {
  const c = {
    blue: "bg-blue/10 text-blue",
    turq: "bg-turq/10 text-[#0b8a84]",
    ok: "bg-ok/10 text-ok",
    warn: "bg-warn/10 text-warn",
    mute: "bg-ink/5 text-mute",
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${c}`}>{children}</span>;
}

/** Honesty label for any figure that is not a supplied real number. */
export function Illustrative({ ar, en }: { ar?: string; en?: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-dashed border-warn/50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-warn">
      {ar ?? en ?? "ILLUSTRATIVE · NOT ACTUALS"}
    </span>
  );
}

export function Stat({ label, value, delta, tone = "ok" }: { label: string; value: string; delta?: string; tone?: "ok" | "warn" }) {
  return (
    <div className="rounded-xl bg-mist p-4">
      <p className="text-xs text-mute">{label}</p>
      <p className="num mt-1 text-2xl font-semibold">{value}</p>
      {delta && <p className={`num mt-1 text-xs font-medium ${tone === "ok" ? "text-ok" : "text-warn"}`}>{delta}</p>}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-mute">{label}</span>
      {children}
    </label>
  );
}
export const inputCls = "h-12 w-full rounded-xl border border-line bg-white px-3.5 text-[15px] outline-none transition-colors focus:border-blue";

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const p: Record<string, ReactNode> = {
    bus: <><rect x="4" y="3" width="16" height="14" rx="3" /><path d="M4 11h16M8 21v-4M16 21v-4" /><circle cx="8.5" cy="14" r=".6" fill="currentColor" /><circle cx="15.5" cy="14" r=".6" fill="currentColor" /></>,
    ticket: <><path d="M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3z" /><path d="M14 6v12" strokeDasharray="2 2.5" /></>,
    wallet: <><rect x="3" y="6" width="18" height="14" rx="3" /><path d="M3 10h18M16 15h2" /></>,
    pin: <><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
    route: <><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5" /></>,
    fleet: <><rect x="2" y="8" width="13" height="8" rx="2" /><path d="M15 11h3.5L21 14v2h-6" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></>,
    driver: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    building: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4" /></>,
    school: <><path d="m2 9 10-5 10 5-10 5z" /><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
    shield: <><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" /><path d="m9 12 2 2 4-4" /></>,
    chart: <><path d="M4 20V4M4 20h16" /><path d="m7 15 4-4 3 3 5-6" /></>,
    check: <path d="m5 12 5 5 9-10" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    swap: <path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    qr: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><path d="M14 14h2v2h-2zM18 14h2v2M14 18h2M18 18h2v2h-2z" /></>,
    star: <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z" />,
    bolt: <path d="M13 3 5 13h6l-1 8 8-10h-6z" />,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.2a6.5 6.5 0 0 1 3.5 5.8" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {p[name] ?? p.bus}
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-ink">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#2dd4c4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18 8 7l4.5 8 2.5-4L21 18" /></svg>
      </span>
      <span className={`whitespace-nowrap text-lg font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        {/* wordmark is bilingual by design */}
        مواصلاتي <span className="font-medium opacity-60 max-sm:hidden">· Mowasalti</span>
      </span>
    </span>
  );
}
