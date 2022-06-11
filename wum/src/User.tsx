import { createContext, useContext } from "react";

export type User = {
  userName: string;
  loggedIn: boolean;
};

export const Guest: User = {
  userName: "Guest",
  loggedIn: false,
};

export const UserContext = createContext<User>(Guest);
export const useUserContext = () => useContext(UserContext);
