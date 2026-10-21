import { useEffect, useMemo, useState } from "react";
import { useLang } from "../lib/lang";
import { Badge, Illustrative, Stat } from "./ui";

type Status = "moving" | "boarding" | "idle" | "service";
interface Veh { id: string; route: [string, string]; status: Status; occ: number; speed: number; eta: number }

const SEED: Veh[] = [
  { id: "MW-101", route: ["الخرطوم", "Khartoum › Port Sudan"], status: "moving", occ: 86, speed: 82, eta: 190 },
  { id: "MW-102", route: ["الخرطوم", "Khartoum › Wad Madani"], status: "moving", occ: 64, speed: 71, eta: 74 },
  { id: "MW-103", route: ["الخرطوم", "Khartoum › Kassala"], status: "boarding", occ: 38, speed: 0, eta: 420 },
  { id: "MW-104", route: ["وادي حلفا", "Wadi Halfa › Aswan"], status: "moving", occ: 91, speed: 64, eta: 120 },
  { id: "MW-105", route: ["القاهرة", "Cairo › Alexandria"], status: "moving", occ: 72, speed: 88, eta: 55 },
  { id: "MW-106", route: ["جدة", "Jeddah › Medina"], status: "idle", occ: 0, speed: 0, eta: 0 },
  { id: "MW-107", route: ["الرياض", "Riyadh › Dammam"], status: "service", occ: 0, speed: 0, eta: 0 },
  { id: "MW-108", route: ["دبي", "Dubai › Abu Dhabi"], status: "moving", occ: 55, speed: 96, eta: 38 },
];
const ROUTE_AR: Record<string, string> = {
  "MW-101": "الخرطوم › بورتسودان", "MW-102": "الخرطوم › ود مدني", "MW-103": "الخرطوم › كسلا", "MW-104": "وادي حلفا › أسوان",
  "MW-105": "القاهرة › الإسكندرية", "MW-106": "جدة › المدينة", "MW-107": "الرياض › الدمام", "MW-108": "دبي › أبوظبي",
};

const HOURS = Array.from({ length: 24 }, (_, h) => Math.round(30 + 55 * Math.exp(-((h - 7) ** 2) / 8) + 70 * Math.exp(-((h - 17) ** 2) / 10) + 12 * Math.sin(h)));

function AreaChart() {
  const { t, n, lang } = useLang();
  const w = 560, h = 190, pad = 24, max = 140;
  const x = (i: number) => pad + (i / 23) * (w - pad * 2);
  const y = (v: number) => h - pad - (v / max) * (h - pad * 2);
  const line = HOURS.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label={t("الرحلات بحسب الساعة", "Trips by hour")}>
      <defs><linearGradient id="ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#12b5ad" stopOpacity=".35" /><stop offset="1" stopColor="#12b5ad" stopOpacity="0" /></linearGradient></defs>
      {[0, 50, 100].map((g) => <g key={g}><line x1={pad} x2={w - pad} y1={y(g)} y2={y(g)} stroke="#cfdee8" strokeDasharray="3 5" /><text x={pad - 6} y={y(g) + 4} fontSize="10" textAnchor="end" fill="#5b7684">{n(g)}</text></g>)}
      <path d={`${line} L${x(23)},${y(0)} L${x(0)},${y(0)} Z`} fill="url(#ar)" />
      <path d={line} fill="none" stroke="#0077b6" strokeWidth="2.5" strokeLinejoin="round" />
      {[0, 6, 12, 18, 23].map((i) => <text key={i} x={x(i)} y={h - 6} fontSize="10" textAnchor="middle" fill="#5b7684">{n(i)}:{lang === "ar" ? "٠٠" : "00"}</text>)}
    </svg>
  );
}

