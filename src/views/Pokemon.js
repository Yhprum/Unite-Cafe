import React from "react";
import { useParams } from "react-router-dom"
import Attack from "../components/Attack";
import { Container, Row, Col } from "react-bootstrap";
import { onImgError, pathName } from "../utils/utils";

function Pokemon() {
  let { name } = useParams();
  // If pokemon is known, show page, otherwise 404
  let pokemon = require(`../data/pokemon/${name}.json`);

  return (
    <div className="home">
      <Container className="pokemon">
        <div className="details">
          <div style={{ marginRight: "10px", float: "left"}}>
            <img className="" src={process.env.PUBLIC_URL + `/img/pokemon/${pathName(name)}_square.png`} alt={name} onError={e => onImgError(e)}/>
          </div>
          <Row>
            <Col xs={3}>
              <Row className="name">
                {pokemon.name}
              </Row>
              <Row className="pokemon-info">
                {pokemon.range}
              </Row>
              <Row className="pokemon-info">
                {pokemon.role}
              </Row>
              <Row className="pokemon-info">
                {pokemon.difficulty}
              </Row>
            </Col>
            <Col>
              <Row className="stats">
                <Col><div className="stat">Offense<br/>{pokemon.stats.combat}</div></Col>
                <Col><div className="stat">Endurance<br/>{pokemon.stats.resistance}</div></Col>
                <Col><div className="stat">Mobility<br/>{pokemon.stats.mobility}</div></Col>
                <Col><div className="stat">Scoring<br/>{pokemon.stats.scoring}</div></Col>
                <Col><div className="stat">Support<br/>{pokemon.stats.assistance}</div></Col>
                <Col><div className="stat">Total<br/>{pokemon.stats.total}</div></Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="attacks">
          <Attack move={pokemon.passive} pokemon={pokemon.number} type="passive" />
          <Attack move={pokemon["basic attack"]} pokemon={pokemon.number} type="basic attack" />
          <h3>Move 1:</h3>
          <div className="grid-container">
            <Attack move={pokemon.moves["1"].base} pokemon={pokemon.number} index={1} type="base" />
            {pokemon.moves["1"].upgrades.map((move, i) => <Attack move={move} pokemon={pokemon.number} key={move.name} index={1} type="upgrade" upgrade={i + 1} />)}
          </div>
          <h3>Move 2:</h3>
          <div className="grid-container">
            <Attack move={pokemon.moves["2"].base} pokemon={pokemon.number} index={2} type="base" />
            {pokemon.moves["2"].upgrades.map((move, i) => <Attack move={move} pokemon={pokemon.number} key={move.name} index={2} type="upgrade" upgrade={i + 1} />)}
          </div>
          <h3>Unite Move:</h3>
          <Attack move={pokemon.moves.unite} pokemon={pokemon.number} index={"unite"} type="unite" />
        </div>
      </Container>
    </div>
  )
}

export default Pokemon;