import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import remoatIsland from "../assets/images/maps/Remoat_Island.png";
import auromaPark from "../assets/images/maps/Auroma_Park.png";
import merStadium from "../assets/images/maps/Mer_Stadium.png";
import shivreCity from "../assets/images/maps/Shivre_City.png";

function Maps(props) {

  return (
    <div className="home">
      <div className="container">
        <Row className="justify-content-md-center">
          <Col md={3}>
            <div className="home-button" onClick={() => props.history.push("/maps/remoatIsland")} style={{ backgroundImage: `url(${remoatIsland})`, backgroundPosition: "center", backgroundSize: "auto 100%", marginBottom: "10px" }}>
              Remoat Island
            </div>
          </Col>
          <Col md={3}>
            <div className="home-button" onClick={() => props.history.push("/maps/auromaPark")} style={{ backgroundImage: `url(${auromaPark})`, backgroundPosition: "center", backgroundSize: "auto 100%", marginBottom: "10px" }}>
              Auroma Park
            </div>
          </Col>
          <Col md={3}>
            <div className="home-button" onClick={() => props.history.push("/maps/merStadium")} style={{ backgroundImage: `url(${merStadium})`, backgroundPosition: "center", backgroundSize: "auto 100%", marginBottom: "10px" }}>
              Mer Stadium
            </div>
          </Col>
          <Col md={3}>
            <div className="home-button" onClick={() => props.history.push("/maps/shivreCity")} style={{ backgroundImage: `url(${shivreCity})`, backgroundPosition: "center", backgroundSize: "auto 100%", marginBottom: "10px" }}>
              Shivre City
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default withRouter(Maps);