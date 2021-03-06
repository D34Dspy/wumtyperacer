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
type AccountProps={
  /*
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  const handleStateChange = (state: { isOpen: boolean | ((prevState: boolean) => boolean); }) => {
    setIsMenuOpen(state.isOpen);
  };*/
  onClose:()=> void;
  };

function AccountOptions(props:AccountProps) {
  
  const user = useUserContext();

  if (!user.loggedIn) {
    return (
      <div>
        <Link onClick={() => props.onClose()} id="dashboard" className="bm-item menu-item" to="/">
          {ld.formatString(ld.home)}
        </Link>
        <br />
        <Link onClick={() => props.onClose()} id="login" className="bm-item menu-item" to="/login">
          {ld.formatString(ld.login)}
        </Link>
        <br />
        <Link onClick={() => props.onClose()} id="register" className="bm-item menu-item" to="/register">
          {ld.formatString(ld.register)}
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <label className="bm-user">{user.userName}</label>
        <br />
        <Link onClick={() => props.onClose()} id="dashboard" className="bm-item menu-item" to="/">
          {ld.formatString(ld.dashboard)}
        </Link>
        <br />
        <Link onClick={() => props.onClose()} id="logout" className="bm-item menu-item" to="/logout">
          {ld.formatString(ld.logout)}
        </Link>
      </div>
    );
  }
}

export function Menu(props: MenuProps) {
  const lang = useLanguageContext();

  ld.setLanguage(lang);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  const handleStateChange = (state: { isOpen: boolean | ((prevState: boolean) => boolean); }) => {
    setIsMenuOpen(state.isOpen);
  };
  return (
    <BurgerMenu
    isOpen={isMenuOpen}
    onStateChange={handleStateChange}> 
      <AccountOptions onClose={handleCloseMenu} />
      <Link onClick={() => handleCloseMenu()} className="menu-item" to="/leaderboards">
        {ld.formatString(ld.leaderboards)}
      </Link>
      <Link onClick={() => handleCloseMenu()} className="menu-item" to="/games">
        {ld.formatString(ld.games)}
      </Link>
      <Link onClick={() => handleCloseMenu()} id="about" className="menu-item" to="/about">
        {ld.formatString(ld.about)}
      </Link>


      <div className="bm-bottompane">
        <button id="light" className="bm-light" onClick={(e) => props.onThemeChanged('light')}>{ld.formatString(ld.light)}</button>
        <button id="dark" className="bm-dark"  onClick={(e) => props.onThemeChanged('dark')}>{ld.formatString(ld.dark)}</button>
        
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
