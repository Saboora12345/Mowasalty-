import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";
export type Cur = "SDG" | "EGP" | "SAR" | "AED";

const CUR_LABEL: Record<Cur, { ar: string; en: string }> = {
  SDG: { ar: "ج.س", en: "SDG" },
  EGP: { ar: "ج.م", en: "EGP" },
  SAR: { ar: "ر.س", en: "SAR" },
  AED: { ar: "د.إ", en: "AED" },
};

interface Ctx {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  /** pick the string for the active language */
  t: (ar: string, en: string) => string;
  /** number with Arabic-Indic digits in Arabic, Western digits in English */
  n: (v: number, digits?: number) => string;
  money: (v: number, cur: Cur) => string;
}

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("mw-lang");
      if (saved === "ar" || saved === "en") return saved;
    } catch { /* storage unavailable */ }
    return "ar";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = lang === "ar" ? "مواصلاتي · منصة التنقل" : "Mowasalti · Mobility platform";
    try { localStorage.setItem("mw-lang", lang); } catch { /* ignore */ }
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    const locale = lang === "ar" ? "ar-EG" : "en-US";
    const n = (v: number, digits = 0) =>
      new Intl.NumberFormat(locale, { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(v);
    return {
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      t: (ar, en) => (lang === "ar" ? ar : en),
      n,
      money: (v, cur) => (lang === "ar" ? `${n(v)} ${CUR_LABEL[cur].ar}` : `${n(v)} ${CUR_LABEL[cur].en}`),
    };
  }, [lang]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang outside LangProvider");
  return c;
}
