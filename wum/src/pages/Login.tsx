import { useLanguageContext, LanguageDef as ld } from "../Localization";
import { Link } from "react-router-dom";
import { useState } from "react";

type LoginEvent = (userName: string, passWord: string) => void;
type LoginProps = {
  onLogin: LoginEvent;
};

export default function Login(props: LoginProps) {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const language = useLanguageContext();
  ld.setLanguage(language);
  return (
    <div>
      <label>{ld.formatString(ld.username)}</label>
      <br />
      <input
        id="username"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      ></input>
      <br />
      <label>{ld.formatString(ld.password)}</label>
      <br />
      <input
        id="password"
        onChange={(e) => setPassWord(e.target.value)}
        value={passWord}
      ></input>
      <br />
      <Link id="logout" to="/">
        <button onClick={() => props.onLogin(userName, passWord)}>
          {ld.formatString(ld.login)}
        </button>
      </Link>
      <br />
    </div>
  );
}
