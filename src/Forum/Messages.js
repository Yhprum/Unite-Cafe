import React, { useContext, useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faEnvelope as message} from "@fortawesome/free-regular-svg-icons";
import {avatar, forumDate} from "../utils/utils";
import Auth from "../utils/Auth";
import axios from "axios";
import MessageModal from "./MessageModal";
import EditProfileModal from "./EditProfileModal";

function Messages(props) {

  let { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [checks, setChecks] = useState([]);
  const [modal, setModal] = useState(false);
  const [folder, setFolder] = useState("inbox");

  useEffect(() => {
    axios.get(`/api/forum/messages?folder=${folder}`).then(response => {
      setMessages(response.data);
    });
  }, [folder]);

  function toggleCheck(checked, id) {
    if (checked) {
      setChecks(a => [...a, id]);
    } else {
      setChecks(a => a.filter(item => item !== id));
    }
  }

  function deleteMessages() {
    axios.post("/api/forum/messages/delete", { messages: checks }).then(() => {
      setChecks([]);
      refresh();
    });
  }

  function markAsRead() {
    axios.post("/api/forum/messages/read", { messages: checks, read: true }).then(() => {
      setChecks([]);
      refresh();
    });
  }

  function refresh() {
    props.history.push("/temp");
    props.history.goBack();
  }

  return (
    <div className="forum">
      <div className="container">
        <div className="folders mt-4">
          <Button variant={folder === "inbox" ? "primary" : "outline-primary"} className="mr-1" onClick={() => setFolder("inbox")}>Inbox</Button>
          <Button variant={folder === "outbox" ? "primary" : "outline-primary"} onClick={() => setFolder("outbox")}>Outbox</Button>
        </div>

        {folder === "inbox" &&
          <div className="d-flex mt-1">
            <Button className="mr-1" variant="outline-primary" onClick={() => markAsRead()}>Mark as Read</Button>
            <Button variant="outline-primary" onClick={() => deleteMessages()}>Delete</Button>
            <Button className="ml-auto" onClick={() => setModal(true)}><FontAwesomeIcon icon={faEdit} /> New Message</Button>
          </div>
        }

        <div className="messages">
          {messages.map(message => {
            return (
              <div className="message" key={message.timestamp}>
                {folder === "inbox" && 
                  <input className="align-self-center mr-1" type="checkbox" onChange={e => toggleCheck(e.target.checked, message.id)}/>
                }
                <img className="avatar" src={avatar(message.icon)} alt=""/>
                <div className={"message-sender clickable" + (!message.read ? " font-weight-bold" : "")} onClick={() => props.history.push("/forum/messages/" + message.id)}>
                  {message.sender && "From: " + message.sender}
                  {message.recipient && "To: " + message.recipient}
                </div>
                <div onClick={() => props.history.push("/forum/messages/" + message.id)}>{message.subject}</div>
                <small className="ml-auto">{forumDate(message.timestamp)}</small>
              </div>
            )
          })}
        </div>
      </div>
      <MessageModal show={modal} handleClose={() => setModal(false)} refresh={refresh} />
    </div>
  )
}

export default withRouter(Messages);