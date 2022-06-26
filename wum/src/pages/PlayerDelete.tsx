import { useLanguageContext, LanguageDef as ld } from "../Localization";

export default function Delete() {
  const language = useLanguageContext();
  ld.setLanguage(language);
  return (
    <div>
      <label>{ld.formatString(ld.confirmDelete)}</label>
      <br />
      <button>{ld.formatString(ld.delete)}</button>
      <button>{ld.formatString(ld.cancel)}</button>
      <br />
    </div>
  );
}
