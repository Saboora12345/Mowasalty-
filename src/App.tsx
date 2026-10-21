import { lazy, Suspense } from "react";
import { Footer, Header } from "./components/Shell";
import { LangProvider } from "./lib/lang";
import { usePage, type Page } from "./lib/router";
import Home from "./pages/Home";

const pages: Record<Exclude<Page, "home">, React.LazyExoticComponent<() => React.JSX.Element>> = {
  routes: lazy(() => import("./pages/Routes")),
  operators: lazy(() => import("./pages/Operators")),
  fleet: lazy(() => import("./pages/Fleet")),
  corporate: lazy(() => import("./pages/Corporate")),
  driver: lazy(() => import("./pages/Driver")),
  app: lazy(() => import("./pages/PassengerApp")),
  pricing: lazy(() => import("./pages/Pricing")),
  investors: lazy(() => import("./pages/Investors")),
  contact: lazy(() => import("./pages/Contact")),
  system: lazy(() => import("./pages/System")),
};

function Routed() {
  const page = usePage();
  const Page = page === "home" ? Home : pages[page];
  return (
    <>
      <Header page={page} />
      <main><Suspense fallback={<div className="h-[60vh]" />}><Page /></Suspense></main>
      <Footer />
    </>
  );
}

export default function App() {
  return <LangProvider><Routed /></LangProvider>;
}
