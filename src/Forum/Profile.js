import React, { useContext, useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import { Button, Nav, Tab } from "react-bootstrap";
import "../assets/css/forum.css";
import { forumDate, avatar } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Auth from "../utils/Auth";
import axios from "axios";
import ProfileBadge from "./ProfileBadge";
import EditProfileModal from "./EditProfileModal";
import trophyData from "../data/trophies.json";
import MessageModal from "./MessageModal";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "../components/MarkdownEditor";

function Profile(props) {

  let { username } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState("");
  const [signature, setSignature] = useState("");
  const [editSignature, setEditSignature] = useState(false);
  const [authContext, setAuthContext] = useContext(Auth);

  useEffect(() => {
    axios.get("/api/forum/users/" + username).then(response => {
      setUser(response.data);
      setSignature(response.data.signature);
    }).catch(e => {
      if (e.response.status === 404) {
        props.history.replace("/notfound");
      }
    });
    axios.get("/api/forum/users/" + username + "/posts").then(response => {
      setPosts(response.data);
    });
  }, []);

  function saveSignature() {
    let options = { withCredentials: true };
    axios.post(`/api/forum/users/${user.id}/signature`, { signature: signature }, options).then((r) => {
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
        <div className="pt-1"/>
        <div className="profile">
          <div className="profile-picture">
            <img className="avatar" src={avatar(user.main)} alt=""/>
          </div>
          <div className="profile-content">
            <div style={{ fontWeight: "bold", fontSize: "24px", display: "flex" }}>
              {username}
              {authContext.isLoggedIn && user.username === authContext.user.username &&
              <Button size="sm" variant="outline-secondary" className="ml-auto" onClick={() => setModal("edit")}>Edit Profile</Button>
              }
              {authContext.isLoggedIn && user.username !== authContext.user.username &&
              <Button size="sm" variant="outline-secondary" className="ml-auto" onClick={() => setModal("message")}>
                <FontAwesomeIcon icon={faEnvelope} className="va-middle" />
                {" Send Message"}
              </Button>
              }
            </div>
            <ProfileBadge status={user.status} />
            {user.quote && <div className="profile-quote">{user.quote}</div>}
            <div>Joined {forumDate(user.date)}</div>
            <div className="profile-stats">
              <div><div>Posts</div><div>{user.posts}</div></div>
              <div><div>Likes</div><div>{user.likes}</div></div>
              <div><div>Followers</div><div>0</div></div>
            </div>
          </div>
        </div>
        <Tab.Container defaultActiveKey="about">
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="posts">Posts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="trophy-case">Trophy Case</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="profile display-block">
            <Tab.Pane className="profile-details" eventKey="about">
              {user.location && <div className="mb-2"><b>Location:</b> {user.location}</div>}
              {user.main && <div className="mb-2"><b>Main:</b> {user.main}</div>}
              {user.birthday && <div className="mb-2"><b>Birthday:</b> {new Date(user.birthday).toLocaleDateString("en-US", {timeZone: "UTC"})}</div>}
              {user.website && <div className="mb-2"><b>Website:</b> <a href={user.website}>{user.website}</a></div>}
              {!user.location && !user.main && !user.birthday && !user.website && !user.signature && "User has not added any information"}
              {(user.signature || (authContext.isLoggedIn && user.username === authContext.user.username)) &&
              <React.Fragment>
                <hr className="mt-2 mb-2" />
                <div className="d-flex">
                  <b>Signature</b>
                  {authContext.isLoggedIn && user.username === authContext.user.username &&
                  <Button size="xs" variant="outline-secondary" className="ml-auto" onClick={() => setEditSignature(s => !s)}>
                    {editSignature ? "Cancel" : "Edit"}
                  </Button>
                  }
                </div>
                <div>
                  {editSignature ?
                    <React.Fragment>
                      <MarkdownEditor
                        value={signature}
                        setValue={value => setSignature(value)}
                      />
                      <div className="d-flex"><Button onClick={saveSignature} className="ml-auto">Save</Button></div>
                    </React.Fragment>
                    :
                    <ReactMarkdown plugins={[gfm]} children={user.signature} />
                  }
                </div>
              </React.Fragment>
              }
            </Tab.Pane>
            <Tab.Pane className="profile-details" eventKey="posts">
              {posts.length > 0 ? posts.map((post, i) =>
                <div className="profile-post" key={i}>
                  <b className="clickable" onClick={() => props.history.push("/forum/threads/" + post.thread_fk)}>{post.title}</b>
                  <div className="post-preview">{post.content}</div>
                  <small>{forumDate(post.timestamp)}</small>
                </div>)
              :
                "No posts from this user found"
              }
            </Tab.Pane>
            <Tab.Pane className="profile-details" eventKey="trophy-case">
              {user.trophies && user.trophies.length ? user.trophies.map(trophy =>
                <div className="trophy" key={trophy}>
                  <img className="avatar" src={process.env.PUBLIC_URL + trophyData[trophy].url} alt="" title={trophyData[trophy].description}/>
                  {trophyData[trophy].name}
                </div>
              ) : "Nothing to see here yet"
              }
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
      <EditProfileModal show={modal === "edit"} handleClose={() => setModal("")} user={user} refresh={refresh} />
      <MessageModal show={modal === "message"} handleClose={() => setModal("")} refresh={refresh} recipient={username} />
    </div>
  )
}

export default withRouter(Profile);