import { useReducer } from "react";

export default (callback: any) => useReducer((state: boolean) => (state ? state : callback()), false)[1];