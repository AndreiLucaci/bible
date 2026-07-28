import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./locales/de.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import it from "./locales/it.json";
import ro from "./locales/ro.json";

export const DEFAULT_LANGUAGE = "en";
export const LANGUAGE_STORAGE_KEY = "scriptum-deus:language";
export const SUPPORTED_LANGUAGES = ["en", "ro", "de", "fr", "it", "es"];

const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
const initialLanguage = SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    it: { translation: it },
    ro: { translation: ro },
  },
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = initialLanguage;

export default i18n;
