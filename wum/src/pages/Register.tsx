import { useLanguageContext, LanguageDef as ld } from "../Localization";

export default function Register() {
  const language = useLanguageContext();
  ld.setLanguage(language);
  return (
    <div>
      <label>{ld.formatString(ld.username)}</label>
      <br />
      <input id="username"></input>
      <br />
      <label>{ld.formatString(ld.password)}</label>
      <br />
      <input id="password"></input>
      <br />
      <label>{ld.formatString(ld.confirmPassword)}</label>
      <br />
      <input id="password"></input>
      <br />
      <button>{ld.formatString(ld.register)}</button>
      <br />
    </div>
  );
}
