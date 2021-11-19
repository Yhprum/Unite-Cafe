import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Auth from "./utils/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Routes from "./Routes";
import Header from "./views/Header";
import axios from "axios";

function App() {
  const [authContext, setAuthContext] = useState({ isLoggedIn: false });

  useEffect(() => {
    if (!authContext.isLoggedIn) {
      axios.post("/api/user/tokenLogin", undefined, { withCredentials: true }).then(response => {
        if (response.data.auth) {
          setAuthContext({ isLoggedIn: true, user: response.data.user })
        }
      });
    }
  }, [authContext]);

  return (
    <div className="App">
      <Auth.Provider value={[authContext, setAuthContext]}>
        <Router>
          <Header />
          <Routes />
        </Router>
      </Auth.Provider>
    </div>
  );
}

export default App;
