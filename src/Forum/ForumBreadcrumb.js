import React from "react";
import { withRouter } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import topics from "../data/forum";

function ForumBreadcrumb(props) {
  const categoryUrl = "/forum/" + props.category;
  let topic = "";
  let categoryTitle = "";

  if (props.category) {
    const keys = Object.keys(topics);
    const inCategory = (category, topic) => topics[topic].some(x => x.topic === props.category);
    topic = keys.find(x => inCategory(props.category, x));
    categoryTitle = topics[topic].find(x => x.topic === props.category).title;
  }

  return (
    <div>
      <Breadcrumb className="pt-1 pb-1">
        <Breadcrumb.Item href="/forum">Forum</Breadcrumb.Item>
        {props.category &&
        <Breadcrumb.Item href={`/forum/#${topic}`}>{topic}</Breadcrumb.Item>
        }
        {props.category && props.thread &&
        <Breadcrumb.Item href={categoryUrl}>{categoryTitle}</Breadcrumb.Item>
        }
        <span>&nbsp; &gt;</span>
      </Breadcrumb>
    </div>
  );
}

export default withRouter(ForumBreadcrumb)