import type { Cur } from "./lang";

export interface City {
  id: string;
  ar: string;
  en: string;
  country: "SD" | "EG" | "SA" | "AE";
  lon: number;
  lat: number;
}

export const CITIES: City[] = [
  { id: "khartoum", ar: "الخرطوم", en: "Khartoum", country: "SD", lon: 32.53, lat: 15.6 },
  { id: "portsudan", ar: "بورتسودان", en: "Port Sudan", country: "SD", lon: 37.22, lat: 19.62 },
  { id: "madani", ar: "ود مدني", en: "Wad Madani", country: "SD", lon: 33.52, lat: 14.4 },
  { id: "kassala", ar: "كسلا", en: "Kassala", country: "SD", lon: 36.4, lat: 15.45 },
  { id: "wadihalfa", ar: "وادي حلفا", en: "Wadi Halfa", country: "SD", lon: 31.33, lat: 21.8 },
  { id: "aswan", ar: "أسوان", en: "Aswan", country: "EG", lon: 32.9, lat: 24.09 },
  { id: "cairo", ar: "القاهرة", en: "Cairo", country: "EG", lon: 31.24, lat: 30.04 },
  { id: "alex", ar: "الإسكندرية", en: "Alexandria", country: "EG", lon: 29.92, lat: 31.2 },
  { id: "jeddah", ar: "جدة", en: "Jeddah", country: "SA", lon: 39.17, lat: 21.54 },
  { id: "medina", ar: "المدينة المنورة", en: "Medina", country: "SA", lon: 39.61, lat: 24.47 },
  { id: "riyadh", ar: "الرياض", en: "Riyadh", country: "SA", lon: 46.68, lat: 24.71 },
  { id: "dammam", ar: "الدمام", en: "Dammam", country: "SA", lon: 50.1, lat: 26.43 },
  { id: "abudhabi", ar: "أبوظبي", en: "Abu Dhabi", country: "AE", lon: 54.37, lat: 24.45 },
  { id: "dubai", ar: "دبي", en: "Dubai", country: "AE", lon: 55.27, lat: 25.2 },
];

export const cityById = (id: string) => CITIES.find((c) => c.id === id)!;

export interface Route {
  id: string;
  from: string;
  to: string;
  /** indicative fare, per seat */
  fare: number;
  cur: Cur;
  hours: number;
  km: number;
  operator: string;
  departs: string[];
  vehicle: "bus" | "coach" | "van";
  crossBorder: boolean;
  /** seats already taken, deterministic for the demo */
  taken: number[];
}

/**
 * SAMPLE LISTINGS. Only the three Mowasalati urban fare tiers (3,000 / 8,000 / 15,000 SDG)
 * are confirmed by the owner; every fare below is indicative placeholder data.
 */
