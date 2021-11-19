import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import searchData from "../data/search.json";
import itemData from "../data/items.json";
import AutocompleteOption from "../components/AutocompleteOption";
import { Row, Col } from "react-bootstrap";
import pokemon from "../assets/images/talonflame_swag.png";
import items from "../assets/images/box.png";
import maps from "../assets/images/maps/Remoat_Island.png";

function Home(props) {

  const [searchResults, setSearchResults] = useState({});

  function search(e) {
    let search = e.target.value.trim();
    if (search) {
      let searchRegex = new RegExp("(^| )" + e.target.value, "i");
      let pokemon = searchData.filter(item => searchRegex.test(item.name));
      let items = itemData.filter(item => searchRegex.test(item.name));

      setSearchResults({
        "Pokemon": pokemon.sort(),
        "Items": items.sort()
      });
    } else {
      setSearchResults([]);
    }
  }

  function navigate(path, name) {
    props.history.push("/" + path + "/" + name);
  }

  return (
    <div className="home">
      <div className="container container-small">
        <Row className="justify-content-md-center">
          <Col md={4}>
            <div className="home-button" onClick={() => props.history.push("/pokemon")} style={{ backgroundImage: `url(${pokemon})`, backgroundPosition: "center", backgroundSize: "100% auto", marginBottom: "10px" }}>
              Pokemon
            </div>
          </Col>
          <Col md={4}>
            <div className="home-button" onClick={() => props.history.push("/items")} style={{ backgroundImage: `url(${items})`, backgroundPosition: "center", backgroundSize: "auto 100%", backgroundRepeat: "no-repeat", marginBottom: "10px" }}>
              Items
            </div>
          </Col>
          <Col md={4}>
            <div className="home-button" onClick={() => props.history.push("/maps")} style={{ backgroundImage: `url(${maps})`, backgroundPosition: "center", backgroundSize: "auto 100%", marginBottom: "10px" }}>
              Maps
            </div>
          </Col>
        </Row>
        <div className="autocomplete">
          <input placeholder="Search for Pokemon" onChange={e => search(e)} />
          {
            Object.keys(searchResults).length > 0 &&
            <div className="autocomplete-menu">
              <ul>
                {
                  Object.keys(searchResults).map(category => {
                    return searchResults[category].length > 0 && (
                      <React.Fragment key={category}>
                        <li>{category}</li>
                        {searchResults[category].map(item => <AutocompleteOption key={item.name} item={item} navigate={navigate} />)}
                      </React.Fragment>
                    );
                  })
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default withRouter(Home);