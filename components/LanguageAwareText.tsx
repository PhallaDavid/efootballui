"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageAwareTextProps {
  children: React.ReactNode;
  className?: string;
}

export function LanguageAwareText({
  children,
  className
}: LanguageAwareTextProps) {
  const { currentLanguage } = useLanguage();

  const fontClass = currentLanguage === 'kh' ? 'font-khmer' : 'font-sans';

  return (
    <span className={cn(fontClass, className)}>
      {children}
    </span>
  );
}