export const ROUTES: Route[] = [
  { id: "r1", from: "khartoum", to: "portsudan", fare: 15000, cur: "SDG", hours: 12, km: 840, operator: "op1", departs: ["06:00", "14:30", "21:00"], vehicle: "coach", crossBorder: false, taken: [2, 3, 7, 8, 14, 15, 19, 22] },
  { id: "r2", from: "khartoum", to: "madani", fare: 8000, cur: "SDG", hours: 3, km: 190, operator: "op2", departs: ["07:00", "09:30", "13:00", "17:00"], vehicle: "bus", crossBorder: false, taken: [1, 5, 6, 11] },
  { id: "r3", from: "khartoum", to: "kassala", fare: 15000, cur: "SDG", hours: 7, km: 480, operator: "op1", departs: ["05:30", "12:00"], vehicle: "coach", crossBorder: false, taken: [4, 9, 10, 16, 17] },
  { id: "r4", from: "wadihalfa", to: "aswan", fare: 1200, cur: "EGP", hours: 5, km: 330, operator: "op3", departs: ["08:00", "15:00"], vehicle: "bus", crossBorder: true, taken: [3, 12, 13] },
  { id: "r5", from: "aswan", to: "cairo", fare: 650, cur: "EGP", hours: 12, km: 880, operator: "op3", departs: ["19:00", "22:30"], vehicle: "coach", crossBorder: false, taken: [2, 8, 9, 18, 20] },
  { id: "r6", from: "cairo", to: "alex", fare: 180, cur: "EGP", hours: 3, km: 220, operator: "op4", departs: ["06:30", "09:00", "12:00", "16:00", "20:00"], vehicle: "bus", crossBorder: false, taken: [1, 2, 3, 4, 10] },
  { id: "r7", from: "jeddah", to: "medina", fare: 75, cur: "SAR", hours: 4, km: 420, operator: "op5", departs: ["07:00", "11:00", "15:00", "19:30"], vehicle: "coach", crossBorder: false, taken: [5, 6, 7, 21] },
  { id: "r8", from: "riyadh", to: "dammam", fare: 90, cur: "SAR", hours: 4, km: 400, operator: "op5", departs: ["06:00", "10:00", "14:00", "18:00"], vehicle: "coach", crossBorder: false, taken: [3, 4, 12, 13, 14] },
  { id: "r9", from: "riyadh", to: "jeddah", fare: 160, cur: "SAR", hours: 9, km: 950, operator: "op5", departs: ["08:00", "22:00"], vehicle: "coach", crossBorder: false, taken: [2, 3, 17] },
  { id: "r10", from: "dubai", to: "abudhabi", fare: 25, cur: "AED", hours: 1.5, km: 140, operator: "op6", departs: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00"], vehicle: "bus", crossBorder: false, taken: [1, 7, 8] },
  { id: "r11", from: "dammam", to: "dubai", fare: 220, cur: "SAR", hours: 8, km: 650, operator: "op6", departs: ["09:00", "21:00"], vehicle: "coach", crossBorder: true, taken: [6, 7, 11, 12] },
];

export interface Operator {
  id: string;
  ar: string;
  en: string;
  country: "SD" | "EG" | "SA" | "AE";
  fleet: number;
  routes: number;
  tags: ("bus" | "coach" | "van" | "school" | "corporate" | "cross")[];
}

/** Invented sample operators for layout only. Replace with onboarded partners. */
export const OPERATORS: Operator[] = [
  { id: "op1", ar: "مشغّل نموذجي ١", en: "Sample Operator 1", country: "SD", fleet: 38, routes: 6, tags: ["coach", "cross"] },
  { id: "op2", ar: "مشغّل نموذجي ٢", en: "Sample Operator 2", country: "SD", fleet: 24, routes: 4, tags: ["bus", "school"] },
  { id: "op3", ar: "مشغّل نموذجي ٣", en: "Sample Operator 3", country: "EG", fleet: 52, routes: 9, tags: ["coach", "cross"] },
  { id: "op4", ar: "مشغّل نموذجي ٤", en: "Sample Operator 4", country: "EG", fleet: 61, routes: 12, tags: ["bus", "corporate"] },
  { id: "op5", ar: "مشغّل نموذجي ٥", en: "Sample Operator 5", country: "SA", fleet: 110, routes: 18, tags: ["coach", "corporate", "school"] },
  { id: "op6", ar: "مشغّل نموذجي ٦", en: "Sample Operator 6", country: "AE", fleet: 45, routes: 8, tags: ["bus", "cross", "van"] },
];
export const operatorById = (id: string) => OPERATORS.find((o) => o.id === id)!;

export const COUNTRY = {
  SD: { ar: "السودان", en: "Sudan" },
  EG: { ar: "مصر", en: "Egypt" },
  SA: { ar: "السعودية", en: "Saudi Arabia" },
  AE: { ar: "الإمارات", en: "UAE" },
} as const;

export const FARE_TIERS = [3000, 8000, 15000] as const; // confirmed SDG fares

/** Equirectangular projection onto an SVG viewBox for the schematic route map. */
export const MAP = { w: 900, h: 560, lon0: 27, lon1: 58, lat0: 12, lat1: 32.5 };
export function project(lon: number, lat: number) {
  const x = ((lon - MAP.lon0) / (MAP.lon1 - MAP.lon0)) * MAP.w;
  const y = ((MAP.lat1 - lat) / (MAP.lat1 - MAP.lat0)) * MAP.h;
  return { x, y };
}
