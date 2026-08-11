import { useLang } from "../context/LangContext";
import type { ViewName } from "../App";

interface DrawerProps {
  open: boolean;
  view: ViewName;
  onClose: () => void;
  onSwitchView: (view: ViewName) => void;
}

export default function Drawer({
  open,
  view,
  onClose,
  onSwitchView,
}: DrawerProps) {
  const { t } = useLang();

  return (
    <>
      <div
        className={"drawer-overlay" + (open ? " open" : "")}
        onClick={onClose}
      />
      <nav className={"drawer" + (open ? " open" : "")}>
        <div className="drawer-header">
          <span>{t("navTitle")}</span>
          <button className="drawer-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div
          className={"drawer-item" + (view === "family" ? " active" : "")}
          onClick={() => onSwitchView("family")}
        >
          <span>{t("navFamily")}</span>
        </div>
        <div
          className={"drawer-item" + (view === "settlement" ? " active" : "")}
          onClick={() => onSwitchView("settlement")}
        >
          <span>{t("navSettlement")}</span>
        </div>
      </nav>
    </>
  );
}
