import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import "react-mde/lib/styles/css/react-mde-all.css";
import MarkdownEditor from "../components/MarkdownEditor";

function ReplyBox(props) {

  return (
    <div className="post">
      <div className="post-user">
        <img className="avatar" src={process.env.PUBLIC_URL + `/img/pokemon/substitute.png`} alt=""/>
      </div>
      <div className="post-content">
        <MarkdownEditor
          value={props.reply}
          setValue={props.setReply}
        />
        <Button className="post-button" size="sm" onClick={props.postReply}>Post</Button>
      </div>
    </div>
  )
}

export default withRouter(ReplyBox);