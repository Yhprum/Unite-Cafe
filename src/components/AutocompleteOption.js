import React from "react";
import { pathName } from "../utils/utils";

function AutocompleteOption(props) {

  let path = pathName(props.item.name);
  let imagePath = path;
  if (props.item.category === "pokemon") {
    imagePath = imagePath + "_square";
  }

  let urlPath = props.item.category === "pokemon" ? path : props.item.name;

  return (
    <li className="autocomplete-option" onClick={() => props.navigate(props.item.category, urlPath)}>
      <img className="portrait portrait-small" src={process.env.PUBLIC_URL + `/img/${props.item.category}/${imagePath}.png`}  alt={props.item.name}/>
      {" "}
      {props.item.name}
    </li>
  )
}

export default AutocompleteOption;