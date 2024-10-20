import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "es",
  lng: "es",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {},
    },
    es: {
      translation: {},
    },
  },
});

export default i18n;
