import { PageHero } from "../components/Shell";
import { Button, Card, Eyebrow, H2, Icon, Illustrative, Section } from "../components/ui";
import { href } from "../lib/router";
import { useLang } from "../lib/lang";

export default function Investors() {
  const { t } = useLang();
  const phases = [
    ["السودان", "Sudan", "مسارات المدن والولايات، المحفظة، أول مشغّلين.", "City and state routes, the wallet, first operators."],
    ["مصر", "Egypt", "الربط عبر أسوان والقاهرة، وفتح خطوط الحدود.", "Linking through Aswan and Cairo, opening border lines."],
    ["السعودية", "Saudi Arabia", "الرياض وجدة والدمام، وعقود الشركات.", "Riyadh, Jeddah and Dammam, plus corporate contracts."],
    ["الخليج", "GCC", "الإمارات ثم بقية الأسواق بالتراخيص المحلية.", "The UAE, then the rest, under local licences."],
  ];
  const streams = [["ticket", "عمولة على كل تذكرة", "Commission on each ticket"], ["fleet", "اشتراك أسطول شهري", "Monthly fleet subscription"], ["building", "عقود شركات ومدارس", "Corporate and school contracts"], ["wallet", "رسوم الدفع والمحفظة", "Payment and wallet fees"]];
  const mix = [38, 24, 22, 16];
  return (
    <>
      <PageHero eyebrow={t("علاقات المستثمرين", "Investor relations")} title={t("نبني طبقة الحجز والدفع للتنقل في المنطقة", "We are building the booking and payment layer for regional mobility")}
        lead={t("أسواق كبيرة يحجز فيها أغلب الناس عبر الهاتف أو في المحطة. من يجمع المسارات والدفع والبيانات أولاً يملك الطبقة التي تقوم عليها بقية الخدمات.", "Large markets where most people still book by phone or at the station. Whoever unites routes, payments and data first owns the layer other services build on.")}>
        <Button href={href("contact")} variant="light">{t("اطلب غرفة البيانات", "Request the data room")}</Button>
      </PageHero>
      <Section>
        <Eyebrow>{t("خطة التوسع", "Expansion plan")}</Eyebrow><H2>{t("من السودان إلى الخليج على خط واحد", "From Sudan to the Gulf along one line")}</H2>
        <ol className="relative mt-10 grid gap-4 md:grid-cols-4">
          {phases.map(([a, e, da, de], i) => <li key={e}><Card className="h-full"><span className="num grid h-8 w-8 place-items-center rounded-full bg-ink text-sm font-semibold text-turq-soft">{i + 1}</span><h3 className="mt-3 font-semibold">{t(a, e)}</h3><p className="mt-1 text-sm text-mute">{t(da, de)}</p></Card></li>)}
        </ol>
      </Section>
      <Section tone="mist">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div><Eyebrow>{t("مصادر الإيراد", "Revenue streams")}</Eyebrow><H2>{t("أربعة مصادر، تنمو معاً", "Four streams that grow together")}</H2>
            <ul className="mt-6 space-y-3">{streams.map(([i, a, e]) => <li key={e} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"><Icon name={i} className="h-5 w-5 text-blue" />{t(a, e)}</li>)}</ul></div>
          <Card>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><p className="font-semibold">{t("مزيج الإيراد المستهدف", "Target revenue mix")}</p><Illustrative ar="رسم تخطيطي · ليس أرقاماً فعلية" en="SCHEMATIC · NOT ACTUALS" /></div>
            <div className="flex h-4 overflow-hidden rounded-full">{mix.map((v, i) => <i key={i} style={{ width: `${v}%`, background: ["#0077b6", "#12b5ad", "#123251", "#7fb6d3"][i] }} />)}</div>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">{streams.map(([, a, e], i) => <li key={e} className="flex items-center gap-2"><i className="h-3 w-3 rounded" style={{ background: ["#0077b6", "#12b5ad", "#123251", "#7fb6d3"][i] }} />{t(a, e)}</li>)}</ul>
            <p className="mt-4 text-xs leading-relaxed text-mute">{t("النسب أعلاه تصوّر لتوزيع محتمل، وسيحلّ محلها نموذج مالي معتمد.", "Shares above sketch a possible split; a reviewed financial model replaces them.")}</p>
          </Card>
        </div>
      </Section>
    </>
  );
}
