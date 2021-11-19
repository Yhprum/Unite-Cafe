import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Auth from "../utils/Auth";
import axios from "axios";

function Register(props) {
  const [authContext, setAuthContext] = useContext(Auth);
  const [validated, setValidated] = useState(false);
  const [state , setState] = useState({
    username: "",
    email : "",
    password : ""
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name] : value
    }));
  };

  const handleSubmit = (e) => {
    let form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      let body = { username: state.username, email: state.email, password: state.password };
      axios.post("/api/user/register", body, { withCredentials: true }).then(response => {
        if (!response.data.error) {
          setAuthContext({ isLoggedIn: true, user: response.data.user });
          props.history.push('/forum');
        } else {
          setErrorMsg(response.data.msg);
        }
      });
    }
  };

  return (
    <div className="forum">
      <div className="container">
        <div className="full-width">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={state.username} onChange={handleChange} required />
              <Form.Text className="text-muted">
                Cannot be changed, must be unique
              </Form.Text>
              {errorMsg.includes("Username") && <div className="login-error">{errorMsg}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" value={state.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={state.password} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Check feedback="You must agree before registering.">
                <Form.Check.Input required type="checkbox" />
                <Form.Check.Label>I agree to the <a href="/terms" rel="external nofollow noopener" target="_blank">terms of use</a></Form.Check.Label>
              </Form.Check>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
          <div>
            <span className="login-text" onClick={() => props.history.push('/login')}>Already have an account? Login</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Register);