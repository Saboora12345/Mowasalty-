import { useState } from "react";
import { Booking } from "../components/Booking";
import { Ecosystem } from "../components/Ecosystem";
import { FleetDashboard } from "../components/FleetDashboard";
import { Phone, SearchScreen, TicketScreen, TrackScreen, WalletScreen } from "../components/Phone";
import { RouteMap } from "../components/RouteMap";
import { Badge, Button, Card, Eyebrow, H2, Icon, Illustrative, Lead, Reveal, Section } from "../components/ui";
import HowItWorks04Kelo from "../components/HowItWorks04Kelo";
import { useLang } from "../lib/lang";
import { href } from "../lib/router";
import { FARE_TIERS } from "../lib/data";

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function Home() {
  const { t, n, money } = useLang();
  const [active, setActive] = useState<string | null>("r2");

  const services = [
    { i: "ticket", ar: "حجز التذاكر", en: "Bus ticketing", dar: "مقاعد على حافلات المدن والمسافات الطويلة.", den: "Seats on city and long-distance coaches." },
    { i: "pin", ar: "حجز المشاوير", en: "Ride booking", dar: "مشوار قصير عند الحاجة، بسعر معروف قبل الصعود.", den: "A short ride when you need it, priced before you board." },
    { i: "fleet", ar: "إدارة الأسطول", en: "Fleet management", dar: "تتبّع وصيانة وتشغيل من لوحة واحدة.", den: "Tracking, maintenance and dispatch from one dashboard." },
    { i: "driver", ar: "إدارة السائقين", en: "Driver management", dar: "جداول ووثائق وأرباح بلا أوراق.", den: "Schedules, documents and earnings without paperwork." },
    { i: "building", ar: "تنقل الشركات", en: "Corporate transport", dar: "نقل موظفين بعقود شهرية وفاتورة واحدة.", den: "Staff transport on monthly contracts, one invoice." },
    { i: "school", ar: "النقل المدرسي", en: "School transport", dar: "خطوط مدرسية وإشعارات للأهل.", den: "School lines with parent notifications." },
    { i: "globe", ar: "مسارات عبر الحدود", en: "Cross-border routes", dar: "السودان ومصر والخليج بتذكرة واحدة.", den: "Sudan, Egypt and the Gulf on one ticket." },
    { i: "wallet", ar: "المحفظة والدفع", en: "Wallet and payments", dar: "بطاقات ونقود هاتف ومحفظة مدمجة.", den: "Cards, mobile money and a built-in wallet." },
  ];
  const partners = [
    t("بنك شريك", "Bank partner"), t("مزوّد دفع", "Payment provider"), t("مشغّل اتصالات", "Telecom operator"), t("جهة تأمين", "Insurer"),
    t("مشغّل حافلات", "Coach operator"), t("منصة خرائط", "Maps provider"),
  ];
  const quotes = [
    { ar: "كنت أقف ساعة في المحطة لأعرف إن كان في مقعد. الآن أرى المقاعد قبل أن أخرج من البيت.", en: "I used to stand at the station for an hour to learn whether a seat existed. Now I see the seats before I leave home.", who: t("راكب · مثال", "Passenger · sample") },
    { ar: "وصلتنا حجوزات من مدن لم نكن نصلها. والتسوية آخر اليوم بدل نهاية الأسبوع.", en: "Bookings arrived from cities we never reached. And settlement lands at day's end, not week's end.", who: t("مشغّل حافلات · مثال", "Coach operator · sample") },
    { ar: "فاتورة واحدة لثلاثة خطوط موظفين. كان عندنا ثلاثة مقاولين وثلاث فواتير.", en: "One invoice for three staff lines. We had three contractors and three invoices.", who: t("مدير إدارة · مثال", "Admin manager · sample") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink px-5 pb-20 pt-14 text-white md:px-10 md:pb-28 md:pt-20">
        <div aria-hidden className="pointer-events-none absolute -top-32 end-[-8%] h-[520px] w-[520px] rounded-full bg-turq/25 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 start-[-8%] h-[460px] w-[460px] rounded-full bg-blue/45 blur-[120px]" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-turq-soft">{t("التنقل كخدمة · السودان · مصر · السعودية · الخليج", "Mobility as a Service · Sudan · Egypt · Saudi Arabia · GCC")}</p>
            <h1 className="text-[40px] font-semibold leading-[1.12] tracking-tight md:text-[60px]">{t("رحلتك كلها في منصة واحدة", "Every journey, on one platform")}</h1>
            <p className="mt-5 max-w-[540px] text-base leading-relaxed text-white/72 md:text-lg">
              {t("احجز مقعدك بين الخرطوم وبورتسودان، أو القاهرة والرياض. ادفع من محفظتك وتابع الحافلة حتى تصل. وإن كنت مشغّلاً، فمساراتك وأسطولك وسائقوك في لوحة واحدة.", "Book a seat from Khartoum to Port Sudan, or Cairo to Riyadh. Pay from your wallet and follow the bus until you arrive. Run a fleet? Your routes, vehicles and drivers sit in one dashboard.")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => go("booking")} className="bg-turq shadow-none hover:bg-[#0fa099]">{t("ابحث عن رحلة", "Search routes")}</Button>
              <Button href={href("operators")} variant="light" className="bg-white/10 text-white hover:bg-white/20">{t("انضم كمشغّل", "Become an operator")}</Button>
            </div>
            <dl className="mt-10 grid max-w-[520px] grid-cols-3 gap-4 border-t border-white/12 pt-6">
              {[[n(4), t("أسواق مستهدفة", "target markets")], [n(3), t("فئات أجرة حضرية", "urban fare tiers")], [n(2), t("لغتان، العربية أولاً", "languages, Arabic first")]].map(([v, l]) => (
                <div key={l}><dt className="num text-2xl font-semibold text-turq-soft">{v}</dt><dd className="text-xs text-white/60">{l}</dd></div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="rounded-3xl bg-white/[0.06] p-3 ring-1 ring-white/12 backdrop-blur"><RouteMap active={active} onSelect={setActive} /></div>
            <div className="absolute -bottom-6 start-4 w-[230px] rounded-2xl bg-white p-4 text-ink shadow-2xl">
              <p className="text-xs text-mute">{t("الرحلة القادمة", "Next departure")}</p>
              <p className="mt-0.5 font-semibold">{t("الخرطوم ← ود مدني", "Khartoum → Wad Madani")}</p>
              <p className="num mt-1 text-sm text-blue">{money(8000, "SDG")} · {t("٣ س", "3 h")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section>
        <Reveal><Eyebrow>{t("ما نقدّمه", "What we run")}</Eyebrow><H2>{t("سوق رقمي للتنقل، من التذكرة إلى الأسطول", "A digital mobility marketplace, from ticket to fleet")}</H2></Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.en} delay={i * 0.04}>
              <Card className="h-full transition-transform duration-200 hover:-translate-y-1">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue/10 text-blue"><Icon name={s.i} /></span>
                <h3 className="mt-4 font-semibold">{t(s.ar, s.en)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{t(s.dar, s.den)}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Search + live booking */}
      <Section id="booking" tone="mist">
        <Reveal><Eyebrow>{t("محرك البحث والحجز المباشر", "Route search and live booking")}</Eyebrow><H2>{t("ابحث، اختر مقعدك، واحصل على تذكرتك", "Search, pick your seat, get your ticket")}</H2>
          <Lead className="mt-3">{t("جرّب الرحلة كاملة: من اختيار المسار إلى رمز التذكرة. الدفع هنا محاكاة ولا يُخصم منه شيء.", "Try the whole trip, from route to ticket code. Payment here is simulated; nothing is charged.")}</Lead></Reveal>
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Booking active={active} onActive={setActive} compact />
          <div className="lg:sticky lg:top-24"><RouteMap active={active} onSelect={setActive} className="rounded-2xl shadow-[0_24px_60px_-28px_rgba(11,42,56,0.35)]" /></div>
        </div>
      </Section>

      {/* Fleet analytics */}
      <Section>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <Reveal><Eyebrow>{t("للمشغّلين", "For operators")}</Eyebrow><H2>{t("لوحة تحليلات الأسطول", "Fleet analytics dashboard")}</H2></Reveal>
          <Button href={href("fleet")} variant="ghost">{t("حلول الأسطول", "Fleet solutions")}</Button>
        </div>
        <Reveal><FleetDashboard compact /></Reveal>
      </Section>

      {/* Mobile app */}
      <Section tone="mist">
        <Reveal><Eyebrow>{t("تطبيق الراكب", "Passenger app")}</Eyebrow><H2>{t("كل ما تحتاجه في الجيب", "Everything you need, in your pocket")}</H2>
          <Lead className="mt-3">{t("بحث وحجز ومحفظة وتتبّع مباشر. وتصميم يعمل بالعربية من اليمين إلى اليسار أولاً.", "Search, booking, wallet and live tracking. Designed right-to-left first, then mirrored.")}</Lead></Reveal>
        <div className="-mx-5 mt-10 flex gap-6 overflow-x-auto px-5 pb-6 md:mx-0 md:justify-center md:overflow-visible md:px-0">
          <Phone title={t("البحث", "Search")}><SearchScreen /></Phone>
          <Phone title={t("التذكرة", "Ticket")}><TicketScreen /></Phone>
          <Phone title={t("المحفظة", "Wallet")}><WalletScreen /></Phone>
          <Phone title={t("التتبّع", "Tracking")}><TrackScreen /></Phone>
        </div>
      </Section>

      {/* Ecosystem */}
      <Section>
        <Reveal><Eyebrow>{t("منظومة التنقل", "The MaaS ecosystem")}</Eyebrow><H2>{t("ثمانية أطراف، منصة واحدة", "Eight parties, one platform")}</H2>
          <Lead className="mt-3">{t("اضغط على أي طرف لترى دوره.", "Tap any party to see its role.")}</Lead></Reveal>
        <div className="mt-8"><Ecosystem /></div>
      </Section>

      {/* Investor */}
      <Section tone="ink">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-turq-soft">{t("فرصة استثمارية", "Investor opportunity")}</p>
            <H2>{t("بنية تنقل رقمية لأسواق ما زال أغلب حجزها على الورق والهاتف", "Digital mobility infrastructure for markets that still book on paper and phone calls")}</H2>
            <p className="mt-4 max-w-[540px] leading-relaxed text-white/70">{t("نبدأ من السودان حيث الحاجة أشد، ثم مصر والسعودية والخليج عبر مسارات الحدود. الإيراد من عمولة التذاكر واشتراكات الأسطول وعقود الشركات ورسوم الدفع.", "We start in Sudan, where the need is sharpest, then follow cross-border routes into Egypt, Saudi Arabia and the Gulf. Revenue comes from ticket commission, fleet subscriptions, corporate contracts and payment fees.")}</p>
            <Button href={href("investors")} variant="light" className="mt-7">{t("صفحة المستثمرين", "Investor relations")}</Button>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {[["ticket", t("عمولة التذاكر", "Ticket commission")], ["fleet", t("اشتراكات الأسطول", "Fleet subscriptions")], ["building", t("عقود الشركات", "Corporate contracts")], ["wallet", t("رسوم الدفع والمحفظة", "Payment and wallet fees")]].map(([i, l]) => (
                <div key={l} className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/12"><Icon name={i} className="h-6 w-6 text-turq-soft" /><p className="mt-3 text-sm font-medium">{l}</p></div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Partners */}
      <Section>
        <Reveal><p className="text-center text-sm text-mute">{t("فئات الشركاء الذين نبني معهم", "The partner categories we are building with")} <Illustrative ar="أماكن شعارات" en="LOGO SLOTS" /></p></Reveal>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-6">
          {partners.map((p) => <li key={p} className="grid h-20 place-items-center rounded-xl border border-dashed border-line px-2 text-center text-sm font-medium text-mute">{p}</li>)}
        </ul>
      </Section>

      {/* Testimonials */}
      <Section tone="mist">
        <Reveal><Eyebrow>{t("آراء", "Testimonials")}</Eyebrow><div className="flex flex-wrap items-center gap-3"><H2>{t("ما نريد أن يقوله المستخدمون", "What we are building toward")}</H2><Illustrative ar="نماذج · ليست آراء حقيقية" en="SAMPLE QUOTES · NOT REAL REVIEWS" /></div></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={i} delay={i * 0.08}><Card className="h-full"><Icon name="star" className="h-5 w-5 text-warn" /><p className="mt-3 leading-relaxed">{t(q.ar, q.en)}</p><p className="mt-4 text-sm text-mute">{q.who}</p></Card></Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-br from-blue to-turq p-8 text-white md:p-14">
            <h2 className="max-w-[640px] text-3xl font-semibold leading-tight md:text-5xl">{t("جاهز لأول رحلة؟", "Ready for the first trip?")}</h2>
            <p className="mt-3 max-w-[520px] text-white/85">{t(`أجرة المدينة تبدأ من ${money(FARE_TIERS[0], "SDG")}. ابدأ بحجز مقعد، أو سجّل أسطولك.`, `City fares start at ${money(FARE_TIERS[0], "SDG")}. Book a seat, or register your fleet.`)}</p>
            <div className="mt-7 flex flex-wrap gap-3"><Button onClick={() => go("booking")} variant="light">{t("احجز الآن", "Book now")}</Button><Button href={href("contact")} variant="light" className="bg-white/15 text-white hover:bg-white/25">{t("تحدّث إلينا", "Talk to us")}</Button></div>
          </div>
        </Reveal>
      </Section>

      <HowItWorks04Kelo />
    </>
  );
}
