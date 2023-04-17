import "./App.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./components/Register";
import UserContext from "./context/UserContext";
import axios from "axios";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/user", { withCredentials: true })
      .then((response) => {
        setEmail(response.data.email);
      });
  }, []);

  const logout = () => {
    axios
      .post("http://localhost:4000/logout", {}, { withCredentials: true })
      .then(() => setEmail(""));
  };

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <BrowserRouter>
        <nav>
          {email && <Link to={"/"}>Home</Link>}
          {!email && (
            <>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
            </>
          )}
          {email && (
            <a
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Logout
            </a>
          )}
        </nav>
        <main>
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/register"} element={<Register />} />
            <Route exact path={"/login"} element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
