import enTranslations from '../public/locales/en.json';
import khTranslations from '../public/locales/kh.json';

export type Language = 'en' | 'kh';
export type TranslationKey = string;
export type TranslationObject = Record<string, unknown>;

// Translation data
const translations: Record<Language, TranslationObject> = {
  en: enTranslations,
  kh: khTranslations,
};

// Current language state
let currentLanguage: Language = 'en';

// Load translations (in a real app, this would load from files dynamically)
export function loadTranslations(lang: Language): TranslationObject {
  return translations[lang] || translations.en;
}

// Set current language
export function setLanguage(lang: Language): void {
  currentLanguage = lang;
}

// Get current language
export function getCurrentLanguage(): Language {
  return currentLanguage;
}

// Translation function with prefix support
export function t(key: string, language?: Language): string {
  const lang = language || currentLanguage;
  const translationData = loadTranslations(lang);

  const parts = key.split('.');
  let current: unknown = translationData;

  // Navigate through the nested object using the key parts
  for (const part of parts) {
    if (current && typeof current === 'object' && current !== null && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      // If key not found, try fallback to English
      if (lang !== 'en') {
        const fallbackData = loadTranslations('en');
        let fallback: unknown = fallbackData;
        for (const fallbackPart of parts) {
          if (fallback && typeof fallback === 'object' && fallback !== null && fallbackPart in fallback) {
            fallback = (fallback as Record<string, unknown>)[fallbackPart];
          } else {
            return key; // Return key if not found in any language
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
      return key;
    }
  }

  // Return the translation if found
  return typeof current === 'string' ? current : key;
}

// Get all available languages
export function getAvailableLanguages(): { code: Language; name: string }[] {
  return [
    { code: 'en', name: 'English' },
    { code: 'kh', name: 'ភាសាខ្មែរ' }
  ];
}

// Initialize with default language
export function initI18n(defaultLang: Language = 'en'): void {
  setLanguage(defaultLang);
}
