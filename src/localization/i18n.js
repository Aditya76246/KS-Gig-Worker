import React, { createContext, useContext, useMemo, useState } from 'react';
import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

import en from './en.json';
import hi from './hi.json';
import te from './te.json';

export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = ['en', 'hi', 'te'];

export const LANGUAGE_OPTIONS = [
  { code: 'en', titleKey: 'language.english', nativeTitle: 'English', subtitle: 'English', short: 'Aa' },
  { code: 'hi', titleKey: 'language.hindi', nativeTitle: 'हिंदी', subtitle: 'Hindi', short: 'अ' },
  { code: 'te', titleKey: 'language.telugu', nativeTitle: 'తెలుగు', subtitle: 'Telugu', short: 'తె' },
];

const i18n = new I18n({ en, hi, te });

i18n.defaultLocale = DEFAULT_LANGUAGE;
i18n.locale = DEFAULT_LANGUAGE;
i18n.enableFallback = true;

const LocalizationContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: (key, options) => i18n.t(key, options),
  tx: (phrase, options) => phrase,
  languageOptions: LANGUAGE_OPTIONS,
  deviceLocale: null,
});

function normalizeLanguage(language) {
  return SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  const value = useMemo(() => {
    const activeLanguage = normalizeLanguage(language);
    i18n.locale = activeLanguage;
    const activePhrases = i18n.translations[activeLanguage]?.phrases ?? {};
    const fallbackPhrases = i18n.translations[DEFAULT_LANGUAGE]?.phrases ?? {};

    const tx = (phrase, options = {}) => {
      let translated = activePhrases[phrase] ?? fallbackPhrases[phrase] ?? phrase;

      Object.entries(options).forEach(([key, value]) => {
        translated = translated.replaceAll(`{{${key}}}`, String(value));
      });

      return translated;
    };

    return {
      language: activeLanguage,
      setLanguage: (nextLanguage) => setLanguageState(normalizeLanguage(nextLanguage)),
      t: (key, options) => i18n.t(key, options),
      tx,
      languageOptions: LANGUAGE_OPTIONS,
      deviceLocale: getLocales()?.[0] ?? null,
    };
  }, [language]);

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LocalizationContext);
}

export default i18n;
