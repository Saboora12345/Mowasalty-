import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CITIES, ROUTES, cityById, operatorById, type Route } from "../lib/data";
import { useLang } from "../lib/lang";
import { Badge, Button, Field, Icon, inputCls } from "./ui";
import { QR } from "./QR";

type Step = "search" | "seats" | "pay" | "done";
const METHODS = [
  { id: "wallet", ar: "محفظة مواصلاتي", en: "Mowasalti wallet", icon: "wallet" },
  { id: "card", ar: "بطاقة مصرفية", en: "Bank card", icon: "shield" },
  { id: "momo", ar: "نقود الهاتف", en: "Mobile money", icon: "bolt" },
  { id: "station", ar: "الدفع في المحطة", en: "Pay at station", icon: "pin" },
] as const;

interface Props {
  active?: string | null;
  onActive?: (id: string | null) => void;
  /** show the route list as a single column (home hero) */
  compact?: boolean;
}

export function Booking({ active = null, onActive, compact = false }: Props) {
  const { t, n, money, lang } = useLang();
  const [from, setFrom] = useState("khartoum");
  const [to, setTo] = useState("");
  const [pax, setPax] = useState(1);
  const [date, setDate] = useState(() => new Date(Date.now() + 864e5).toISOString().slice(0, 10));
  const [step, setStep] = useState<Step>("search");
  const [time, setTime] = useState<string>("");
  const [seats, setSeats] = useState<number[]>([]);
  const [method, setMethod] = useState<(typeof METHODS)[number]["id"]>("wallet");
  const [ref, setRef] = useState("");

  const results = useMemo(
    () => ROUTES.filter((r) => (!from || r.from === from || r.to === from) && (!to || r.from === to || r.to === to)),
    [from, to],
  );
  const route: Route | undefined = ROUTES.find((r) => r.id === active) ?? undefined;
  const total = route ? route.fare * seats.length : 0;
  const place = (id: string) => { const c = cityById(id); return t(c.ar, c.en); };

  const pick = (r: Route, tm: string) => { onActive?.(r.id); setTime(tm); setSeats([]); setStep("seats"); };
  const toggle = (s: number) => setSeats((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : cur.length < pax ? [...cur, s] : [...cur.slice(1), s]));
  const reset = () => { setStep("search"); setSeats([]); setRef(""); onActive?.(null); };
  const confirm = () => {
    setRef("MW-" + Math.random().toString(36).slice(2, 8).toUpperCase());
    setStep("done");
  };

  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_24px_60px_-28px_rgba(11,42,56,0.45)] md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <ol className="flex items-center gap-2 text-xs font-medium text-mute">
          {(["search", "seats", "pay", "done"] as Step[]).map((s, i) => (
            <li key={s} className={`flex items-center gap-2 ${step === s ? "text-blue" : ""}`}>
              <span className={`grid h-6 w-6 place-items-center rounded-full text-[11px] ${step === s ? "bg-blue text-white" : "bg-mist"}`}>{n(i + 1)}</span>
              <span className="hidden sm:inline">{{ search: t("الرحلة", "Trip"), seats: t("المقاعد", "Seats"), pay: t("الدفع", "Pay"), done: t("التذكرة", "Ticket") }[s]}</span>
            </li>
          ))}
        </ol>
        <Badge tone="warn">{t("تجريبي · لا يتم خصم أي مبلغ", "Demo · nothing is charged")}</Badge>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          {step === "search" && (
            <>
              <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_1fr_110px]">
                <Field label={t("من", "From")}>
                  <select className={inputCls} value={from} onChange={(e) => setFrom(e.target.value)}>
                    <option value="">{t("أي مدينة", "Anywhere")}</option>
                    {CITIES.map((c) => <option key={c.id} value={c.id}>{t(c.ar, c.en)}</option>)}
                  </select>
                </Field>
                <button aria-label={t("تبديل", "Swap")} onClick={() => { setFrom(to); setTo(from); }}
                  className="mt-5 hidden h-12 w-12 place-items-center rounded-xl border border-line text-blue transition-colors hover:bg-mist md:grid"><Icon name="swap" /></button>
                <Field label={t("إلى", "To")}>
                  <select className={inputCls} value={to} onChange={(e) => setTo(e.target.value)}>
                    <option value="">{t("أي مدينة", "Anywhere")}</option>
                    {CITIES.map((c) => <option key={c.id} value={c.id}>{t(c.ar, c.en)}</option>)}
                  </select>
                </Field>
                <Field label={t("التاريخ", "Date")}><input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} /></Field>
                <Field label={t("الركاب", "Passengers")}>
                  <select className={inputCls} value={pax} onChange={(e) => setPax(+e.target.value)}>
                    {[1, 2, 3, 4, 5, 6].map((v) => <option key={v} value={v}>{n(v)}</option>)}
                  </select>
                </Field>
              </div>

              <p className="mt-4 text-sm text-mute">{n(results.length)} {t("مسار متاح", "routes found")}</p>
              <ul className={`mt-3 grid max-h-[430px] gap-3 overflow-y-auto pe-1 ${compact ? "" : "lg:grid-cols-2"}`}>
                {results.map((r) => {
                  const flip = from && r.to === from && r.from !== from;
                  const a = flip ? r.to : r.from, b = flip ? r.from : r.to;
                  return (
                    <li key={r.id} onMouseEnter={() => onActive?.(r.id)}
                      className={`rounded-xl border p-4 transition-colors ${active === r.id ? "border-blue bg-blue/[0.04]" : "border-line"}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="flex items-center gap-2 font-semibold">{place(a)} <Icon name="arrow" className="h-4 w-4 text-mute rtl:rotate-180" /> {place(b)}</p>
                          <p className="mt-1 text-xs text-mute">{t(operatorById(r.operator).ar, operatorById(r.operator).en)} · <span className="num">{n(r.hours, r.hours % 1 ? 1 : 0)} {t("ساعة", "h")} · {n(r.km)} {t("كم", "km")}</span></p>
                        </div>
                        <div className="text-end">
                          <p className="num text-lg font-semibold text-blue">{money(r.fare, r.cur)}</p>
                          {r.crossBorder && <Badge tone="turq">{t("عبر الحدود", "Cross-border")}</Badge>}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {r.departs.map((tm) => (
                          <button key={tm} onClick={() => pick(r, tm)}
                            className="num rounded-lg bg-mist px-3 py-1.5 text-sm font-medium transition-colors hover:bg-blue hover:text-white">{lang === "ar" ? tm.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]) : tm}</button>
                        ))}
                      </div>
                    </li>
                  );
                })}
                {results.length === 0 && <li className="rounded-xl bg-mist p-6 text-center text-sm text-mute">{t("لا توجد رحلات على هذا الاتجاه بعد. جرّب مدينة أخرى.", "No trips on this pair yet. Try another city.")}</li>}
              </ul>
              <p className="mt-3 text-xs text-mute">{t("الأسعار والمشغّلون هنا نماذج للعرض فقط.", "Fares and operators shown here are sample listings.")}</p>
            </>
          )}

          {step === "seats" && route && (
            <div className="grid gap-6 md:grid-cols-[1fr_260px]">
              <div>
                <p className="font-semibold">{place(route.from)} ← {place(route.to)}</p>
                <p className="mb-4 text-sm text-mute"><span className="num">{time}</span> · {date} · {t(`اختر ${n(pax)} مقعد`, `Pick ${pax} seat${pax > 1 ? "s" : ""}`)}</p>
                <div className="mx-auto grid w-fit grid-cols-[repeat(2,44px)_28px_repeat(2,44px)] gap-2 rounded-2xl bg-mist p-4">
                  {Array.from({ length: 24 }, (_, i) => i + 1).map((s) => {
                    const taken = route.taken.includes(s), sel = seats.includes(s);
                    const btn = (
                      <button key={s} disabled={taken} onClick={() => toggle(s)} aria-pressed={sel} aria-label={`${t("مقعد", "Seat")} ${s}`}
                        className={`num h-11 rounded-lg text-xs font-semibold transition-all ${taken ? "bg-line/70 text-mute/60" : sel ? "bg-blue text-white shadow-md" : "bg-white hover:border-blue border border-line"}`}>{n(s)}</button>
                    );
                    return btn;
                  }).reduce<React.ReactNode[]>((acc, el, i) => { acc.push(el); if (i % 4 === 1) acc.push(<span key={`g${i}`} />); return acc; }, [])}
                </div>
                <div className="mt-3 flex justify-center gap-4 text-xs text-mute">
                  <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded bg-white ring-1 ring-line" />{t("متاح", "Free")}</span>
                  <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded bg-blue" />{t("مختار", "Yours")}</span>
                  <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded bg-line" />{t("محجوز", "Taken")}</span>
                </div>
              </div>
              <div className="rounded-xl bg-mist p-4">
                <p className="text-sm text-mute">{t("الإجمالي", "Total")}</p>
                <p className="num mt-1 text-3xl font-semibold">{money(total, route.cur)}</p>
                <p className="num mt-1 text-xs text-mute">{n(seats.length)} × {money(route.fare, route.cur)}</p>
                <Button className="mt-5 w-full" disabled={seats.length !== pax} onClick={() => setStep("pay")}>{t("متابعة إلى الدفع", "Continue to payment")}</Button>
                <button className="mt-2 w-full text-sm text-mute hover:text-blue" onClick={() => setStep("search")}>{t("تغيير الرحلة", "Change trip")}</button>
              </div>
            </div>
          )}

          {step === "pay" && route && (
            <div className="mx-auto max-w-[520px]">
              <p className="mb-3 font-semibold">{t("طريقة الدفع", "Payment method")}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {METHODS.map((m) => (
                  <button key={m.id} onClick={() => setMethod(m.id)} aria-pressed={method === m.id}
                    className={`flex items-center gap-3 rounded-xl border p-3.5 text-start text-sm font-medium transition-colors ${method === m.id ? "border-blue bg-blue/[0.05]" : "border-line hover:border-blue/50"}`}>
                    <Icon name={m.icon} className="h-5 w-5 text-blue" />{t(m.ar, m.en)}
                  </button>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-mist p-4">
                <span className="text-sm text-mute">{n(seats.length)} {t("مقعد", "seat(s)")} · {t("مقاعد", "seats")} {seats.map((s) => n(s)).join("، ")}</span>
                <span className="num text-xl font-semibold">{money(total, route.cur)}</span>
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="ghost" onClick={() => setStep("seats")}>{t("رجوع", "Back")}</Button>
                <Button className="flex-1" onClick={confirm}>{t("تأكيد الحجز", "Confirm booking")}</Button>
              </div>
              <p className="mt-3 text-xs text-mute">{t("بوابة الدفع محاكاة. التكامل الفعلي مع المزوّد يتم بعد التعاقد.", "The gateway is simulated. Live provider integration follows contracting.")}</p>
            </div>
          )}

          {step === "done" && route && (
            <div className="mx-auto max-w-[560px]">
              <div className="flex items-center gap-2 text-ok"><Icon name="check" /><p className="font-semibold">{t("تم الحجز", "Booked")}</p></div>
              <div className="mt-4 grid grid-cols-[1fr_auto] overflow-hidden rounded-2xl border border-line">
                <div className="p-5">
                  <p className="font-mono text-xs text-mute">{ref}</p>
                  <p className="mt-2 text-xl font-semibold">{place(route.from)} ← {place(route.to)}</p>
                  <p className="num mt-1 text-sm text-mute">{date} · {time}</p>
                  <p className="mt-3 text-sm">{t("المقاعد", "Seats")}: <span className="num font-semibold">{seats.map((s) => n(s)).join("، ")}</span></p>
                  <p className="mt-1 text-sm text-mute">{t(operatorById(route.operator).ar, operatorById(route.operator).en)}</p>
                </div>
                <div className="grid place-items-center border-s border-dashed border-line bg-mist p-4"><QR seed={ref} size={120} /></div>
              </div>
              <Button variant="ghost" className="mt-4" onClick={reset}>{t("حجز رحلة أخرى", "Book another trip")}</Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
