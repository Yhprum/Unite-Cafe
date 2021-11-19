import React from "react";
import { useParams } from "react-router-dom"
import items from "../data/items";
import {statAbbreviation} from "../utils/utils";
import NotFound from "./NotFound";

function BattleItem() {
  let { name } = useParams();

  let item = items.find(item => item.name === name);
  if (!item) return <NotFound />;
  let imgPath = `${process.env.PUBLIC_URL}/img/${item.category}/${item.name.toLowerCase().replace(/[^\w]/g, "")}.png`;
  return (
    <div className="home">
      <div className="container">
        <div className="battle-item">
          <img src={imgPath} alt={item.name} />
          <div className="item-description">
            <div className="name">
              {item.name}
            </div>
            <div className="cooldown">
              <img src={process.env.PUBLIC_URL + "/img/cooldown.png"} alt="" className="skill-label" />
              {item.cooldown} {item.cooldown && "seconds"}
            </div>
            <p>{item.effect}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattleItem;