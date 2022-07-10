import React from 'react';
import { useLanguageContext, LanguageDef as ld, localizeId } from "../core/Localization";
import { Requirements, RequirementsOk, checkRequirements } from "../core/User";
import useDoOnce from "../core/DoOnce";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../assets/PlayerCreate.css'
import '../assets/log.css'

type RegisterEvent = (userName: string, passWord: string) => boolean;
type RegisterProps = {
  onRegister: RegisterEvent;
};

type RegisterForm = {
  userName: string,
  passWord: string,
};

export default function Register(props: RegisterProps) {
  let navigate = useNavigate();

  const language = useLanguageContext();
  ld.setLanguage(language);

  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [requirements, setRequirements] = useState(RequirementsOk)
  const invokeOnRegister = useDoOnce((form: RegisterForm) => {
    if(props.onRegister(form.userName, form.passWord))
    {
      navigate('/about');
      return true;
    }
    return false;
  });

  const registerHook = (username: string, password: string) => {
    console.log("hook started")
    const newRequirements = checkRequirements(username, password);
    if(newRequirements.valid) {
      console.log("requirements valid")
      invokeOnRegister({ userName: username, passWord: password }); // api does not get sent twice, waits for the server
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
