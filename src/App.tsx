import { useEffect, useState } from "react";
import { useLang } from "./context/LangContext";
import Drawer from "./components/Drawer";
import SettlementView from "./components/settlement/SettlementView";
import FamilyView from "./components/family/FamilyView";

export type ViewName = "family" | "settlement";

export default function App() {
  const { lang, t, toggleLang } = useLang();
  const [view, setView] = useState<ViewName>("family");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Keep <html lang> in sync, mirroring the original applyLanguage().
  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "zh-TW";
  }, [lang]);

  function switchView(next: ViewName) {
    setView(next);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Drawer
        open={drawerOpen}
        view={view}
        onClose={() => setDrawerOpen(false)}
        onSwitchView={switchView}
      />

      <div className="container">
        <div className="nav-bar">
          <button
            className="hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button className="btn btn-outline" onClick={toggleLang}>
            {t("langBtn")}
          </button>
        </div>

        {/* Both views stay mounted so their state survives switching,
            mirroring the original show/hide behavior. */}
        <section className={"view" + (view === "family" ? " active" : "")}>
          <FamilyView />
        </section>
        <section className={"view" + (view === "settlement" ? " active" : "")}>
          <SettlementView />
        </section>
      </div>
    </>
  );
}
