import { useState } from "react";
import { Booking } from "../components/Booking";
import { RouteMap } from "../components/RouteMap";
import { PageHero } from "../components/Shell";
import { Badge, Card, Section } from "../components/ui";
import { COUNTRY, ROUTES, cityById, operatorById } from "../lib/data";
import { useLang } from "../lib/lang";

export default function Routes() {
  const { t, n, money } = useLang();
  const [active, setActive] = useState<string | null>(null);
  const [cross, setCross] = useState(false);
  const list = ROUTES.filter((r) => !cross || r.crossBorder);
  return (
    <>
      <PageHero eyebrow={t("سوق المسارات", "Routes marketplace")} title={t("كل المسارات، بأسعارها ومواعيدها", "Every route, with fares and departures")}
        lead={t("مسارات داخلية وبين المدن وعبر الحدود من مشغّلين مختلفين. قارن واحجز من الصفحة نفسها.", "City, intercity and cross-border routes from different operators. Compare and book without leaving the page.")} />
      <Section tone="mist">
        <div className="grid items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Booking active={active} onActive={setActive} />
          <div className="space-y-4 lg:sticky lg:top-24">
            <RouteMap routes={list} active={active} onSelect={setActive} className="rounded-2xl shadow-[0_24px_60px_-28px_rgba(11,42,56,0.35)]" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={cross} onChange={(e) => setCross(e.target.checked)} className="h-4 w-4 accent-[#0077b6]" />{t("أظهر المسارات العابرة للحدود فقط", "Show cross-border routes only")}</label>
          </div>
        </div>
      </Section>
      <Section>
        <h2 className="mb-2 text-2xl font-semibold">{t("جميع المسارات", "All routes")}</h2>
        <p className="mb-6 text-sm text-mute">{t("قائمة عرض تجريبية. الأسعار تقريبية إلى حين اعتماد جداول المشغّلين.", "Sample listing. Fares are indicative until operator timetables are confirmed.")}</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => {
            const a = cityById(r.from), b = cityById(r.to), op = operatorById(r.operator);
            return (
              <Card key={r.id} className="!p-5">
                <div className="flex items-start justify-between gap-2"><p className="font-semibold">{t(a.ar, a.en)} ← {t(b.ar, b.en)}</p>{r.crossBorder && <Badge tone="turq">{t("حدود", "Border")}</Badge>}</div>
                <p className="mt-1 text-xs text-mute">{t(COUNTRY[a.country].ar, COUNTRY[a.country].en)} · {t(op.ar, op.en)}</p>
                <p className="num mt-3 text-xl font-semibold text-blue">{money(r.fare, r.cur)}</p>
                <p className="num text-xs text-mute">{n(r.hours, r.hours % 1 ? 1 : 0)} {t("ساعة", "h")} · {n(r.departs.length)} {t("رحلات يومياً", "daily departures")}</p>
              </Card>
            );
          })}
        </div>
      </Section>
    </>
  );
}
