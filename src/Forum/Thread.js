import React, {useContext, useEffect, useState} from "react";
import { withRouter, useParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import Post from "./Post";
import ReplyBox from "./ReplyBox";
import Auth from "../utils/Auth";
import axios from "axios";
import { forumDate } from "../utils/utils";
import ForumBreadcrumb from "./ForumBreadcrumb";

function Thread(props) {
  let { threadId, page } = useParams();
  const [authContext, setAuthContext] = useContext(Auth);
  const [thread, setThread] = useState({});
  const [posts, setPosts] = useState([]);
  const [reply, setReply] = useState();

  useEffect(() => {
    let options = { withCredentials: true };
    axios.get("/api/forum/thread/" + threadId).then(response => {
      setThread(response.data);
    }).catch(e => console.log(e));
    axios.get(`/api/forum/posts/${threadId}/${page || ""}`, options).then(response => {
      setPosts(response.data);
    }).catch(e => console.log(e));
  }, [threadId, page]);

  function postReply() {
    let data = { message: reply };
    let options = { withCredentials: true };
    axios.post(`/api/forum/posts/${threadId}/reply`, data, options).then(() => {
      setReply("");
      props.history.push("/temp");
      props.history.goBack();
    });
  }

  function subscribe() {
    let data = thread.subscribed ? {"stop": true} : {};
    let options = { withCredentials: true };
    axios.post(`/api/forum/threads/${threadId}/subscribe`, data, options).then(() => {
      setThread(thread => ({...thread, subscribed: !thread.subscribed}));
    });
  }

  const ThreadPagination = () => {
    return (
      <Pagination size="sm">
        {[...Array(Math.ceil(thread.postcount / 25) + 1).keys()].slice(1).map(pageNumber => {
          return (
            <Pagination.Item key={pageNumber} active={pageNumber === (parseInt(page) || 1)} onClick={() => props.history.push(`/forum/threads/${threadId}/${pageNumber}`)}>
              {pageNumber}
            </Pagination.Item>
          )
        })}
      </Pagination>
    )
  };
  
  return (
    <div className="forum">
      <div className="container">
        <ForumBreadcrumb category={thread.category} thread={true} />
        <div className="name">{thread.title}</div>
        <div className="d-flex flex-row">
          <span>{thread.username + " " + forumDate(thread.timestamp)}</span>
          {authContext.isLoggedIn &&
          <small className="ml-auto clickable" onClick={() => subscribe()}>
            {thread.subscribed ? "Unsubscribe" : "Subscribe to updates"}
          </small>
          }
        </div>
        {thread.postcount > 25 && <ThreadPagination />}
        {posts.map((post, i) => <Post key={i} {...post} setReply={setReply} />)}
        {thread.postcount > 25 && <ThreadPagination />}
        <hr/>
        {thread.locked && !(authContext.isLoggedIn && authContext.user.status === 9) ?
          <div>This thread is locked, you are not able to respond</div>
          : (authContext.isLoggedIn ?
            <ReplyBox postReply={postReply} reply={reply} setReply={setReply} />
            :
            <div>Log in to reply to this thread</div>
          )}
      </div>
    </div>
  )
}

export default withRouter(Thread);