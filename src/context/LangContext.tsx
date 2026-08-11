import { createContext, useContext, useState, type ReactNode } from "react";
import { i18n, type LangPack, type StringKey } from "../i18n";
import type { Lang } from "../types";

interface LangContextValue {
  lang: Lang;
  /** Translate a string key for the current language. */
  t: (key: StringKey) => string;
  /** The full active language pack (for array values like `purposes`). */
  pack: LangPack;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const value: LangContextValue = {
    lang,
    pack: i18n[lang],
    t: (key) => i18n[lang][key],
    toggleLang: () => setLang((prev) => (prev === "en" ? "zh" : "en")),
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within <LangProvider>");
  return ctx;
}