export function FleetDashboard({ compact = false }: { compact?: boolean }) {
  const { t, n, lang } = useLang();
  const [rows, setRows] = useState(SEED);
  useEffect(() => {
    const id = setInterval(() => setRows((rs) => rs.map((v) => v.status !== "moving" ? v : {
      ...v, speed: Math.max(48, Math.min(104, v.speed + Math.round((Math.random() - 0.5) * 8))), eta: Math.max(1, v.eta - 1),
    })), 2500);
    return () => clearInterval(id);
  }, []);
  const moving = rows.filter((r) => r.status === "moving").length;
  const avgOcc = useMemo(() => Math.round(rows.filter((r) => r.occ).reduce((a, r) => a + r.occ, 0) / rows.filter((r) => r.occ).length), [rows]);
  const st: Record<Status, { ar: string; en: string; tone: "ok" | "blue" | "mute" | "warn" }> = {
    moving: { ar: "في الطريق", en: "En route", tone: "ok" }, boarding: { ar: "صعود الركاب", en: "Boarding", tone: "blue" },
    idle: { ar: "متوقفة", en: "Idle", tone: "mute" }, service: { ar: "صيانة", en: "In service", tone: "warn" },
  };

  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_24px_60px_-28px_rgba(11,42,56,0.45)] md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">{t("لوحة تحليلات الأسطول", "Fleet analytics")}</p>
        <div className="flex items-center gap-2"><span className="relative flex h-2.5 w-2.5"><i className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok/60" /><i className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ok" /></span><Illustrative ar="بيانات محاكاة · ليست فعلية" en="SIMULATED DATA · NOT ACTUALS" /></div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label={t("مركبات نشطة", "Active vehicles")} value={`${n(moving)} / ${n(rows.length)}`} delta={t("+٢ عن أمس", "+2 vs yesterday")} />
        <Stat label={t("الالتزام بالمواعيد", "On-time")} value={`${n(94)}٪`.replace("٪", lang === "ar" ? "٪" : "%")} delta={t("+١٫٢ نقطة", "+1.2 pts")} />
        <Stat label={t("متوسط الإشغال", "Avg occupancy")} value={`${n(avgOcc)}${lang === "ar" ? "٪" : "%"}`} delta={t("ثابت", "steady")} />
        <Stat label={t("تنبيهات مفتوحة", "Open alerts")} value={n(3)} delta={t("١ حرج", "1 critical")} tone="warn" />
      </div>
      {!compact && (
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-xl border border-line p-4"><p className="mb-2 text-sm font-medium">{t("الرحلات بحسب الساعة", "Trips by hour")}</p><AreaChart /></div>
          <div className="rounded-xl border border-line p-4">
            <p className="mb-3 text-sm font-medium">{t("الإشغال بحسب المركبة", "Occupancy by vehicle")}</p>
            <ul className="space-y-2.5">
              {rows.filter((r) => r.occ).map((r) => (
                <li key={r.id} className="grid grid-cols-[64px_1fr_36px] items-center gap-2 text-xs">
                  <span className="font-mono text-mute">{r.id}</span>
                  <span className="h-2 rounded-full bg-mist"><i className="block h-2 rounded-full bg-gradient-to-r from-blue to-turq transition-[width] duration-700" style={{ width: `${r.occ}%` }} /></span>
                  <span className="num text-end">{n(r.occ)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="mt-4 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-mist text-xs text-mute"><tr>{[t("المركبة", "Vehicle"), t("المسار", "Route"), t("الحالة", "Status"), t("السرعة", "Speed"), t("الوصول", "ETA")].map((h) => <th key={h} className="px-4 py-2.5 text-start font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {rows.slice(0, compact ? 5 : 8).map((r) => (
              <tr key={r.id} className="border-t border-line">
                <td className="px-4 py-2.5 font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2.5">{lang === "ar" ? ROUTE_AR[r.id] : r.route[1]}</td>
                <td className="px-4 py-2.5"><Badge tone={st[r.status].tone}>{t(st[r.status].ar, st[r.status].en)}</Badge></td>
                <td className="num px-4 py-2.5">{r.speed ? `${n(r.speed)} ${t("كم/س", "km/h")}` : "—"}</td>
                <td className="num px-4 py-2.5">{r.eta ? `${n(Math.floor(r.eta / 60))}:${String(r.eta % 60).padStart(2, "0")}`.replace(/\d/g, (d) => lang === "ar" ? "٠١٢٣٤٥٦٧٨٩"[+d] : d) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
