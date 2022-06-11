import { useLanguageContext, LanguageDef as ld } from "../Localization";
import { Link } from "react-router-dom";

type LogoutEvent = () => void;
type LogoutProps = {
  onLogout: LogoutEvent;
};

export default function Logout(props: LogoutProps) {
  const language = useLanguageContext();
  ld.setLanguage(language);
  return (
    <div>
      <label>{ld.formatString(ld.confirmLogout)}</label>
      <br />
      <Link id="logout" to="/">
        <button onClick={() => props.onLogout()}>
          {ld.formatString(ld.logout)}
        </button>
      </Link>
      <br />
    </div>
  );
}
