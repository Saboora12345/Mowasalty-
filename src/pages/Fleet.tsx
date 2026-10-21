import { FleetDashboard } from "../components/FleetDashboard";
import { PageHero } from "../components/Shell";
import { Card, Icon, Section } from "../components/ui";
import { useLang } from "../lib/lang";

export default function Fleet() {
  const { t } = useLang();
  const f = [
    ["pin", "تتبّع حي", "Live tracking", "موقع كل مركبة وسرعتها ووقت وصولها المتوقع.", "Every vehicle's position, speed and ETA."],
    ["chart", "تحليلات التشغيل", "Operations analytics", "إشغال وإيراد ومواعيد لكل مسار وساعة.", "Occupancy, revenue and punctuality by route and hour."],
    ["bolt", "الصيانة والوقود", "Maintenance and fuel", "تنبيه قبل موعد الصيانة وسجل استهلاك لكل مركبة.", "Alerts before service is due and a fuel log per vehicle."],
    ["driver", "تقييم السائقين", "Driver scoring", "سرعة وتوقفات وشكاوى في درجة واضحة.", "Speed, stops and complaints in one clear score."],
    ["route", "تحسين الجداول", "Schedule tuning", "اقتراحات لنقل رحلة أو إضافة أخرى حسب الطلب.", "Suggestions to move or add a departure based on demand."],
    ["shield", "الوثائق والتراخيص", "Documents and licences", "تواريخ الانتهاء تظهر قبل أن تتحول إلى مشكلة.", "Expiry dates surface before they become a problem."],
  ];
  return (
    <>
      <PageHero eyebrow={t("حلول الأسطول", "Fleet solutions")} title={t("أسطولك أمامك، مركبة مركبة", "Your fleet in front of you, vehicle by vehicle")}
        lead={t("من التشغيل اليومي إلى التقارير الشهرية. لوحة واحدة للمشغّل الصغير وللأسطول متعدد المدن.", "From daily dispatch to monthly reports. One dashboard for a small operator or a multi-city fleet.")} />
      <Section tone="mist"><FleetDashboard /></Section>
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {f.map(([i, a, e, da, de]) => <Card key={e}><span className="grid h-11 w-11 place-items-center rounded-xl bg-turq/10 text-[#0b8a84]"><Icon name={i} /></span><h3 className="mt-4 font-semibold">{t(a, e)}</h3><p className="mt-1.5 text-sm leading-relaxed text-mute">{t(da, de)}</p></Card>)}
        </div>
      </Section>
    </>
  );
}
