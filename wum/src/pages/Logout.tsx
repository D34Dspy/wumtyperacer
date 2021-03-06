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
    <div className='log_box'>
      <label className='log_text'>{ld.formatString(ld.confirmDelete)}</label>
      <br />
      <Link  to="/login"><button className='log_button' onClick={() => props.onLogout()}>{ld.formatString(ld.logout)}</button></Link>
      <Link  to="/games"><button className='log_button' onClick={() => props.onCancel()}>{ld.formatString(ld.cancel)}</button></Link>
      <br />
    </div>
  );
}
