import { useLanguageContext, LanguageDef as ld } from "../Localization";

export default function Register() {
  const language = useLanguageContext();
  ld.setLanguage(language);
  return (
    <div className="log_box">
      <label className="log_text">{ld.formatString(ld.username)}</label>
      <br />
      <input className="log_input" id="username"></input>
      <br />
      <label className="log_text">{ld.formatString(ld.password)}</label>
      <br />
      <input className="log_input" id="password"></input>
      <br />
      <label className="log_text">{ld.formatString(ld.confirmPassword)}</label>
      <br />
      <input className="log_input" id="password"></input>
      <br />
      <button className="log_button">{ld.formatString(ld.register)}</button>
      <br />
    </div>
  );
}
