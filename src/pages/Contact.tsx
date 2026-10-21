import { useState } from "react";
import { PageHero } from "../components/Shell";
import { Button, Card, Field, Icon, Section, inputCls } from "../components/ui";
import { useLang } from "../lib/lang";

export default function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow={t("تواصل", "Contact")} title={t("قل لنا ما تحتاجه", "Tell us what you need")} lead={t("مشغّل، شركة، مدرسة، أو مستثمر. نردّ بالعربية أو الإنجليزية.", "Operator, company, school or investor. We reply in Arabic or English.")} />
      <Section tone="mist">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-4 rounded-2xl border border-line bg-white p-6 sm:grid-cols-2 md:p-8">
            <Field label={t("الاسم", "Name")}><input required className={inputCls} autoComplete="name" /></Field>
            <Field label={t("البريد الإلكتروني", "Email")}><input required type="email" className={inputCls} autoComplete="email" /></Field>
            <div className="sm:col-span-2"><Field label={t("الموضوع", "Topic")}>
              <select className={inputCls}>{[["مشغّل نقل", "Transport operator"], ["شركة أو مدرسة", "Company or school"], ["مستثمر", "Investor"], ["سائق", "Driver"], ["أخرى", "Other"]].map(([a, e]) => <option key={e}>{t(a, e)}</option>)}</select></Field></div>
            <div className="sm:col-span-2"><Field label={t("رسالتك", "Message")}><textarea required rows={5} className={`${inputCls} h-auto py-3`} /></Field></div>
            <div className="sm:col-span-2"><Button type="submit">{t("إرسال", "Send")}</Button>
              {sent && <p role="status" className="mt-3 text-sm text-ok">{t("نموذج تجريبي: لم تُرسل الرسالة. سيُربط بالبريد عند الإطلاق.", "Demo form: the message was not sent. It connects to email at launch.")}</p>}</div>
          </form>
          <div className="space-y-4">
            <Card><Icon name="pin" className="h-6 w-6 text-blue" /><h3 className="mt-3 font-semibold">{t("المكاتب", "Offices")}</h3><p className="mt-1 text-sm text-mute">{t("القاهرة والخرطوم. العناوين التفصيلية قيد الاعتماد.", "Cairo and Khartoum. Street addresses are being finalised.")}</p></Card>
            <Card><Icon name="globe" className="h-6 w-6 text-blue" /><h3 className="mt-3 font-semibold">{t("اللغات", "Languages")}</h3><p className="mt-1 text-sm text-mute">{t("العربية والإنجليزية.", "Arabic and English.")}</p></Card>
          </div>
        </div>
      </Section>
    </>
  );
}
