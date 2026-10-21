import { PageHero } from "../components/Shell";
import { Badge, Button, Card, Field, Illustrative, Section, Stat, inputCls } from "../components/ui";
import { useLang } from "../lib/lang";

const COLORS: [string, string, string][] = [
  ["ink", "#0B2A38", "نص وخلفيات داكنة · Text, dark surfaces"], ["navy", "#123251", "بطاقات داكنة · Dark cards"], ["blue", "#0077B6", "الأساسي · Primary"], ["cyan", "#0096C7", "ثانوي · Secondary"],
  ["turq", "#12B5AD", "التوكيد · Accent"], ["turq-soft", "#2DD4C4", "على الداكن · On dark"], ["mist", "#EDF4F8", "الأسطح · Surfaces"], ["line", "#CFDEE8", "الخطوط · Hairlines"], ["ok", "#1B9E77", "نجاح · Success"], ["warn", "#C77D0A", "تحذير · Warning"],
];

export default function System() {
  const { t } = useLang();
  return (
    <>
      <PageHero eyebrow={t("نظام التصميم", "Design system")} title={t("الألوان والمكوّنات", "Colour and components")} lead={t("المرجع الحيّ للرموز المستخدمة في الموقع. التفاصيل الكاملة في DESIGN.md.", "The live reference for tokens used across the site. Full notes live in DESIGN.md.")} />
      <Section>
        <h2 className="mb-5 text-2xl font-semibold">{t("نظام الألوان", "Colour system")}</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">{COLORS.map(([n, h, d]) => <div key={n} className="overflow-hidden rounded-xl border border-line"><div className="h-20" style={{ background: h }} /><div className="p-3"><p className="text-sm font-semibold">{n}</p><p className="font-mono text-xs text-mute">{h}</p><p className="mt-1 text-xs text-mute">{d}</p></div></div>)}</div>
        <h2 className="mb-5 mt-14 text-2xl font-semibold">{t("المكوّنات", "Components")}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card><p className="mb-3 text-xs font-semibold text-mute">{t("أزرار", "Buttons")}</p><div className="flex flex-wrap gap-3"><Button>{t("أساسي", "Primary")}</Button><Button variant="ghost">{t("ثانوي", "Ghost")}</Button><Button disabled>{t("معطّل", "Disabled")}</Button></div></Card>
          <Card><p className="mb-3 text-xs font-semibold text-mute">{t("شارات", "Badges")}</p><div className="flex flex-wrap gap-2"><Badge>Blue</Badge><Badge tone="turq">Turquoise</Badge><Badge tone="ok">OK</Badge><Badge tone="warn">Warn</Badge><Badge tone="mute">Mute</Badge><Illustrative /></div></Card>
          <Card><p className="mb-3 text-xs font-semibold text-mute">{t("حقول", "Inputs")}</p><Field label={t("المدينة", "City")}><input className={inputCls} placeholder={t("الخرطوم", "Khartoum")} /></Field></Card>
          <Card><p className="mb-3 text-xs font-semibold text-mute">{t("مؤشرات", "Stat tiles")}</p><div className="grid grid-cols-2 gap-3"><Stat label={t("إشغال", "Occupancy")} value="86%" delta="+3" /><Stat label={t("تنبيهات", "Alerts")} value="3" delta="1" tone="warn" /></div></Card>
        </div>
        <h2 className="mb-3 mt-14 text-2xl font-semibold">{t("الطباعة", "Typography")}</h2>
        <Card><p className="text-5xl font-semibold tracking-tight">{t("مواصلاتي", "Mowasalti")}</p><p className="mt-2 text-mute">IBM Plex Sans · IBM Plex Sans Arabic · <span className="font-mono">IBM Plex Mono</span></p></Card>
      </Section>
    </>
  );
}
