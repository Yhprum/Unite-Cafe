import React, {useEffect, useState} from "react";
import { withRouter } from "react-router-dom";
import "../assets/css/forum.css";
import { forumDate } from "../utils/utils";
import axios from "axios";
import topics from "../data/forum";
import ForumBreadcrumb from "./ForumBreadcrumb";

function Forum(props) {

  const [details, setDetails] = useState({});

  useEffect(() => {
    Object.keys(topics).forEach(category => {
      topics[category].forEach(topic => {
        axios.get("/api/forum/threads/" + topic.topic + "/details").then(response => {
          setDetails(details => ({...details, [topic.topic]: response.data}))
        }).catch(e => console.log(e));
      })
    });
  }, []);

  return (
    <div className="forum">
      <div className="container">
        <ForumBreadcrumb />
        {Object.keys(topics).map(category =>
          <div key={category} className="forum-container" id={category}>
            <div className="forum-header">{category}</div>
            <div className="forum-topics">
              {topics[category].map(topic =>
                <div key={topic.topic} className="forum-topic">
                  <div className="topic-title">
                    <div className="clickable" onClick={() => props.history.push("/forum/" + topic.topic)}>
                      {topic.title}
                    </div>
                    <small>
                      {(details[topic.topic] ? details[topic.topic].count : "0") + " thread"}
                      {details[topic.topic] && details[topic.topic].count === "1" ? "" : "s"}
                    </small>
                  </div>
                  <div className="topic-details">
                    <small className="topic-details-post clickable" onClick={() => props.history.push("/forum/threads/" + details[topic.topic].id)}>
                      {details[topic.topic] && details[topic.topic].title}
                    </small>
                    <small>
                      {details[topic.topic] &&
                        <React.Fragment>
                          <span className="clickable" onClick={() => props.history.push("/forum/users/" + details[topic.topic].username)}>
                            {details[topic.topic].username}
                          </span>
                          {", " + forumDate(details[topic.topic].timestamp)}
                        </React.Fragment>
                      }
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(Forum);