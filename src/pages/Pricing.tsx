import { PageHero } from "../components/Shell";
import { Badge, Button, Card, Icon, Section } from "../components/ui";
import { FARE_TIERS } from "../lib/data";
import { href } from "../lib/router";
import { useLang } from "../lib/lang";

export default function Pricing() {
  const { t, money } = useLang();
  const tiers = [
    { f: FARE_TIERS[0], ar: "قصيرة", en: "Short", dar: "داخل المدينة وما حولها.", den: "Inside the city and its edge." },
    { f: FARE_TIERS[1], ar: "متوسطة", en: "Medium", dar: "بين مدن متجاورة.", den: "Between neighbouring cities." },
    { f: FARE_TIERS[2], ar: "طويلة", en: "Long", dar: "مسافات طويلة بين الولايات.", den: "Long hauls between states." },
  ];
  const plans = [
    { ar: "مشغّل ناشئ", en: "Starter", items: [["حتى عدد محدود من المركبات", "Up to a small fleet"], ["حجز ودفع إلكتروني", "Online booking and payment"], ["تقارير أساسية", "Basic reports"]] },
    { ar: "أسطول", en: "Fleet", items: [["تتبّع مباشر وتحليلات", "Live tracking and analytics"], ["إدارة السائقين والوثائق", "Driver and document management"], ["تسوية يومية", "Daily settlement"]], hot: true },
    { ar: "مؤسسات", en: "Enterprise", items: [["عقود شركات ومدارس", "Corporate and school contracts"], ["ربط API", "API integration"], ["مدير حساب مخصص", "Dedicated account manager"]] },
  ];
  return (
    <>
      <PageHero eyebrow={t("الأسعار", "Pricing")} title={t("أجرة واضحة قبل الصعود", "A fare you know before you board")} lead={t("للركاب ثلاث فئات أجرة. وللمشغّلين خطط تُحدَّد عند التعاقد.", "Passengers pay one of three fare tiers. Operators choose a plan, priced at contracting.")} />
      <Section>
        <h2 className="mb-6 text-2xl font-semibold">{t("أجرة الركاب (بالجنيه السوداني)", "Passenger fares (Sudanese pound)")}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((x, i) => <Card key={x.f} className={i === 1 ? "!border-blue ring-1 ring-blue/30" : ""}><Badge tone={i === 1 ? "blue" : "mute"}>{t(x.ar, x.en)}</Badge><p className="num mt-4 text-4xl font-semibold">{money(x.f, "SDG")}</p><p className="mt-2 text-sm text-mute">{t(x.dar, x.den)}</p></Card>)}
        </div>
        <p className="mt-4 text-sm text-mute">{t("مسارات مصر والسعودية والخليج بعملاتها المحلية، وتظهر في سوق المسارات.", "Egypt, Saudi and Gulf routes are priced in local currency and listed in the routes marketplace.")}</p>
      </Section>
      <Section tone="mist">
        <h2 className="mb-6 text-2xl font-semibold">{t("خطط المشغّلين", "Operator plans")}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((p) => <Card key={p.en} className={p.hot ? "!border-blue ring-1 ring-blue/30" : ""}><h3 className="text-lg font-semibold">{t(p.ar, p.en)}</h3><p className="mt-2 text-2xl font-semibold text-blue">{t("عند التعاقد", "On request")}</p>
            <ul className="mt-5 space-y-2.5 text-sm">{p.items.map(([a, e]) => <li key={e} className="flex gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-ok" />{t(a, e)}</li>)}</ul>
            <Button href={href("contact")} variant={p.hot ? "primary" : "ghost"} className="mt-6 w-full">{t("اطلب عرضاً", "Get a quote")}</Button></Card>)}
        </div>
      </Section>
    </>
  );
}
