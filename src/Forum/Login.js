import React, {useContext, useState} from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Auth from "../utils/Auth";
import axios from "axios";
import ForgotPasswordModal from "./ForgotPasswordModal";

function Login(props) {
  const [authContext, setAuthContext] = useContext(Auth);
  const [state , setState] = useState({
    username: "",
    password : ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [modal, setModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name] : value
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    let body = { username: state.username, password: state.password };
    axios.post("/api/user/login", body, { withCredentials: true }).then(response => {
      if (!response.data.error) {
        setAuthContext({ isLoggedIn: true, user: response.data.user });
        props.history.push('/forum');
      } else {
        setErrorMsg(response.data.msg);
      }
    });
  };

  return (
    <div className="forum">
      <div className="container">
        <div className="full-width">
          <Form>
            <Form.Group>
              <Form.Label>Username or Email</Form.Label>
              <Form.Control type="text" name="username" value={state.username} onChange={handleChange} required />
              {errorMsg.includes("username") && <div className="login-error">{errorMsg}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={state.password} onChange={handleChange} />
              {errorMsg.includes("password") && <div className="login-error">{errorMsg}</div>}
              <small className="login-text" onClick={() => setModal(true)}>Forgot your password?</small>
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Keep me logged in" />
            </Form.Group>
            <Button type="submit" onClick={handleSubmitClick}>Submit</Button>
          </Form>
          <div>
            <span className="login-text" onClick={() => props.history.push('/register')}>Don't have an account? Register</span>
          </div>
        </div>
      </div>
      <ForgotPasswordModal show={modal} handleClose={() => setModal(false)} />
    </div>
  )
}

export default withRouter(Login);