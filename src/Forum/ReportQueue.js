import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "../assets/css/forum.css";
import Post from "./Post";

function ReportQueue(props) {
  let [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("/api/forum/reports").then(response => {
      setReports(response.data);
    }).catch(e => console.log(e));
  }, []);

  return (
    <div className="forum">
      <div className="container">
        {reports.map((post, i) => <Post key={i} {...post} />)}
      </div>
    </div>
  )
}

export default withRouter(ReportQueue);