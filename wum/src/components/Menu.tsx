import React from 'react';
import { Link } from "react-router-dom";
import "../assets/Menu.css";
import { slide as BurgerMenu } from "react-burger-menu";
import { LanguageDef as ld, Flags, useLanguageContext } from "../core/Localization";
import { useUserContext } from "../core/User";

type LanguageUpdate = (a: string) => void;
type ThemeUpdate = (a: string) => void;
type MenuProps = {
  onLanguageChanged: LanguageUpdate;
  onThemeChanged: ThemeUpdate;
};

function AccountOptions() {
  const user = useUserContext();
  if (!user.loggedIn) {
    return (
      <div>
        <Link id="dashboard" className="bm-item menu-item" to="/">
          {ld.formatString(ld.home)}
        </Link>
        <br />
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
        <Link id="dashboard" className="bm-item menu-item" to="/">
          {ld.formatString(ld.dashboard)}
        </Link>
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
      <Link className="menu-item" to="/leaderboards">
        {ld.formatString(ld.leaderboards)}
      </Link>
      <Link id="about" className="menu-item" to="/about">
        {ld.formatString(ld.about)}
      </Link>


      <div className="bm-bottompane">
        <button className="bm-light" onClick={(e) => props.onThemeChanged('light')}>light</button>
        <button className="bm-dark" onClick={(e) => props.onThemeChanged('dark')}>dark</button>
        <br ></br>
        {Flags.map((country) => {
          return (
            <button key={country.code} className="bm-flag"><img
              alt={country.code}
              src={country.flagFilename}
              onClick={() => props.onLanguageChanged(country.code)}
              className="flag"
            /></button>
          );
        })}</div>
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
