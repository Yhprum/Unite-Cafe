import React from "react";
import construction from "../assets/images/construction.png";

function notFound() {

  return (
    <div className="home">
      <div className="container container-small text-center">
        <img src={construction} style={{ width: "100%" }}/>
        This page is still in development
      </div>
    </div>
  )
}

export default notFound;