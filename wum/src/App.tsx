import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Menu as BurgerMenu } from "./components/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Logout from "./pages/Logout";
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

function App() {
  const [language, setLanguage] = useState("en");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(Guest);

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
            <BurgerMenu onLanguageChanged={(code) => setLanguage(code)} />
            <br></br>
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/logout"
                element={<Logout onLogout={handleLogout} />}
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
