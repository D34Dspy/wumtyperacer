import React from 'react';
import { useLanguageContext, LanguageDef as ld } from "../core/Localization";
import { Link } from "react-router-dom";

export default function Home() {
  const language = useLanguageContext();
  ld.setLanguage(language);
  return (
    <div className="log_box">
      <label className="log_text">{"home"}</label>
      <br />
    </div>
  );
}