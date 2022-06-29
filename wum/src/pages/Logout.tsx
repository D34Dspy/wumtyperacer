import React from 'react';
import { Link } from "react-router-dom";
import { useLanguageContext, LanguageDef as ld } from "../core/Localization";

type LogoutUpdate =  () => void;
type LogoutProps = {
  onLogout: LogoutUpdate
  onCancel: LogoutUpdate
}
export default function Logout(props: LogoutProps) {
  const language = useLanguageContext();
  ld.setLanguage(language);
  return (
    <div>
      <label>{ld.formatString(ld.confirmDelete)}</label>
      <br />
      <Link to="/login"><button onClick={() => props.onLogout()}>{ld.formatString(ld.logout)}</button></Link>
      <Link to="/games"><button onClick={() => props.onCancel()}>{ld.formatString(ld.cancel)}</button></Link>
      <br />
    </div>
  );
}
