import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import logo from "../assets/images/branding/logo.png"
import { Navbar, Nav, Dropdown, DropdownButton, Container } from "react-bootstrap"
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope as message } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as noMessage } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import Auth from "../utils/Auth";
import axios from "axios";
import { avatar, forumDate } from "../utils/utils";

function ForumHeader(props) {
  const [authContext, setAuthContext] = useContext(Auth);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!authContext.isLoggedIn) return;
    axios.get("/api/forum/messages").then(response => {
      setMessages(response.data.filter(message => !message.read));
    });
    axios.get("/api/forum/notifications").then(response => {
      setNotifications(response.data.filter(message => !message.read));
    });
  }, [authContext.isLoggedIn]);

  function logout() {
    axios.post("/api/user/logout", undefined, { withCredentials: true }).then(() => {
      setAuthContext({ isLoggedIn: false });
      window.location.reload();
    });
  }

  function clickNotification(threadId) {
    void axios.post(`/api/forum/notifications/${threadId}/read`);
  }

  const bell = <FontAwesomeIcon icon={faBell} style={{ verticalAlign: "bottom" }} />;
  const envelope = <FontAwesomeIcon icon={messages.length > 0 ? message : noMessage} style={{ verticalAlign: "bottom" }} />;

  return (
    <Navbar className="forum-navbar" collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/forum">
          <img alt="unite" src={logo} className="d-inline-block align-top forum-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="mt-auto">
          <Nav className="mr-auto">
            <LinkContainer to="/pokemon">
              <Nav.Link>Pokemon Data</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/forum">
              <Nav.Link>Forum</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {authContext.isLoggedIn ?
              <React.Fragment>
                <DropdownButton className={"no-arrow" + (notifications.length > 0 ? " notification" : "")} menuAlign="right" variant="p" title={bell}>
                  {notifications.length > 0 ? notifications.map(notification =>
                      <Dropdown.Item key={notification.threadid} onClick={() => clickNotification(notification.threadid)} href={"/forum/threads/" + notification.threadid}>
                        {"New replies: " + notification.title}
                        <br/>
                        <small>{forumDate(notification.timestamp)}</small>
                      </Dropdown.Item>
                    ) :
                    <Dropdown.ItemText><small>No notifications</small></Dropdown.ItemText>
                  }
                </DropdownButton>
                <DropdownButton className={"message-dropdown no-arrow" + (messages.length > 0 ? " notification" : "")} menuAlign="right" variant="p" title={envelope}>
                  {messages.length > 0 ? messages.map(message =>
                      <Dropdown.Item className="message" key={message.id} onClick={() => props.history.push("/forum/messages/" + message.id)}>
                        <img className="avatar" src={avatar(message.icon)} alt=""/>
                        {"Message from  " + message.sender}
                      </Dropdown.Item>
                    ) :
                    <Dropdown.ItemText><small>No Unread Messages</small></Dropdown.ItemText>
                  }
                  <Dropdown.ItemText className="clickable" onClick={() => props.history.push("/forum/messages")}><small>Show all...</small></Dropdown.ItemText>
                </DropdownButton>
                <DropdownButton menuAlign="right" variant="p" title={authContext.user.username}>
                  <Dropdown.Item eventKey="1" onClick={() => props.history.push("/forum/users/" + authContext.user.username)}>Profile</Dropdown.Item>
                  {/*<Dropdown.Item eventKey="2">Another action</Dropdown.Item>*/}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </DropdownButton>
              </React.Fragment>
              :
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default withRouter(ForumHeader);