"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Language,
  setLanguage,
  getCurrentLanguage,
  initI18n,
  getAvailableLanguages,
  t,
} from "./i18n";

interface LanguageContextType {
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  availableLanguages: { code: Language; name: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguageState] =
    useState<Language>(defaultLanguage);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration: update language after client-side mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    const initialLang =
      savedLang && getAvailableLanguages().some((l) => l.code === savedLang)
        ? savedLang
        : defaultLanguage;

    setCurrentLanguageState(initialLang);
    initI18n(initialLang);
    setIsHydrated(true);
  }, [defaultLanguage]);

  const setCurrentLanguage = (lang: Language) => {
    setLanguage(lang);
    setCurrentLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const value: LanguageContextType = {
    currentLanguage,
    setCurrentLanguage,
    availableLanguages: getAvailableLanguages(),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Hook for translation
export function useTranslation() {
  const { currentLanguage } = useLanguage();

  const translate = (key: string) => {
    return t(key, currentLanguage);
  };

  return { t: translate };
}
