import React, { useContext, useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import {Button, Dropdown} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faEnvelope as message} from "@fortawesome/free-regular-svg-icons";
import {avatar, forumDate} from "../utils/utils";
import Auth from "../utils/Auth";
import axios from "axios";
import MessageModal from "./MessageModal";

function Message(props) {

  let { messageId } = useParams();
  const [message, setMessage] = useState({});
  const [modal, setModal] = useState(false);

  const [authContext, setAuthContext] = useContext(Auth);

  useEffect(() => {
    axios.get("/api/forum/messages/" + messageId).then(response => {
      setMessage(response.data);
    });
    void axios.post("/api/forum/messages/read", { messages: messageId, read: true });
  }, [messageId]);

  function refresh() {
    props.history.push("/temp");
    props.history.goBack();
  }

  function unread() {
    void axios.post("/api/forum/messages/read", { messages: messageId, read: false });
  }

  return (
    <div className="forum">
      <div className="container">
        <div className="d-flex mt-4">
          <Button className="mr-1" variant="link" onClick={() => props.history.push("/forum/messages")}>Back to Inbox</Button>
          {authContext.isLoggedIn && message.sender === authContext.user.userName &&
            <span>
              <Button className="mr-1" variant="outline-primary" onClick={unread}>Mark as Unread</Button>
              <Button variant="outline-primary">Delete</Button>
              <Button className="ml-auto" onClick={() => setModal(true)}><FontAwesomeIcon icon={faEdit} /> Reply</Button>
            </span> 
          }
        </div>
        <div className="messages message">
          <div className="d-flex flex-row border-bottom pb-2 mb-1">
            <img className="avatar" src={avatar(message.icon)} alt=""/>
            <div>{message.sender}</div>
            <div className="ml-auto">{forumDate(message.timestamp)}</div>
          </div>
          <b>{message.subject}</b>
          <div>{message.message}</div>
        </div>
      </div>
      <MessageModal show={modal} handleClose={() => setModal(false)} refresh={refresh} recipient={message.sender} subject={(message.subject && message.subject.startsWith("re:")) ? message.subject : "re: " + message.subject} />
    </div>
  )
}

export default withRouter(Message);