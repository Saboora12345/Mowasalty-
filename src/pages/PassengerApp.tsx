import { Phone, SearchScreen, TicketScreen, TrackScreen, WalletScreen } from "../components/Phone";
import { PageHero } from "../components/Shell";
import { Badge, Card, Icon, Section } from "../components/ui";
import { useLang } from "../lib/lang";

export default function PassengerApp() {
  const { t } = useLang();
  const f = [["pin", "ابحث بالمدينة", "Search by city", "اكتب وجهتك فتظهر كل المسارات المتاحة.", "Type a destination and see every available route."], ["ticket", "تذكرة برمز", "Ticket with a code", "تعمل التذكرة بلا إنترنت بعد الحجز.", "Your ticket works offline once booked."], ["wallet", "محفظة", "Wallet", "اشحن مرة، وادفع بضغطة في كل رحلة.", "Top up once, pay in one tap on every trip."], ["route", "تتبّع مباشر", "Live tracking", "شاهد الحافلة وتوقيت وصولها.", "Watch the bus and its arrival time."]];
  return (
    <>
      <PageHero eyebrow={t("تطبيق الراكب", "Passenger app")} title={t("حجز رحلة أسهل من إرسال رسالة", "Booking a trip, easier than sending a message")}
        lead={t("تطبيق بالعربية أولاً، خفيف على الهواتف المتوسطة، يعمل مع شبكات ضعيفة.", "Arabic-first, light enough for mid-range phones, built to cope with weak networks.")}>
        <div className="flex flex-wrap gap-3"><Badge tone="turq">{t("متجر آب ستور: قريباً", "App Store: coming soon")}</Badge><Badge tone="turq">{t("جوجل بلاي: قريباً", "Google Play: coming soon")}</Badge></div>
      </PageHero>
      <Section tone="mist">
        <div className="-mx-5 flex gap-6 overflow-x-auto px-5 pb-6 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0">
          <Phone title={t("١ · ابحث", "1 · Search")}><SearchScreen /></Phone><Phone title={t("٢ · التذكرة", "2 · Ticket")}><TicketScreen /></Phone>
          <Phone title={t("٣ · المحفظة", "3 · Wallet")}><WalletScreen /></Phone><Phone title={t("٤ · تتبّع", "4 · Track")}><TrackScreen /></Phone>
        </div>
      </Section>
      <Section><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{f.map(([i, a, e, da, de]) => <Card key={e}><Icon name={i} className="h-6 w-6 text-blue" /><h3 className="mt-3 font-semibold">{t(a, e)}</h3><p className="mt-1 text-sm text-mute">{t(da, de)}</p></Card>)}</div></Section>
    </>
  );
}
