import React, {useContext, useEffect, useState} from "react";
import { withRouter, useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/forum.css";
import ThreadPreview from "./ThreadPreview";
import { Button, Modal, Form } from "react-bootstrap";
import ForumBreadcrumb from "./ForumBreadcrumb";
import Auth from "../utils/Auth";
import topics from "../data/forum";
import MarkdownEditor from "../components/MarkdownEditor";

function ForumTopic(props) {
  let { topic } = useParams();
  let details = Object.values(topics).flat().find(t => t.topic === topic);

  const [authContext, setAuthContext] = useContext(Auth);
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios.get("/api/forum/threads/" + topic).then(response => {
      setThreads(response.data)
    }).catch(e => console.log(e));
  }, []);

  function createThread() {
    let data = { title: title, message: message };
    let options = { withCredentials: true };
    axios.post(`/api/forum/threads/${topic}/new`, data, options).then(response => {
      props.history.push(`/forum/threads/${response.data.threadId}`);
    });
  }

  if (details === undefined) {
    props.history.replace("/notfound");
    return <></>;
  }
  return (
    <div className="forum">
      <div className="container">
        <div>
          <ForumBreadcrumb category={topic} />
        </div>

        <div className="forum-container">
          <div className="forum-header">
            <div>{details.title}</div>
            {authContext.isLoggedIn && (!details.locked || authContext.user.status === 9) &&
            <Button size="sm" variant="outline-dark" className="ml-auto" onClick={() => setModal(true)}>New Thread</Button>
            }
          </div>
          <div className="forum-topics">
            {threads.map(thread => <ThreadPreview key={thread.id} {...thread}/>)}
            {threads.length === 0 && <div className="post-content">No Threads Found</div>}
          </div>
        </div>
        <Modal show={modal} size="lg" onHide={() => setModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>New Thread</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control type="text" placeholder="Thread Title" value={title} onChange={e => setTitle(e.target.value)} />
            <hr/>
            <MarkdownEditor
              value={message}
              setValue={value => setMessage(value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={createThread}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default withRouter(ForumTopic);