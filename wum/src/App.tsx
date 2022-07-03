import React, { useState, useContext } from 'react'
import { HashRouter, Route, Routes } from "react-router-dom";
import "./assets/App.css";
import { Menu as BurgerMenu } from "./components/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import { LanguageContext } from "./core/Localization";
import { UserContext, Guest } from "./core/User";
import { Themes } from './core/Theme';
import Cfg from './core/Config';

function App() {
  const [language, setLanguage] = useState("en");
  const [user, setUser] = useState(Guest);
  const [theme, setTheme] = useState('dark');

  const setThemeHook = (name: string) => {
    for (const value of Themes[name])
      document.documentElement.style.setProperty(value.name, value.value);
    setTheme(name);
  };

  const handleLogin = (userName: string, passWord: string) => {
    //const userId = 0;
    //setUser({ userId: userId, userName: userName, loggedIn: true });
    console.log(userName);
    console.log(passWord);
  };

  const handleRegister = (userName: string, passWord: string) => {
    Cfg.post('/players/', { name: userName }, 
    (response) => setUser({userId: response.id, userName: response.name, loggedIn: true}),
    (response) => {
      console.log(response)
      throw "unable to register";
    });
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
              onThemeChanged={setThemeHook}
               />
            <br />
            <Routes>
              
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register onRegister={handleRegister} />} />
              <Route path="/leaderboards" element={<Leaderboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/logout" element={<Logout onLogout={handleLogout} onCancel={() => { }} />} />
            </Routes>
          </HashRouter>
        </div>
      </UserContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
