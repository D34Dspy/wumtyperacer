import React from 'react';
import { useLanguageContext, LanguageDef as ld } from "../Localization";
import { Link } from "react-router-dom";
import { useState } from "react";
import '../assets/PlayerCreate.css'
import '../assets/log.css'

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
    <div className="log_box">
      <label className="log_text">{ld.formatString(ld.username)}</label>
      <br />
      <input className="log_input"
        id="username"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      ></input>
      <br />
      <label className="log_text">{ld.formatString(ld.password)}</label>
      <br />
      <input className="log_input"
        id="password"
        onChange={(e) => setPassWord(e.target.value)}
        value={passWord}
      ></input>
      <br />
      <Link  id="logout" to="/">
        <button className="log_button" onClick={() => props.onLogin(userName, passWord)}>
          {ld.formatString(ld.login)}
        </button>
      </Link>
      <br />
    </div>
  );
}
