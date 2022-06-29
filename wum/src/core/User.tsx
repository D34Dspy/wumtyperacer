import { createContext, useContext } from "react";

export type User = {
  userId: undefined | number,
  userName: string;
  loggedIn: boolean;
};

export const Guest: User = {
  userId: undefined,
  userName: "Guest",
  loggedIn: false,
};

export type Requirements = {
  username: string[],
  password: string[],
  valid: boolean
};

type Requirement = {
  regex: RegExp,
  message: string,
};

export const RequirementsOk: Requirements = {
  username: [],
  password: [],
  valid: true
}

const minUser: Requirement[] = [
  { regex: /[\w\döäüÖÄÜ]{4,16}/g, message: "userAtleast4Length" }, // userAtleast4Digits
];

const minPass: Requirement[] = [
  { regex: /^.{8}/g, message: "passAtleast8Length" },
  { regex: /\d/g, message: "passAtleast1Digit" },
  { regex: /\w/g, message: "passAtleast1Letter" },
  { regex: /\W/g, message: "passAtleast1Punct" },
];

export const UserContext = createContext<User>(Guest);
export const useUserContext = () => useContext(UserContext);

export function checkRequirements(username: string, password: string): Requirements {

  var userMsgs = [];
  for (let i = 0; i < minUser.length; i++) {
    const element = minUser[i];
    if(!element.regex.test(username))
      userMsgs.push(element.message);
  }

  var passMsgs = [];
  for (let i = 0; i < minPass.length; i++) {
    const element = minPass[i];
    if(!element.regex.test(password))
      passMsgs.push(element.message);
  }

  return {
    username: userMsgs,
    password: passMsgs,
    valid: (userMsgs.length + passMsgs.length) == 0,
  };
}