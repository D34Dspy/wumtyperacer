import { Link } from "react-router-dom";
import "./Menu.css";
import { slide as BurgerMenu } from "react-burger-menu";
import { LanguageDef as ld, Flags, useLanguageContext } from "../Localization";
import { useUserContext } from "../User";

type LanguageUpdate = (a: string) => void;
type MenuProps = {
  onLanguageChanged: LanguageUpdate;
};

function AccountOptions() {
  const user = useUserContext();
  if (!user.loggedIn) {
    return (
      <div>
        <Link id="login" className="bm-item menu-item" to="/login">
          {ld.formatString(ld.login)}
        </Link>
        <br />
        <Link id="register" className="bm-item menu-item" to="/register">
          {ld.formatString(ld.register)}
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <label className="bm-user">{user.userName}</label>
        <br />
        <Link id="logout" className="bm-item menu-item" to="/logout">
          {ld.formatString(ld.logout)}
        </Link>
      </div>
    );
  }
}

export function Menu(props: MenuProps) {
  const lang = useLanguageContext();

  ld.setLanguage(lang);

  return (
    <BurgerMenu>
      <AccountOptions />
      <Link id="dashboard" className="menu-item" to="/dashboard">
        {ld.formatString(ld.dashboard)}
      </Link>
      <Link id="about" className="menu-item" to="/about">
        {ld.formatString(ld.about)}
      </Link>
      {Flags.map((country) => {
        return (
          <img
            key={country.code}
            alt={country.code}
            src={country.flagFilename}
            onClick={(msg) => props.onLanguageChanged(country.code)}
            className="flag"
          />
        );
      })}
    </BurgerMenu>
  );
}
/*
export class Menu extends Component {
  constructor(props: MenuProps) {
    super(props);
  }
  render(): React.ReactNode {}
  updateLanguage(code: string): void {
    this.setState({
      ...this.state,
      language: code,
    });
    ld.setLanguage(code);
  }
}
*/
