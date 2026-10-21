"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useLang } from "../lib/lang";

/* Accent used for the hover states. The template's green is swapped for the Mowasalti turquoise. */
const ACCENT = "#12b5ad";

const cardHoverVariants: Variants = { hover: { y: -4, transition: { duration: 0.2 } } };
const stepBadgeVariants: Variants = { hover: { backgroundColor: ACCENT, color: "#fff" } };
const borderVariants: Variants = {
  hover: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
};

export interface HowItWorksVideos { left?: string; right?: string; center?: string }

/* Object illustrations stand in for the template's 3D videos. Pass `videos` to use real clips. */
const Glyph = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 120 120" className="h-full w-full" fill="none" aria-hidden="true">{children}</svg>
);
const BusObj = () => (
  <Glyph>
    <ellipse cx="60" cy="104" rx="32" ry="6" fill="#0b2a38" opacity=".08" />
    <rect x="22" y="26" width="76" height="62" rx="14" fill="#0077b6" />
    <rect x="30" y="36" width="60" height="26" rx="6" fill="#d9f2f6" />
    <path d="M60 36v26" stroke="#0077b6" strokeWidth="3" />
    <rect x="22" y="68" width="76" height="6" fill="#005f94" />
    <circle cx="38" cy="82" r="5" fill="#fff" /><circle cx="82" cy="82" r="5" fill="#fff" />
    <rect x="34" y="88" width="14" height="10" rx="4" fill="#0b2a38" /><rect x="72" y="88" width="14" height="10" rx="4" fill="#0b2a38" />
  </Glyph>
);
const TicketObj = () => (
  <Glyph>
    <ellipse cx="60" cy="106" rx="30" ry="5" fill="#0b2a38" opacity=".08" />
    <path d="M24 34h72a0 0 0 0 1 0 0v14a8 8 0 0 0 0 16v22H24V64a8 8 0 0 0 0-16z" fill="#12b5ad" transform="rotate(-6 60 64)" />
    <path d="M78 36v56" stroke="#fff" strokeWidth="2.5" strokeDasharray="4 5" transform="rotate(-6 60 64)" />
    <rect x="34" y="52" width="30" height="5" rx="2.5" fill="#fff" transform="rotate(-6 60 64)" />
    <rect x="34" y="64" width="20" height="5" rx="2.5" fill="#fff" opacity=".7" transform="rotate(-6 60 64)" />
  </Glyph>
);
const WalletObj = () => (
  <Glyph>
    <ellipse cx="60" cy="104" rx="30" ry="5" fill="#0b2a38" opacity=".08" />
    <rect x="22" y="34" width="76" height="58" rx="14" fill="#123251" />
    <rect x="22" y="34" width="76" height="20" rx="10" fill="#0096c7" />
    <rect x="66" y="58" width="32" height="20" rx="10" fill="#2dd4c4" />
    <circle cx="78" cy="68" r="4" fill="#fff" />
  </Glyph>
);

function Fan({ src, children, className, initial, settle, delay }: {
  src?: string; children: ReactNode; className: string;
  initial: { x: number; rotate: number }; settle: number; delay: number;
}) {
  return (
    <motion.div
      className={`absolute h-[180px] w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-[32px] border border-white bg-gradient-to-br from-[#fdfdfd] to-[#f2f2f2] flex ${className}`}
      initial={{ opacity: 0, y: 20, ...initial }}
      whileInView={{ opacity: 1, y: settle, ...initial }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      whileHover={{ rotate: 90, scale: 1.05 }}
    >
      {src ? <video src={src} autoPlay loop muted playsInline className="h-full w-full object-cover" /> : <div className="h-[78%] w-[78%]">{children}</div>}
    </motion.div>
  );
}

export default function HowItWorks04Kelo({ videos = {} }: { videos?: HowItWorksVideos }) {
  const { t, n } = useLang();
  const steps = [
    { n: 1, title: t("اختر مسارك", "Pick your route"), body: t("ابحث بالمدينة والتاريخ وعدد الركاب، وقارن المشغّلين والمواعيد والأسعار.", "Search by city, date and passengers. Compare operators, times and fares.") },
    { n: 2, title: t("احجز مقعدك وادفع", "Choose a seat and pay"), body: t("حدّد مقعدك على خريطة المركبة وادفع من المحفظة أو البطاقة أو نقود الهاتف.", "Pick your seat on the vehicle map and pay from the wallet, a card or mobile money.") },
    { n: 3, title: t("اصعد برمز التذكرة", "Board with your code"), body: t("أظهر الرمز عند الصعود، وتابع الرحلة مباشرة حتى الوصول.", "Show the code at the door, then follow the trip live until you arrive.") },
  ];

  return (
    <section className="w-full overflow-hidden bg-white px-5 py-[140px] md:px-20" style={{ fontFamily: "'Inter', 'IBM Plex Sans Arabic', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" crossOrigin="anonymous" />

      <div className="mx-auto max-w-[1200px]">
        {/* Row 1: fanned object cards (stacking: right z1, left z2, center z3) */}
        <div className="relative mb-12 flex h-[240px] items-center justify-center">
          <Fan src={videos.left} className="z-[2] shadow-[0_10px_30px_rgba(0,0,0,0.06)]" initial={{ x: -110, rotate: -15 }} settle={25} delay={0.1}><BusObj /></Fan>
          <Fan src={videos.right} className="z-[1] shadow-[0_10px_30px_rgba(0,0,0,0.06)]" initial={{ x: 110, rotate: 12 }} settle={15} delay={0.3}><WalletObj /></Fan>
          <Fan src={videos.center} className="z-[3] shadow-[0_15px_40px_rgba(0,0,0,0.08)]" initial={{ x: 0, rotate: 0 }} settle={-10} delay={0.2}><TicketObj /></Fan>
        </div>

        {/* Row 2: heading */}
        <motion.div className="mb-12 text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}>
          <h2 className="mb-3 text-[48px] font-semibold leading-[1.1] text-[#0d0d0d]">{t("كيف تعمل", "How it works")}</h2>
          <p className="mx-auto max-w-[380px] text-[15px] leading-[1.6] text-[#888]">
            {t("مواصلاتي تحوّل بحثك عن رحلة إلى مقعد وتذكرة وإيصال في خطوات قليلة.", "Mowasalti turns a route search into a seat, a ticket and a receipt in a few taps.")}
          </p>
        </motion.div>

        {/* Row 3: step cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="group relative flex min-h-[280px] cursor-pointer flex-col items-start rounded-[32px] bg-[#f7f7f7] p-10 transition-colors hover:bg-[#f2f2f2]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 + i * 0.1 }}
              whileHover="hover"
            >
              <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible" aria-hidden="true">
                <motion.rect x="0" y="0" width="100%" height="100%" rx="32" fill="none" stroke={ACCENT} strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }} variants={borderVariants} />
              </svg>
              <motion.div variants={cardHoverVariants} className="flex flex-col items-start">
                <motion.div variants={stepBadgeVariants}
                  className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#ebebeb] text-[13px] font-semibold text-[#555] transition-colors duration-300">
                  {n(s.n).padStart(2, n(0))}
                </motion.div>
                <h3 className="mb-4 text-[28px] font-bold leading-tight tracking-tight text-[#0d0d0d]">{s.title}</h3>
                <p className="max-w-[280px] text-[16px] leading-relaxed text-[#666]">{s.body}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
