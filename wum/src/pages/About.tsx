import React from 'react';
import { useLanguageContext, LanguageDef as ld } from "../core/Localization";
import TypeArea from "../components/TypeArea";

export default function About() {
  const language = useLanguageContext();
  ld.setLanguage(language);
  return (
    <div className='log_box'>
      <label>{ld.formatString(ld.aboutCreator)}</label>
      <br />
      <label>{ld.formatString(ld.aboutIssuers)}</label>
      <br />
      <label>{ld.formatString(ld.aboutInstitute)}</label>
      <br />
      <TypeArea text="Brought to you by Konrad Elsner und Domenic Reckrühm"></TypeArea>
    </div>
  );
}
