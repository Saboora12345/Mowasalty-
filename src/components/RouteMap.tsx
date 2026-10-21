import { useMemo } from "react";
import { CITIES, MAP, ROUTES, cityById, project, type Route } from "../lib/data";
import { useLang } from "../lib/lang";

const arc = (r: Route) => {
  const a = cityById(r.from), b = cityById(r.to);
  const p = project(a.lon, a.lat), q = project(b.lon, b.lat);
  const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
  const dx = q.x - p.x, dy = q.y - p.y;
  const len = Math.hypot(dx, dy) || 1;
  const bend = Math.min(60, len * 0.18);
  const cx = mx - (dy / len) * bend, cy = my + (dx / len) * bend;
  return { d: `M${p.x},${p.y} Q${cx},${cy} ${q.x},${q.y}`, p, q };
};

interface Props {
  routes?: Route[];
  active?: string | null;
  onSelect?: (id: string) => void;
  className?: string;
}

/** Schematic network map. Positions are projected lon/lat; no coastlines are drawn on purpose. */
export function RouteMap({ routes = ROUTES, active, onSelect, className = "" }: Props) {
  const { t } = useLang();
  const arcs = useMemo(() => routes.map((r) => ({ r, ...arc(r) })), [routes]);
  const used = new Set(routes.flatMap((r) => [r.from, r.to]));
  const lons = [30, 35, 40, 45, 50, 55], lats = [14, 18, 22, 26, 30];

  return (
    <svg viewBox={`0 0 ${MAP.w} ${MAP.h}`} className={`h-auto w-full ${className}`} role="img"
      aria-label={t("خريطة تخطيطية لشبكة المسارات", "Schematic route network map")}>
      <defs>
        <linearGradient id="mapbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3f9fc" /><stop offset="1" stopColor="#e3f0f6" />
        </linearGradient>
      </defs>
      <rect width={MAP.w} height={MAP.h} rx="20" fill="url(#mapbg)" />
      {lons.map((l) => { const x = project(l, 20).x; return <line key={l} x1={x} x2={x} y1="0" y2={MAP.h} stroke="#cfdee8" strokeWidth="1" strokeDasharray="2 6" />; })}
      {lats.map((l) => { const y = project(40, l).y; return <line key={l} y1={y} y2={y} x1="0" x2={MAP.w} stroke="#cfdee8" strokeWidth="1" strokeDasharray="2 6" />; })}

      {arcs.map(({ r, d }) => {
        const on = active === r.id;
        return (
          <g key={r.id} className="cursor-pointer" onClick={() => onSelect?.(r.id)}>
            <path d={d} fill="none" stroke="transparent" strokeWidth="18" />
            <path d={d} fill="none" stroke={on ? "#0077b6" : r.crossBorder ? "#12b5ad" : "#7fb6d3"}
              strokeWidth={on ? 4 : 2.2} strokeLinecap="round" strokeDasharray={r.crossBorder && !on ? "7 6" : undefined}
              style={{ transition: "stroke-width .2s, stroke .2s" }} />
            {on && (
              <circle r="6" fill="#12b5ad" stroke="#fff" strokeWidth="2">
                <animateMotion dur="5s" repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        );
      })}

      {CITIES.filter((c) => used.has(c.id)).map((c) => {
        const { x, y } = project(c.lon, c.lat);
        const hot = active ? routes.some((r) => r.id === active && (r.from === c.id || r.to === c.id)) : false;
        const flip = c.id === "alex" || c.id === "dubai";
        return (
          <g key={c.id}>
            {hot && <circle cx={x} cy={y} r="9" fill="#12b5ad" className="pulse-ring" />}
            <circle cx={x} cy={y} r={hot ? 6 : 4.5} fill={hot ? "#0b2a38" : "#fff"} stroke="#0b2a38" strokeWidth="2" />
            <text x={x + (flip ? -10 : 10)} y={y - 8} textAnchor={flip ? "end" : "start"} fontSize="13" fontWeight="600" fill="#0b2a38" stroke="#f3f9fc" strokeWidth="4" paintOrder="stroke">
              {t(c.ar, c.en)}
            </text>
          </g>
        );
      })}
      <text x="18" y={MAP.h - 16} fontSize="11" fill="#5b7684" fontFamily="IBM Plex Mono, monospace">
        {t("رسم تخطيطي · ليس للملاحة", "SCHEMATIC · NOT FOR NAVIGATION")}
      </text>
    </svg>
  );
}
