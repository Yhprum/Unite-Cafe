import React from "react";
import { withRouter } from "react-router-dom";
import { forumDate } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faLock } from "@fortawesome/free-solid-svg-icons";

function ThreadPreview(props) {

  return (
    <div className="thread-preview">
      <div className="thread-image">
        <img className="avatar" src={process.env.PUBLIC_URL + `/img/pokemon/substitute.png`} alt=""/>
      </div>
      <div className="post-content">
        <div>
          <span className="thread-title" onClick={() => props.history.push("/forum/threads/" + props.id)}>
            {props.title}
          </span>
        </div>
        <small>
          <span className="clickable" onClick={() => props.history.push("/forum/users/" + props.username)}>{props.username}</span> {forumDate(props.timestamp)}
        </small>
      </div>
      <div className="thread-details icons">
        <div style={{ color: "gray" }}>
          {props.locked && <FontAwesomeIcon icon={faLock} className="va-middle" />}
          {" "}
          {props.pinned && <FontAwesomeIcon icon={faThumbtack} className="va-middle" />}
        </div>
      </div>
      <div className="thread-details replies">
        <div style={{ color: "gray" }}>
          Replies: {props.count - 1}
        </div>
      </div>
      <div className="thread-details">
        <div className="clickable" onClick={() => props.history.push("/forum/users/" + props.lastuser)}>
          {props.lastuser}
        </div>
        <small>
          {forumDate(props.lastpost)}
        </small>
      </div>
    </div>
  )
}

export default withRouter(ThreadPreview);