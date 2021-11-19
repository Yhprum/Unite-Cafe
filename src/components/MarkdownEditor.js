import React, { useEffect, useState } from "react";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import axios from "axios";

function MarkdownEditor(props) {

  const [selectedTab, setSelectedTab] = useState("write");

  function loadUsers(text) {
    return text.length === 0 ? [{ preview: "", value: "" }] :
      new Promise((accept, reject) => {
        axios.get("/api/forum/users/search/" + text).then(response => {
          let users = response.data.slice(0, 5).map(user => {
            return {
              preview: user.username,
              value: `[${user.username}](/forum/users/${user.username})`
            }
          });
          accept(users);
        });
      })
  }

  return (
    <ReactMde
      value={props.value}
      onChange={value => props.setValue(value)}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={markdown =>
        Promise.resolve(<ReactMarkdown source={markdown} />)
      }
      loadSuggestions={loadUsers}
    />
  )
}

export default MarkdownEditor;