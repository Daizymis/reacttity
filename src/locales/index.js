import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import enUS from "./en-US";
import zh_CN from "./zh_CN";

i18n.use(initReactI18next).init({
    resources:{enUS: {translation: enUS}, zhCN: {translation: zh_CN}},
    lng: localStorage.getItem('locale') || 'zhCN',
    // keySeparator: false,
    interpolation: {
        escapeValue: false
    }
})

export default i18n;