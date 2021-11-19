import React, {useState} from "react";
import Tooltip from "./Tooltip";
import JsxParser from "react-jsx-parser";
import {pathName} from "../utils/utils";
import Modal from "react-bootstrap/Modal";

function Attack(props) {

  let [showPreview, setShowPreview] = useState(false);

  let movePath = "t_" + props.pokemon;
  if (props.type === "passive") {
    movePath += "P1";
  } else if (props.type === "basic attack") {
    movePath = "basic_attack";
  } else if (props.type === "unite") {
    movePath += "G1";
  } else if (props.upgrade) {
    movePath += "S" + props.index + props.upgrade;
  } else {
    movePath += "S" + props.index;
  }

  let movePreviewPath = "t_skill_" + props.pokemon + (props.type === "unite" ? 4 : props.index) + (props.upgrade || 0);

  function parseText(text) {
    let textRegex = /{{([^}]*)}}/g;
    text = text.replace(textRegex, function(_, match) {
      let arr = match.split("|");
      return `<Tooltip text="${arr[0]}" type="${arr[1]}" />`;
    });

    return (
      <React.Fragment>
        <JsxParser jsx={text} components={{ Tooltip }}/>
      </React.Fragment>
    )
  }

  return (
    <div className={props.upgrade ? "attack " + props.type + "-" + props.upgrade : "attack " + props.type}>
      {props.type !== "passive" && props.type !== "basic attack" &&
      <Modal show={showPreview} onHide={() => setShowPreview(false)} centered>
        <img src={process.env.PUBLIC_URL + `/img/ability_preview/${movePreviewPath}.png`} alt="Preview Not found :("/>
      </Modal>
      }
      <table>
        <tbody>
          <tr>
            <td>
              <b>{props.move.name}</b>
            </td>
            <td className="move-spacer"/>
            <td className={props.move.cooldown ? "cooldown" : ""}>
              {props.move.cooldown && <img src={process.env.PUBLIC_URL + "/img/cooldown.png"} alt="" className="skill-label" />} {props.move.cooldown} {props.move.cooldown && "seconds"}
            </td>
            <td className="move-spacer"/>
            <td className={props.move.category ? "move-type " + props.move.category.toLowerCase().replace(" ", "-") : ""}>
              {props.move.category && <img src={process.env.PUBLIC_URL + `/img/skill label/t_Skill_Label_${pathName(props.move.category)}.png`} alt="" className="skill-label" />}
              {" "}
              {props.move.category}
            </td>
            <td className="move-spacer"/>
            {props.type !== "passive" && props.type !== "basic attack" &&
            <td onClick={() => setShowPreview(true)}>
              <small className="preview-text">Click to show preview</small>
            </td>
            }
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td className="move-cell">
              <img src={process.env.PUBLIC_URL + `/img/attacks/${movePath}.png`} alt="" className="move-icon"/>
            </td>
            <td className="move-text">
              {parseText(props.move.description)}
              {props.move.upgradeLevel &&
                <React.Fragment>
                  <br/>
                  <div className="upgrade-level">
                    <b>
                      Upgrades at Level {props.move.upgradeLevel}
                    </b>
                  </div>
                </React.Fragment>
              }
              {props.move.level &&
              <React.Fragment>
                <br/>
                <div className="upgrade-level">
                  <b>
                    Unlocks at Level {props.move.level}
                  </b>
                </div>
              </React.Fragment>
              }
            </td>
          </tr>
          {props.move.upgrade &&
          <tr className="upgrade">
            <td/>
            <td className="move-text" style={{borderTop: "1px solid lightgrey"}}>
              Level {props.move.upgrade.level}
              {": "}
              {parseText(props.move.upgrade.description)}
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  );
}

export default Attack;