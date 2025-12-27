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
    // Remove both classes first
    body.classList.remove('lang-english', 'lang-khmer');

    if (currentLanguage === 'kh') {
      body.classList.add('lang-khmer');
    } else {
      body.classList.add('lang-english');
    }
  }, [currentLanguage]);

  return (
    <div className="min-h-screen font-sans">
      {children}
    </div>
  );
}
