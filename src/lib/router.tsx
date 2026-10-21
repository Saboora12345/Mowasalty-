import { useEffect, useState } from "react";

export const PAGES = [
  "home", "routes", "operators", "fleet", "corporate", "driver", "app", "pricing", "investors", "contact", "system",
] as const;
export type Page = (typeof PAGES)[number];

const parse = (): Page => {
  const h = window.location.hash.replace(/^#\/?/, "") as Page;
  return PAGES.includes(h) ? h : "home";
};

export function usePage(): Page {
  const [p, setP] = useState<Page>(parse);
  useEffect(() => {
    const on = () => { setP(parse()); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return p;
}

export const href = (p: Page) => `#/${p}`;
