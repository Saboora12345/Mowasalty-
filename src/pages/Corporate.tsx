import { useState } from "react";
import { PageHero } from "../components/Shell";
import { Badge, Button, Card, Eyebrow, H2, Icon, Section } from "../components/ui";
import { FARE_TIERS } from "../lib/data";
import { href } from "../lib/router";
import { useLang } from "../lib/lang";

export default function Corporate() {
  const { t, n, money } = useLang();
  const [mode, setMode] = useState<"corp" | "school">("corp");
  const [people, setPeople] = useState(120);
  const [days, setDays] = useState(22);
  const [tier, setTier] = useState<number>(FARE_TIERS[0]);
  const monthly = people * days * 2 * tier;
  const items = mode === "corp"
    ? [["فاتورة واحدة", "One invoice", "كل الخطوط والمقاولين في كشف شهري موحّد.", "Every line and contractor on a single monthly statement."], ["قوائم الركاب", "Rider rosters", "تحدّد من يركب أي خط، ويصعد بتذكرة رقمية.", "Decide who rides which line; riders board with a digital pass."], ["تقارير الحضور", "Attendance reports", "من صعد ومتى، لإدارة الموارد البشرية.", "Who boarded and when, for HR."]]
    : [["إشعار للأهل", "Parent alerts", "رسالة عند صعود الطفل ونزوله وعند تأخر الحافلة.", "A message when a child boards, gets off, or the bus runs late."], ["سائقون موثّقون", "Verified drivers", "ملف وثائق وفحص لكل سائق قبل التعيين.", "A document file and vetting for every driver before assignment."], ["خطوط الفصل الدراسي", "Term-long lines", "اشتراك بدل الدفع اليومي، مع تعويض الأيام الفائتة.", "A term subscription instead of daily payment, with missed days credited."]];
  return (
    <>
      <PageHero eyebrow={t("التنقل للشركات", "Corporate mobility")} title={t("نقل الموظفين والطلاب بلا مقاولين متفرقين", "Staff and student transport without a patchwork of contractors")}
        lead={t("نصمّم الخطوط حول عناوين موظفيكم أو طلابكم، ونشغّلها مع مشغّلين مراجَعين، وتدفعون فاتورة واحدة.", "We design lines around your staff or students' addresses, run them with vetted operators, and you pay one invoice.")} />
      <Section>
        <div className="mb-8 inline-flex rounded-xl bg-mist p-1" role="tablist">
          {(["corp", "school"] as const).map((m) => <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${mode === m ? "bg-white text-blue shadow-sm" : "text-mute"}`}><Icon name={m === "corp" ? "building" : "school"} className="h-4 w-4" />{m === "corp" ? t("الشركات", "Corporate") : t("المدارس", "Schools")}</button>)}
        </div>
        <div className="grid gap-4 md:grid-cols-3">{items.map(([a, e, da, de]) => <Card key={e}><h3 className="font-semibold">{t(a, e)}</h3><p className="mt-2 text-sm leading-relaxed text-mute">{t(da, de)}</p></Card>)}</div>
      </Section>
      <Section tone="mist">
        <Eyebrow>{t("حاسبة تقديرية", "Quick estimator")}</Eyebrow><H2>{t("كم تكلفة النقل الشهرية تقريباً؟", "Roughly what does a month cost?")}</H2>
        <div className="mt-8 grid gap-6 rounded-2xl border border-line bg-white p-6 md:grid-cols-[1fr_320px] md:p-8">
          <div className="space-y-6">
            <label className="block"><span className="flex justify-between text-sm font-medium"><span>{t("عدد الركاب", "Riders")}</span><span className="num text-blue">{n(people)}</span></span><input type="range" min="10" max="500" step="10" value={people} onChange={(e) => setPeople(+e.target.value)} className="mt-2 w-full accent-[#0077b6]" /></label>
            <label className="block"><span className="flex justify-between text-sm font-medium"><span>{t("أيام التشغيل في الشهر", "Operating days per month")}</span><span className="num text-blue">{n(days)}</span></span><input type="range" min="8" max="30" value={days} onChange={(e) => setDays(+e.target.value)} className="mt-2 w-full accent-[#0077b6]" /></label>
            <div><p className="mb-2 text-sm font-medium">{t("فئة الأجرة للرحلة الواحدة", "Fare tier per ride")}</p><div className="flex flex-wrap gap-2">{FARE_TIERS.map((f) => <button key={f} onClick={() => setTier(f)} aria-pressed={tier === f} className={`num h-10 rounded-full border px-4 text-sm font-medium ${tier === f ? "border-blue bg-blue text-white" : "border-line"}`}>{money(f, "SDG")}</button>)}</div></div>
          </div>
          <div className="rounded-xl bg-ink p-6 text-white"><p className="text-sm text-white/65">{t("تقدير شهري (ذهاب وإياب)", "Monthly estimate (round trip)")}</p><p className="num mt-2 text-3xl font-semibold text-turq-soft">{money(monthly, "SDG")}</p><p className="mt-3 text-xs leading-relaxed text-white/55">{t("حساب مبسّط: الركاب × الأيام × ٢ × الأجرة. العرض النهائي يعتمد على المسار وحجم الأسطول.", "Simple maths: riders × days × 2 × fare. The final quote depends on the route and fleet size.")}</p><Badge tone="warn">{t("تقدير لا عرض سعر", "Estimate, not a quote")}</Badge></div>
        </div>
        <Button href={href("contact")} className="mt-6">{t("اطلب عرضاً", "Request a proposal")}</Button>
      </Section>
    </>
  );
}
