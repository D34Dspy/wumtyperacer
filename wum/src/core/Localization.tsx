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
    userAtleast4Length: "Username has to have at least 4 characters",
    passAtleast8Length: "Password has to have at least 8 characters!",
    passAtleast1Digit: "Password has to contain a digit!",
    passAtleast1Letter: "Password has to contain a letter!",
    passAtleast1Punct: "Password has to contain a special char!",
    leaderboards: "leaderboards",
    games: "games",
    gameIsRunning: "running",
    gameOwner: "owner",
    gameParticipants: "players",
    playerName: "name",
    playerCPM: "cpm",
    playerScore: "score",
    light: "light",
    dark: "dark",
    repeatPassword: "Repeat password",
    join: "join",
    refresh: "refresh",
    nextPage: "next page",
    previousPage: "previous page",
    firstPage: "first page",
    lastPage: "last page",
  },
  de: {
    login: "Einloggen",
    register: "Registrieren",
    home: "Startbildschirm",
    about: "Über",
    username: "Nutzername",
    password: "Passwort",
    logout: "Ausloggen",
    confirmPassword: "Passwort bestätigen",
    confirmLogout: "Sind sie sich sicher, dass sie sich ausloggen wollen?",
    aboutCreator: "Gebracht durch Konrad Elsner und Domenic Reckrühm",
    aboutIssuers: "Auftrag von Toni Barth",
    aboutInstitute: "Hochschule Anhalt FB5",
    confirmDelete: "Sind sie sich sicher, dass sie ihren Charakter löschen wollen?",
    delete: "Löschen",
    cancel: "Abbrechen",
    userAtleast4Length: "Nutzername muss mindestens 4 Zeichen lang sein!",
    passAtleast8Length: "Passwort muss mindestens 8 Zeichen lang sein!",
    passAtleast1Digit: "Passwort muss mindestens ein Nummer enthalten!",
    passAtleast1Letter: "Passwort muss mindestens einen Buchstaben enthalten!",
    passAtleast1Punct: "Passwort muss mindestens ein Sonderzeichen enthalten!",
    light: "hell",
    dark: "dunkel",
    repeatPassword: "Passwort wiederholen",
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
