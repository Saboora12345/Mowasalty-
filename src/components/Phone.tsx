import type { ReactNode } from "react";
import { useLang } from "../lib/lang";
import { Icon } from "./ui";
import { QR } from "./QR";

export function Phone({ children, title }: { children: ReactNode; title: string }) {
  return (
    <figure className="mx-auto w-[240px] shrink-0">
      <div className="rounded-[34px] bg-ink p-2 shadow-[0_30px_60px_-24px_rgba(11,42,56,0.7)]">
        <div className="relative h-[470px] overflow-hidden rounded-[27px] bg-mist">
          <div className="absolute inset-x-0 top-0 z-10 mx-auto mt-2 h-4 w-20 rounded-full bg-ink" />
          <div className="h-full overflow-hidden px-3.5 pb-3 pt-9 text-[11px]">{children}</div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs font-medium text-mute">{title}</figcaption>
    </figure>
  );
}

const Bar = ({ children }: { children: ReactNode }) => <p className="mb-2 text-sm font-bold">{children}</p>;

export function SearchScreen() {
  const { t, n, money } = useLang();
  return (
    <div>
      <Bar>{t("إلى أين اليوم؟", "Where to today?")}</Bar>
      <div className="rounded-xl bg-white p-2.5 shadow-sm">
        <div className="flex items-center gap-2 border-b border-line pb-2"><i className="h-2 w-2 rounded-full bg-blue" />{t("الخرطوم", "Khartoum")}</div>
        <div className="flex items-center gap-2 pt-2"><i className="h-2 w-2 rounded-full bg-turq" />{t("ود مدني", "Wad Madani")}</div>
      </div>
      <div className="mt-3 space-y-2">
        {[["٠٧:٠٠", "07:00", 8000], ["٠٩:٣٠", "09:30", 8000], ["١٣:٠٠", "13:00", 8000]].map(([a, e, p]) => (
          <div key={e as string} className="flex items-center justify-between rounded-xl bg-white p-2.5 shadow-sm">
            <div><p className="num text-sm font-semibold">{t(a as string, e as string)}</p><p className="text-mute">{t("٣ س", "3 h")}</p></div>
            <p className="num font-semibold text-blue">{money(p as number, "SDG")}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-blue py-2.5 text-center font-semibold text-white">{t("عرض المقاعد", "Choose seats")} · {n(3)}</div>
    </div>
  );
}

export function TicketScreen() {
  const { t } = useLang();
  return (
    <div>
      <Bar>{t("تذكرتي", "My ticket")}</Bar>
      <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
        <p className="font-semibold">{t("الخرطوم ← ود مدني", "Khartoum → Wad Madani")}</p>
        <p className="num mb-2 text-mute">{t("٠٧:٠٠ · مقعد ١٢", "07:00 · Seat 12")}</p>
        <div className="mx-auto w-fit"><QR seed="MW-DEMO42" size={150} /></div>
        <p className="mt-1 font-mono text-[10px] text-mute">MW-DEMO42</p>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-turq/10 p-2.5 text-[#0b8a84]"><Icon name="check" className="h-4 w-4" />{t("جاهزة للمسح عند الصعود", "Ready to scan at boarding")}</div>
    </div>
  );
}

export function WalletScreen() {
  const { t, money } = useLang();
  const rows: [string, string, number][] = [["شحن من بطاقة", "Top-up · card", 20000], ["الخرطوم ← ود مدني", "Khartoum → Wad Madani", -8000], ["رحلة حضرية", "Urban ride", -3000]];
  return (
    <div>
      <Bar>{t("المحفظة", "Wallet")}</Bar>
      <div className="rounded-2xl bg-gradient-to-br from-blue to-turq p-3.5 text-white">
        <p className="opacity-80">{t("الرصيد", "Balance")}</p>
        <p className="num text-2xl font-semibold">{money(9000, "SDG")}</p>
        <p className="mt-1 text-[10px] uppercase tracking-wider opacity-70">{t("مثال توضيحي", "Illustrative")}</p>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map(([a, e, v]) => (
          <div key={e} className="flex items-center justify-between rounded-xl bg-white p-2.5 shadow-sm">
            <span>{t(a, e)}</span><span className={`num font-semibold ${v > 0 ? "text-ok" : ""}`}>{v > 0 ? "+" : ""}{money(v, "SDG")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrackScreen() {
  const { t } = useLang();
  return (
    <div>
      <Bar>{t("تتبّع الرحلة", "Live trip")}</Bar>
      <svg viewBox="0 0 200 150" className="w-full rounded-xl bg-white shadow-sm">
        <path d="M20 120 Q70 110 90 70 T180 25" fill="none" stroke="#cfdee8" strokeWidth="5" strokeLinecap="round" />
        <path d="M20 120 Q70 110 90 70" fill="none" stroke="#0077b6" strokeWidth="5" strokeLinecap="round" />
        <circle cx="20" cy="120" r="5" fill="#fff" stroke="#0b2a38" strokeWidth="2" /><circle cx="180" cy="25" r="5" fill="#0b2a38" />
        <circle cx="90" cy="70" r="7" fill="#12b5ad" className="pulse-ring" /><circle cx="90" cy="70" r="5" fill="#12b5ad" stroke="#fff" strokeWidth="2" />
      </svg>
      <div className="mt-3 rounded-xl bg-white p-3 shadow-sm">
        <p className="font-semibold">{t("وصول متوقع بعد ٤٢ دقيقة", "Arriving in 42 min")}</p>
        <div className="mt-2 h-1.5 rounded-full bg-mist"><i className="block h-1.5 w-3/5 rounded-full bg-gradient-to-r from-blue to-turq" /></div>
        <p className="mt-2 text-mute">{t("السائق: ١٢٣٤ · حافلة MW-102", "Bus MW-102")}</p>
      </div>
    </div>
  );
}

export function DriverScreen() {
  const { t, n } = useLang();
  return (
    <div>
      <Bar>{t("رحلة اليوم", "Today's trip")}</Bar>
      <div className="rounded-xl bg-ink p-3 text-white">
        <p className="font-semibold">{t("الخرطوم ← ود مدني", "Khartoum → Wad Madani")}</p>
        <p className="num opacity-70">{t("الانطلاق ٠٧:٠٠", "Departs 07:00")}</p>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-3 shadow-sm"><span>{t("الركاب المسجلون", "Boarded")}</span><span className="num text-lg font-semibold">{n(18)} / {n(24)}</span></div>
      <div className="mt-2 grid place-items-center rounded-xl border-2 border-dashed border-turq/60 bg-white py-7 text-[#0b8a84]"><Icon name="qr" className="h-9 w-9" /><p className="mt-1 font-medium">{t("امسح تذكرة الراكب", "Scan passenger ticket")}</p></div>
      <div className="mt-2 rounded-xl bg-blue py-2.5 text-center font-semibold text-white">{t("بدء الرحلة", "Start trip")}</div>
    </div>
  );
}
