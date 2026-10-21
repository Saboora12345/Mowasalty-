import { DriverScreen, Phone } from "../components/Phone";
import { PageHero } from "../components/Shell";
import { Badge, Button, Card, Icon, Illustrative, Section, Stat } from "../components/ui";
import { href } from "../lib/router";
import { useLang } from "../lib/lang";

export default function Driver() {
  const { t, n, money } = useLang();
  const docs: [string, string, "ok" | "warn" | "mute", string, string][] = [
    ["رخصة القيادة", "Driving licence", "ok", "سارية", "Valid"], ["فحص المركبة", "Vehicle inspection", "warn", "تنتهي قريباً", "Expires soon"], ["شهادة الصحة", "Health certificate", "ok", "سارية", "Valid"], ["بطاقة الهوية", "ID card", "mute", "قيد المراجعة", "In review"],
  ];
  return (
    <>
      <PageHero eyebrow={t("بوابة السائق", "Driver portal")} title={t("جدولك، ركّابك، وأرباحك في شاشة واحدة", "Your schedule, riders and earnings on one screen")}
        lead={t("بلا دفاتر ولا اتصالات متفرقة. تعرف رحلة الغد الليلة، وتمسح التذاكر عند الباب، وترى حسابك آخر اليوم.", "No ledgers, no scattered calls. Know tomorrow's trip tonight, scan tickets at the door, and see your balance at day's end.")}>
        <Button href={href("contact")} variant="light">{t("سجّل كسائق", "Register as a driver")}</Button>
      </PageHero>
      <Section tone="mist">
        <div className="grid items-center gap-10 lg:grid-cols-[260px_1fr]">
          <Phone title={t("شاشة الرحلة", "Trip screen")}><DriverScreen /></Phone>
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3"><h2 className="text-2xl font-semibold">{t("لوحة السائق", "Driver dashboard")}</h2><Illustrative ar="أرقام توضيحية" en="ILLUSTRATIVE FIGURES" /></div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Stat label={t("رحلات الأسبوع", "Trips this week")} value={n(11)} />
              <Stat label={t("أرباح الأسبوع", "Week earnings")} value={money(96000, "SDG")} delta={t("تُسوّى الأحد", "settles Sunday")} />
              <Stat label={t("التقييم", "Rating")} value={n(4.8, 1)} />
              <Stat label={t("ساعات القيادة", "Hours driven")} value={n(38)} delta={t("ضمن الحد", "within limit")} />
            </div>
            <Card className="mt-4">
              <p className="mb-3 font-semibold">{t("الوثائق", "Documents")}</p>
              <ul className="divide-y divide-line">{docs.map(([a, e, tone, sa, se]) => <li key={e} className="flex items-center justify-between py-2.5 text-sm"><span className="flex items-center gap-2"><Icon name="shield" className="h-4 w-4 text-blue" />{t(a, e)}</span><Badge tone={tone}>{t(sa, se)}</Badge></li>)}</ul>
            </Card>
          </div>
        </div>
      </Section>
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {[["users", "قائمة الركاب", "Passenger manifest", "من حجز ومن صعد، لحظة بلحظة.", "Who booked and who boarded, live."], ["qr", "مسح التذاكر", "Ticket scanning", "امسح الرمز فيتأكد الحجز في ثانية.", "Scan the code and the booking confirms in a second."], ["wallet", "الأرباح والسلف", "Earnings and advances", "كشف واضح بكل رحلة وخصم.", "A clear statement of every trip and deduction."]].map(([i, a, e, da, de]) => <Card key={e}><Icon name={i} className="h-6 w-6 text-blue" /><h3 className="mt-3 font-semibold">{t(a, e)}</h3><p className="mt-1 text-sm text-mute">{t(da, de)}</p></Card>)}
        </div>
      </Section>
    </>
  );
}
