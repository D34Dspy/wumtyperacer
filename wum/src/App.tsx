import React from 'react';
import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import logo from "./assets/logo.svg";
import "./assets/App.css";
import { Menu as BurgerMenu } from "./components/Menu";
import Login from "./pages/PlayerCreate";
import Register from "./pages/PlayerDelete";
import About from "./pages/About";

import { LanguageContext } from "./Localization";
import { UserContext, Guest } from "./User";

function ReactExample() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}

type ThemeConfig = {
  name: string;
  value: string;
}
let Themes: { [key: string]: ThemeConfig []} = {};

Themes['light'] = [ { name: '--main-color', value: '#cccccc' },
                    { name: '--fore-color', value: '#262626'} ];
Themes['dark'] = [ { name: '--main-color', value: '#262626' },
                   { name: '--fore-color', value: '#cccccc'} ];

function App() {
  const [language, setLanguage] = useState("en");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(Guest);
  const [theme, setTheme] = useState('dark');

  const setThemeHook = (name: string) => {
    for (const value of Themes[name])
      document.documentElement.style.setProperty(value.name, value.value);
    setTheme(name);
  };

  const handleLogin = (userName: string, passWord: string) => {
    setUser({ userName: userName, loggedIn: true });
    console.log(userName);
    console.log(passWord);
  };

  const handleLogout = () => {
    setUser(Guest);
  };

  return (
    <LanguageContext.Provider value={language}>
      <UserContext.Provider value={user}>
        <div className="App">
          <HashRouter>
            <BurgerMenu 
              onLanguageChanged={(code) => setLanguage(code)} 
              onThemeChanged={setThemeHook} />
            <br/>
            <Routes>
              <Route path="/playerCreate" element={<Login onLogin={handleLogin} />} />
              <Route path="/delete" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/logout"
              />
              <Route path="/" element={<ReactExample />}></Route>
            </Routes>
          </HashRouter>
        </div>
      </UserContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
