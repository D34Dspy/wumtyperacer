import React from 'react';
import { useLanguageContext, LanguageDef as ld, localizeId } from "../core/Localization";
import { Requirements, RequirementsOk, checkRequirements } from "../core/User";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../assets/PlayerCreate.css'
import '../assets/log.css'

type RegisterEvent = (userName: string, passWord: string) => void;
type RegisterProps = {
  onRegister: RegisterEvent;
};

type RequireProps = {
  requirements: Requirements,
};

export default function Register(props: RegisterProps) {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [requirements, setRequirements] = useState(RequirementsOk)
  const language = useLanguageContext();
  let navigate = useNavigate();
  ld.setLanguage(language);

  const registerHook = (username: string, password: string) => {
    console.log("hook started")
    const newRequirements = checkRequirements(username, password);
    if(newRequirements.valid) {
      console.log("requirements valid")
      props.onRegister(username, password);
      navigate('/about');
    }
    else {
      console.log("requirements invalid")
      setRequirements(newRequirements);
      console.log(newRequirements);
    }
  };
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
      <label className="log_text">{ld.formatString(ld.repeatPassword)}</label>
      <br />
      <input className="log_input"
        id="password2"

      ></input>
      <br />
      <button className="log_button" onClick={() => registerHook(userName, passWord)}>
        {ld.formatString(ld.register)}
      </button>
      <br />
      <div>
        { requirements.username.map((msg: string, i) => (<label key={i} className="log_error">{localizeId(language, msg)}<br/></label>)) }
        { requirements.password.map((msg: string, i) => (<label key={i} className="log_error">{localizeId(language, msg)}<br/></label>)) }
      </div>
    </div>
  );
}
