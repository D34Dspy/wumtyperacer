import { createContext, useContext } from "react";
import LocalizedStrings from "react-localization";
import Germany from "./assets/Germany.png";
import UnitedStates from "./assets/UnitedKingdom.png";

export const LanguageContext = createContext("de");

export const useLanguageContext = () => useContext(LanguageContext);

export const LanguageDef = new LocalizedStrings({
  en: {
    login: "Login",
    register: "Register",
    dashboard: "Dashboard",
    about: "About",
    username: "Username",
    password: "Password",
    repeat_password:"Repeat password",
    logout: "Logout",
    confirmPassword: "Confirm password",
    confirmLogout: "Are you sure that you wan't to log out?",
    aboutCreator: "Brought to you by Konrad Elsner und Domenic Reckrühm",
    aboutIssuers: "Auftrag von Toni Barth",
    aboutInstitute: "Hochschule Anhalt FB5",
    confirmDelete: "Are you sure you want to delete your player?",
    delete: "Delete",
    cancel: "cancel",
    home: "home",
    light: "light",
    dark: "dark",
  },
  de: {
    login: "Einloggen",
    register: "Registrieren",
    dashboard: "Armaturenbretts",
    about: "Über",
    username: "Username",
    password: "Passwort",
    repeat_password: "Wiederhole Passwort",
    logout: "Ausloggen",
    confirmPassword: "Password bestätigen",
    confirmLogout: "Sind sie sich sicher, dass sie sich ausloggen wollen?",
    aboutCreator: "Gebracht durch Konrad Elsner und Domenic Reckrühm",
    aboutIssuers: "Auftrag von Toni Barth",
    aboutInstitute: "Hochschule Anhalt FB5",
    confirmDelete: "Sind sie sich sicher, dass sie ihren Charakter löschen wollen?",
    delete: "Löschen",
    cancel: "Abbrechen",
    home: "Startbildschirm",
    light: "hell",
    dark: "dunkel",
  },
});

export const Flags = [
  { code: "de", flagFilename: Germany },
  { code: "en", flagFilename: UnitedStates },
];
