import { useState } from "react";
import { PageHero } from "../components/Shell";
import { Badge, Button, Card, Eyebrow, Field, H2, Icon, Reveal, Section, inputCls } from "../components/ui";
import { COUNTRY, OPERATORS } from "../lib/data";
import { useLang } from "../lib/lang";

const TAGS = { bus: ["حافلات", "Buses"], coach: ["حافلات سفر", "Coaches"], van: ["ميني باص", "Vans"], school: ["مدرسي", "School"], corporate: ["شركات", "Corporate"], cross: ["عبر الحدود", "Cross-border"] } as const;

export default function Operators() {
  const { t, n } = useLang();
  const [country, setCountry] = useState("");
  const [q, setQ] = useState("");
  const [sent, setSent] = useState(false);
  const list = OPERATORS.filter((o) => (!country || o.country === country) && (!q || (o.ar + o.en).toLowerCase().includes(q.toLowerCase())));
  const steps = [
    ["building", t("بيانات الشركة", "Company details"), t("السجل التجاري والترخيص وجهة الاتصال.", "Registration, licence and a contact person.")],
    ["fleet", t("الأسطول", "Your fleet"), t("المركبات وسعاتها وصور الوثائق.", "Vehicles, capacities and document scans.")],
    ["route", t("المسارات", "Your routes"), t("المحطات والمواعيد والأسعار.", "Stops, timetables and fares.")],
    ["check", t("المراجعة والإطلاق", "Review and launch"), t("نراجع الملف ثم تُنشر مساراتك للحجز.", "We review the file, then your routes go live for booking.")],
  ];
  return (
    <>
      <PageHero eyebrow={t("دليل المشغّلين", "Operators directory")} title={t("شركاء النقل على المنصة", "The transport partners on the platform")}
        lead={t("مشغّلو حافلات ونقل مدرسي ونقل شركات. كل ملف مراجَع قبل أن تُنشر مساراته.", "Coach, school and corporate transport operators. Every file is reviewed before its routes are published.")} />
      <Section>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <input className={`${inputCls} max-w-[280px]`} placeholder={t("ابحث عن مشغّل", "Search operators")} value={q} onChange={(e) => setQ(e.target.value)} aria-label={t("بحث", "Search")} />
          {["", "SD", "EG", "SA", "AE"].map((c) => (
            <button key={c} onClick={() => setCountry(c)} aria-pressed={country === c}
              className={`h-10 rounded-full border px-4 text-sm font-medium transition-colors ${country === c ? "border-blue bg-blue text-white" : "border-line hover:border-blue"}`}>
              {c ? t(COUNTRY[c as "SD"].ar, COUNTRY[c as "SD"].en) : t("الكل", "All")}
            </button>
          ))}
          <Badge tone="warn">{t("مشغّلون نموذجيون", "Sample operators")}</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((o) => (
            <Card key={o.id} className="transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-turq-soft"><Icon name="bus" /></span>
                <div><p className="font-semibold">{t(o.ar, o.en)}</p><p className="text-xs text-mute">{t(COUNTRY[o.country].ar, COUNTRY[o.country].en)}</p></div></div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div className="rounded-lg bg-mist p-3"><dt className="text-xs text-mute">{t("المركبات", "Vehicles")}</dt><dd className="num text-lg font-semibold">{n(o.fleet)}</dd></div><div className="rounded-lg bg-mist p-3"><dt className="text-xs text-mute">{t("المسارات", "Routes")}</dt><dd className="num text-lg font-semibold">{n(o.routes)}</dd></div></dl>
              <div className="mt-4 flex flex-wrap gap-1.5">{o.tags.map((g) => <Badge key={g} tone="blue">{t(TAGS[g][0], TAGS[g][1])}</Badge>)}</div>
            </Card>
          ))}
          {list.length === 0 && <p className="col-span-full rounded-xl bg-mist p-8 text-center text-mute">{t("لا نتائج.", "No results.")}</p>}
        </div>
      </Section>
      <Section tone="mist">
        <Reveal><Eyebrow>{t("انضم كمشغّل", "Onboard as an operator")}</Eyebrow><H2>{t("أربع خطوات حتى أول حجز", "Four steps to your first booking")}</H2></Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map(([i, h, d], k) => <li key={h}><Card className="h-full"><span className="num text-sm font-semibold text-turq">{n(k + 1)}</span><Icon name={i} className="mt-3 h-6 w-6 text-blue" /><h3 className="mt-3 font-semibold">{h}</h3><p className="mt-1 text-sm text-mute">{d}</p></Card></li>)}
        </ol>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-8 grid max-w-[720px] gap-3 rounded-2xl border border-line bg-white p-6 sm:grid-cols-2">
          <Field label={t("اسم الشركة", "Company name")}><input required className={inputCls} /></Field>
          <Field label={t("الدولة", "Country")}><select className={inputCls}>{Object.values(COUNTRY).map((c) => <option key={c.en}>{t(c.ar, c.en)}</option>)}</select></Field>
          <Field label={t("عدد المركبات", "Fleet size")}><input type="number" min="1" className={inputCls} /></Field>
          <Field label={t("البريد الإلكتروني", "Email")}><input type="email" required className={inputCls} /></Field>
          <div className="sm:col-span-2"><Button type="submit">{t("أرسل الطلب", "Send application")}</Button>
            {sent && <p role="status" className="mt-3 text-sm text-ok">{t("نموذج تجريبي: لم يُرسل شيء بعد. سيُربط بنظام التسجيل عند الإطلاق.", "Demo form: nothing was sent. It connects to the onboarding system at launch.")}</p>}</div>
        </form>
      </Section>
    </>
  );
}
