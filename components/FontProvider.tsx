"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { useEffect } from "react";

interface FontProviderProps {
  children: React.ReactNode;
}

export function FontProvider({ children }: FontProviderProps) {
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    const body = document.body;
    if (currentLanguage === 'kh') {
      body.classList.remove('lang-english');
      body.classList.add('lang-khmer');
    } else {
      body.classList.remove('lang-khmer');
      body.classList.add('lang-english');
    }
  }, [currentLanguage]);

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
