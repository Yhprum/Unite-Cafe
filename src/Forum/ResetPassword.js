import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function ResetPassword(props) {
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = e.currentTarget;
    let data = Object.fromEntries(new FormData(e.target));
    if (data.password !== data.password2) {
      setError("Passwords must match");
    } else {
      let params = new URLSearchParams(props.location.search);
      let email = params.get("email");
      let code = params.get("code");
      axios.post("/api/user/reset", { password: data.password, code: code, email: email }, { withCredentials: true }).then(response => {
        props.history.push('/login');
      }).catch(() => setError("Reset link has expired"));
    }
  };

  return (
    <div className="forum">
      <div className="container">
        <div className="full-width">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" name="password" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="password2" required />
              {error && <div className="login-error">{error}</div>}
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ResetPassword);