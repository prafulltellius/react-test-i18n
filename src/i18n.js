
import getItemFromCookie from "./utils";
import i18nWrapper from "./i18n/i18nWrapper";
import { changeLanguage,getLanguage as getI18nLang } from "./i18n/i18nHelpers";


i18nWrapper.useLanguageDetector({
    config:{
        order: ["localStorage", "cookie"],
        caches: ["localStorage", "cookie"],
        lookupLocalStorage: "lang",
        lookupCookie: "lang"
    }
  }).useBackendPlugins().init({
    debug: true,
    supportedLangs: ["en", "hi", "tel"],
    falbackLang:'en',
    interpolation: {
      escapeValue: false // not needed for react!!
    }
  });


export const setLanguage=(value)=>{
     changeLanguage(value);
}

export const getLanguage=()=>{
    const i18nlang = getI18nLang();

    if(i18nlang){
        return i18nlang
    }

    const localStorageLang = localStorage.getItem("lang");

    if (localStorageLang) {
        return localStorageLang;
    }
      
    const cookieLang = getItemFromCookie("lang");
    return cookieLang;
}

