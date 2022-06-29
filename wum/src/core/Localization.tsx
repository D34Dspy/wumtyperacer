import { createContext, useContext } from "react";
import LocalizedStrings from "react-localization";
import Germany from "../assets/Germany.png";
import UnitedStates from "../assets/UnitedKingdom.png";

export const LanguageContext = createContext("de");

export const useLanguageContext = () => useContext(LanguageContext);

type Languages = {
  [key: string]: { [key: string]: string }
}

const def: Languages = {
  en: {
    login: "Login",
    register: "Register",
    home: "Home",
    about: "About",
    username: "Username",
    password: "Password",
    logout: "Logout",
    confirmPassword: "Confirm password",
    confirmLogout: "Are you sure that you wan't to log out?",
    aboutCreator: "Brought to you by Konrad Elsner und Domenic Reckrühm",
    aboutIssuers: "Auftrag von Toni Barth",
    aboutInstitute: "Hochschule Anhalt FB5",
    confirmDelete: "Are you sure you want to delete your player?",
    delete: "Delete",
    cancel: "cancel",
    userAtleast4Length: "Username has to have a length of atleast 4 symbols",
    passAtleast8Length: "Password has to have a length of atleast 8 symbols",
    passAtleast1Digit: "Password has to have a contain a digit",
    passAtleast1Letter: "Password has to have a contain a letter",
    passAtleast1Punct: "Password has to have a contain a special char",
    leaderboards: "leaderboards",
  },
  de: {
    login: "Einloggen",
    register: "Registrieren",
    home: "",
    about: "Über",
    username: "Username",
    password: "Password",
    logout: "Ausloggen",
    confirmPassword: "Password bestätigen",
    confirmLogout: "Sind sie sich sicher, dass sie sich ausloggen wollen?",
    aboutCreator: "Gebracht durch Konrad Elsner und Domenic Reckrühm",
    aboutIssuers: "Auftrag von Toni Barth",
    aboutInstitute: "Hochschule Anhalt FB5",
    confirmDelete: "Sind sie sich sicher, dass sie ihren Charakter löschen wollen?",
    delete: "Löschen",
    cancel: "Abbrechen",
    userAtleast4Length: "",
    passAtleast8Length: "",
    passAtleast1Digit: "",
    passAtleast1Letter: "",
    passAtleast1Punct: "",
  },
};

export const LanguageDef = new LocalizedStrings(def);

export function localizeId(lang: string, id: string) {
  return def[lang][id];
}

export const Flags = [
  { code: "de", flagFilename: Germany },
  { code: "en", flagFilename: UnitedStates },
];
