import { useState } from "react";
import { useLang } from "../lib/lang";
import { Icon } from "./ui";

const NODES = [
  { id: "pax", icon: "users", ar: "الركاب", en: "Passengers", dar: "يبحثون ويحجزون ويدفعون ويتتبعون الرحلة من تطبيق واحد.", den: "Search, book, pay and track from a single app." },
  { id: "ops", icon: "bus", ar: "المشغّلون", en: "Operators", dar: "ينشرون المسارات والمواعيد ويستلمون الحجوزات والتسويات.", den: "Publish routes and timetables, receive bookings and settlements." },
  { id: "drv", icon: "driver", ar: "السائقون", en: "Drivers", dar: "جدول يومي، مسح للتذاكر، وسجل أرباح واضح.", den: "A daily schedule, ticket scanning and a clear earnings log." },
  { id: "corp", icon: "building", ar: "الشركات", en: "Corporate", dar: "نقل موظفين بعقود شهرية وفواتير موحّدة.", den: "Employee transport on monthly contracts and one invoice." },
  { id: "sch", icon: "school", ar: "المدارس", en: "Schools", dar: "خطوط مدرسية مع إشعار للأهل عند الصعود والنزول.", den: "School lines with parent alerts on boarding and drop-off." },
  { id: "pay", icon: "shield", ar: "بوابة الدفع", en: "Payment gateway", dar: "بطاقات ونقود هاتف وتحويلات عبر مزوّدين مرخّصين.", den: "Cards, mobile money and transfers through licensed providers." },
  { id: "wal", icon: "wallet", ar: "المحفظة", en: "Wallet", dar: "رصيد يُشحن مرة ويُستخدم في كل رحلة.", den: "A balance you top up once and spend on every trip." },
  { id: "x", icon: "globe", ar: "عبر الحدود", en: "Cross-border", dar: "مسارات بين السودان ومصر والخليج بتذكرة واحدة.", den: "Sudan–Egypt–Gulf routes on one ticket." },
];

export function Ecosystem() {
  const { t, lang } = useLang();
  const [on, setOn] = useState("pay");
  const cx = 450, cy = 250, rx = 330, ry = 170;
  const cur = NODES.find((x) => x.id === on)!;
  return (
    <div>
      <svg viewBox="0 0 900 500" className="h-auto w-full" role="img" aria-label={t("مخطط منظومة مواصلاتي", "Mowasalti ecosystem diagram")}>
        {NODES.map((nd, i) => {
          const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
          const hot = nd.id === on;
          return (
            <g key={nd.id}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={hot ? "#12b5ad" : "#cfdee8"} strokeWidth={hot ? 3 : 2} strokeDasharray="6 8">
                {hot && <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.2s" repeatCount="indefinite" />}
              </line>
              <foreignObject x={x - 62} y={y - 34} width="124" height="68">
                <button onClick={() => setOn(nd.id)} onMouseEnter={() => setOn(nd.id)} aria-pressed={hot}
                  className={`flex h-full w-full flex-col items-center justify-center gap-1 rounded-2xl border text-xs font-semibold transition-all ${hot ? "border-turq bg-ink text-white shadow-lg" : "border-line bg-white text-ink hover:border-blue"}`}>
                  <Icon name={nd.icon} className={`h-5 w-5 ${hot ? "text-turq-soft" : "text-blue"}`} />{t(nd.ar, nd.en)}
                </button>
              </foreignObject>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="74" fill="#0b2a38" />
        <circle cx={cx} cy={cy} r="86" fill="none" stroke="#12b5ad" strokeOpacity=".4" strokeDasharray="3 7" />
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700">{lang === "ar" ? "مواصلاتي" : "Mowasalti"}</text>
        <text x={cx} y={cy + 20} textAnchor="middle" fill="#2dd4c4" fontSize="11" fontFamily="IBM Plex Mono, monospace" letterSpacing="2">MaaS</text>
      </svg>
      <div className="mx-auto mt-2 max-w-[560px] rounded-xl bg-mist p-4 text-center" aria-live="polite">
        <p className="font-semibold">{t(cur.ar, cur.en)}</p>
        <p className="mt-1 text-sm text-mute">{t(cur.dar, cur.den)}</p>
      </div>
    </div>
  );
}
