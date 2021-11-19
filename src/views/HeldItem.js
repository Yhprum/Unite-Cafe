import React from "react";
import { useParams } from "react-router-dom"
import Tooltip from "../components/Tooltip";
import items from "../data/items";
import {statAbbreviation} from "../utils/utils";
import NotFound from "./NotFound";

function HeldItem() {
  let { name } = useParams();

  let item = items.find(item => item.name === name);
  if (!item) return <NotFound />;
  let imgPath = `${process.env.PUBLIC_URL}/img/${item.category}/${item.name.toLowerCase().replace(/[^\w]/g, "")}.png`;
  return (
    <div className="home">
      <div className="container">
        <div className="held-item">
          <img src={imgPath} alt={item.name} />
          <div className="item-description">
            <div className="name">
              {item.name}
            </div>
            <p>{Object.keys(item.stats).map(stat => <React.Fragment key={stat}>{statAbbreviation(stat)} +{item.stats[stat]}<br/></React.Fragment>)}</p>
            <p>{item.effect}</p>
            {item.boost && <b><Tooltip text={item.boost} type="at item level 0 / 10 / 20"/></b>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeldItem;