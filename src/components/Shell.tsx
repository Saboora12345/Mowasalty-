import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { href, type Page } from "../lib/router";
import { useLang } from "../lib/lang";
import { Button, Icon, Logo } from "./ui";

export const NAV: { id: Page; ar: string; en: string; dar: string; den: string }[] = [
  { id: "home", ar: "الرئيسية", en: "Home", dar: "نظرة على المنصة", den: "The platform at a glance" },
  { id: "routes", ar: "سوق المسارات", en: "Routes Marketplace", dar: "ابحث واحجز", den: "Search and book" },
  { id: "operators", ar: "دليل المشغّلين", en: "Operators Directory", dar: "شركاء النقل", den: "Transport partners" },
  { id: "fleet", ar: "حلول الأسطول", en: "Fleet Solutions", dar: "تتبّع وتحليلات", den: "Tracking and analytics" },
  { id: "corporate", ar: "التنقل للشركات", en: "Corporate Mobility", dar: "موظفون ومدارس", den: "Staff and school transport" },
  { id: "driver", ar: "بوابة السائق", en: "Driver Portal", dar: "رحلاتك وأرباحك", den: "Your trips and earnings" },
  { id: "app", ar: "تطبيق الراكب", en: "Passenger App", dar: "التطبيق على هاتفك", den: "The app on your phone" },
  { id: "pricing", ar: "الأسعار", en: "Pricing", dar: "تعرفة واضحة", den: "Clear fares" },
  { id: "investors", ar: "المستثمرون", en: "Investor Relations", dar: "الفرصة والخطة", den: "The opportunity and plan" },
  { id: "contact", ar: "تواصل", en: "Contact", dar: "نسمعك", den: "Talk to us" },
];

export function Header({ page }: { page: Page }) {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const inline = NAV.filter((x) => ["routes", "operators", "fleet", "corporate", "pricing", "investors"].includes(x.id));
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-5 md:px-10">
        <a href={href("home")} aria-label="Mowasalti"><Logo /></a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label={t("التنقل الرئيسي", "Main")}>
          {inline.map((x) => (
            <a key={x.id} href={href(x.id)} aria-current={page === x.id ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${page === x.id ? "bg-mist text-blue" : "text-ink/75 hover:text-blue"}`}>{t(x.ar, x.en)}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="h-10 rounded-lg border border-line px-3 text-sm font-semibold transition-colors hover:border-blue hover:text-blue" aria-label="Language">
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <Button href={href("routes")} className="h-10 px-4 text-sm max-sm:hidden">{t("احجز رحلة", "Book a trip")}</Button>
          <button onClick={() => setOpen(true)} aria-label={t("القائمة", "Menu")} className="grid h-10 w-10 place-items-center rounded-lg border border-line hover:border-blue"><Icon name="menu" /></button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.aside onClick={(e) => e.stopPropagation()} initial={{ x: lang === "ar" ? "-100%" : "100%" }} animate={{ x: 0 }} exit={{ x: lang === "ar" ? "-100%" : "100%" }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 end-0 w-[min(380px,100%)] overflow-y-auto bg-white p-5">
              <div className="mb-4 flex items-center justify-between"><Logo /><button onClick={() => setOpen(false)} aria-label={t("إغلاق", "Close")} className="grid h-10 w-10 place-items-center rounded-lg border border-line"><Icon name="close" /></button></div>
              <ul>
                {NAV.map((x) => (
                  <li key={x.id}><a href={href(x.id)} onClick={() => setOpen(false)} className={`block rounded-xl px-3 py-3 transition-colors hover:bg-mist ${page === x.id ? "bg-mist" : ""}`}>
                    <span className="block font-semibold">{t(x.ar, x.en)}</span><span className="text-xs text-mute">{t(x.dar, x.den)}</span></a></li>
                ))}
              </ul>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-ink px-5 py-14 text-white md:px-10">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-[340px] text-sm leading-relaxed text-white/65">{t("منصة تنقل رقمية تجمع المسارات والمشغّلين والدفع في مكان واحد، من السودان إلى مصر والخليج.", "A digital mobility platform that puts routes, operators and payments in one place, from Sudan to Egypt and the Gulf.")}</p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-white/75 sm:grid-cols-3">
          {NAV.map((x) => <li key={x.id}><a href={href(x.id)} className="transition-colors hover:text-turq-soft">{t(x.ar, x.en)}</a></li>)}
          <li><a href={href("system")} className="transition-colors hover:text-turq-soft">{t("نظام التصميم", "Design system")}</a></li>
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-[1200px] border-t border-white/10 pt-6 text-xs text-white/45">
        © {new Date().getFullYear()} {t("مواصلاتي. الأرقام والمشغّلون والآراء المعروضة نماذج توضيحية إلى حين اعتماد البيانات الفعلية.", "Mowasalti. Figures, operators and quotes shown are illustrative until real data is supplied.")}
      </p>
    </footer>
  );
}

export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink px-5 pb-16 pt-14 text-white md:px-10 md:pb-24 md:pt-20">
      <div aria-hidden className="pointer-events-none absolute -top-40 end-[-10%] h-[480px] w-[480px] rounded-full bg-turq/25 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-52 start-[-10%] h-[420px] w-[420px] rounded-full bg-blue/40 blur-[110px]" />
      <div className="relative mx-auto max-w-[1200px]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-turq-soft">{eyebrow}</p>
        <h1 className="max-w-[760px] text-4xl font-semibold leading-[1.15] tracking-tight md:text-[56px]">{title}</h1>
        <p className="mt-5 max-w-[620px] text-base leading-relaxed text-white/70 md:text-lg">{lead}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
