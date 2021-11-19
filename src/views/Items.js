import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import items from "../data/items";

function Items(props) {
  return (
    <div className="home">
      <div className="container">
        <Tabs variant="pills" defaultActiveKey="heldItems" id="items-tabs">
          <Tab title="Held Items" eventKey="heldItems">
            <Row className="justify-content-md-center">
              {items.filter(item => item.category === "held item").map(item => {
                let imgPath = `${process.env.PUBLIC_URL}/img/${item.category}/${item.name.toLowerCase().replace(/[^\w]/g, "")}.png`;
                return (
                  <Col lg={2} md={3} sm={4} xs={6} key={item.name}>
                    <div className="panel" onClick={() => props.history.push(`/${item.category}/${item.name}`)}>
                      <img className="panel-top" src={imgPath} alt="" />
                      <div className="panel-bottom" style={{ marginBottom: "10px" }}>
                        <b>{item.name}</b>
                        <br/>
                        <small>
                          {Object.keys(item.stats).map(stat => `+${stat} `)}
                        </small>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Tab>
          <Tab title="Battle Items" eventKey="battleItems">
            <Row className="justify-content-md-center">
              {items.filter(item => item.category === "battle item").map(item => {
                let imgPath = `${process.env.PUBLIC_URL}/img/${item.category}/${item.name.toLowerCase().replace(/[^\w]/g, "")}.png`;
                return (
                  <Col lg={2} md={3} sm={4} xs={6} key={item.name}>
                    <div className="panel" onClick={() => props.history.push(`/${item.category}/${item.name}`)}>
                      <img className="panel-top" src={imgPath} alt="" />
                      <div className="panel-bottom" style={{ marginBottom: "10px" }}>
                        {item.name}
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default withRouter(Items);