import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationEng from "./en/translation.json";
import translationCze from "./cs/translation.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(XHR)
    .init({
        keySeparator: false,
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        resources: {
            en: {
                translations: translationEng
            },
            cs: {
                translations: translationCze
            }
        },
        fallbackLng: translationEng,
        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",
        react: {
            useSuspense: false
        }
    });

export default i18n;