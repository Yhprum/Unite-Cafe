import React, {useState} from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

function ForgotPasswordModal(props) {
  const [inProgress, setInProgress] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  function save(e) {
    e.preventDefault();
    setInProgress(true);
    let data = Object.fromEntries(new FormData(e.target));
    let options = { withCredentials: true };
    axios.post("/api/user/forgot", data, options).then(() => {
      setInProgress(false);
      setError(null);
      setSent(true);
    }).catch(e => {
      setInProgress(false);
      if (e.response.status === 400) {
        setError("Email not found");
      } else {
        setError("An error occurred, try again later")
      }
    });
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body>
        <Form id="updateUserForm" onSubmit={save}>
          <Form.Group>
            <Form.Label>
              Enter your email to reset your account's password. We will send you an email with instructions to reset.
            </Form.Label>
            <Form.Control type="email" name="email" placeholder="Email" />
            {sent && <div className="login-success">Email has been sent, make sure to check your spam folder if you don't see it!</div>}
            {error && <div className="login-error">{error}</div>}
          </Form.Group>
          <Button variant="primary" type="submit" disabled={sent || inProgress}>
            {inProgress ? "Sending..." : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ForgotPasswordModal;