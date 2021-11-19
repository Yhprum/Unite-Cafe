import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./assets/css/forum.css";
import logo from "./assets/images/branding/logo.png";

function App() {

  return (
    <div className="App forum">
      <div className="container container-small">
        <img src={logo} alt="Unite Cafe" style={{"height":"250px"}}/>
        <br/>
        Unite Cafe is no longer being maintained. Thank you all for joining and participating in this community during the time it was here.
        <br/>
        For Pokemon stats and movesets, please visit <a href="https://www.unite-db.com">Unite-DB</a> - their site has detailed numbers, movesets, and more.
        <br/>
        For Pokemon unite discussion, consider checking out the <a href="https://reddit.com/r/pokemonunite">Pokemon Unite Subreddit</a>.
        <br/>
        <br/>
        <small>© unite-cafe.com 2021 <a href="https://github.com/Yhprum/Unite-Cafe">View Source Code</a>  <a href="mailto:unite.forums@gmail.com">Contact me</a></small>
      </div>
    </div>
  );
}

export default App;
