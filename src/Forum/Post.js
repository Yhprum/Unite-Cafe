import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { forumDate, avatar } from "../utils/utils";
import Auth from "../utils/Auth";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faThumbsUp as unlike } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import "../assets/css/markdown.css";
import ProfileBadge from "./ProfileBadge";
import MarkdownEditor from "../components/MarkdownEditor";

function Post(props) {
  const [authContext, setAuthContext] = useContext(Auth);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(props.content);
  const [reportReason, setReportReason] = useState("");
  const [modal, setModal] = useState("");

  function editPost() {
    let data = { message: message };
    let options = { withCredentials: true };
    axios.post(`/api/forum/posts/${props.postid}/edit`, data, options).then(() => {
      setEditMode(false);
      props.history.push("/temp");
      props.history.goBack();
    });
  }

  function deletePost() {
    let options = { withCredentials: true };
    axios.delete(`/api/forum/posts/${props.postid}`, options).then(() => {
      setModal("");
      props.history.push("/temp");
      props.history.goBack();
    });
  }

  function reportPost() {
    let data = { reason: reportReason };
    let options = { withCredentials: true };
    axios.post(`/api/forum/posts/${props.postid}/report`, data, options).then(() => {
      setModal("");
    });
  }

  function likePost() {
    let options = { withCredentials: true };
    let path = props.liked ? "unlike" : "like";
    axios.post(`/api/forum/posts/${props.postid}/${path}`, undefined, options).then(() => {
      props.history.push("/temp");
      props.history.goBack();
    });
  }

  return (
    <div className="post">
      <div className="post-user">
        <img className="avatar" src={avatar(props.avatar)} alt=""/>
        <div className="post-username clickable" onClick={() => props.history.push("/forum/users/" + props.username)}>{props.username}</div>
        <small><ProfileBadge status={props.status} /></small>
      </div>
      <div className="post-content">
        {editMode ?
          <React.Fragment>
            <MarkdownEditor
              value={message}
              setValue={value => setMessage(value)}
            />
            <div style={{ display: "flex" }}>
              <Button className="ml-auto" size="sm" variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
              <Button size="sm" onClick={editPost}>Post</Button>
            </div>
          </React.Fragment>
          :
          <React.Fragment>
            <div className="post-header">
              <small>{forumDate(props.timestamp)}</small>
            </div>
            <div>
              <ReactMarkdown plugins={[gfm]} children={props.content} />
            </div>
            {props.edit && <div className="post-edit"><small>Last edited: {forumDate(props.edit)}</small></div>}
            {authContext.isLoggedIn && props.signature &&
            <div className="post-signature">
              <ReactMarkdown plugins={[gfm]} children={props.signature}/>
            </div>
            }
            {authContext.isLoggedIn &&
            <div className="post-footer">
              {(props.userid === authContext.user.id || authContext.user.status === 9) &&
              <Button size="sm" variant="link" className="post-footer-action" onClick={() => setEditMode(true)}>Edit</Button>
              }
              {(props.userid === authContext.user.id || authContext.user.status === 9 || authContext.user.status === 8) &&
              <Button size="sm" variant="link" className="post-footer-action" onClick={() => setModal("delete")}>Delete</Button>
              }
              <Button size="sm" variant="link" className="post-footer-action" onClick={() => setModal("report")}>Report</Button>
              <div style={{ marginLeft: "auto" }}>
                {props.userid !== authContext.user.id &&
                <Button size="sm" variant="link" className="post-footer-action" onClick={() => likePost()}>
                  <FontAwesomeIcon icon={props.liked === null ? faThumbsUp : unlike} />
                  {" "}
                  {props.liked === null ? "Like" : "Unlike"}
                </Button>
                }
                <Button size="sm" variant="link" className="post-footer-action" onClick={() => props.setReply(props.content.replace(/^/gm, ">"))}>
                  <FontAwesomeIcon icon={faReply} />
                  {" "}
                  Reply
                </Button>
              </div>
            </div>
            }
            {props.likes > 0 &&
            <small style={{ color: "rgba(0,0,0,.5)" }}>
              {props.likes}
              {parseInt(props.likes) === 1 ? " person likes this" : " people like this"}
            </small>
            }
          </React.Fragment>
        }
      </div>
      <Modal show={modal === "delete"} onHide={() => setModal("")}>
        <Modal.Body>
          Are you sure you want to delete this post?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setModal("")}>
            No
          </Button>
          <Button variant="danger" onClick={deletePost}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={modal === "report"} onHide={() => setModal("")}>
        <Modal.Body>
          By submitting this report, you say this post breaks one of our rules. Abusing the report system can lead to restrictions.
          <Form.Control as="textarea" rows={3} placeholder="Report reason" value={reportReason} onChange={e => setReportReason(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setModal("")}>
            Cancel
          </Button>
          <Button variant="danger" onClick={reportPost}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default withRouter(Post);