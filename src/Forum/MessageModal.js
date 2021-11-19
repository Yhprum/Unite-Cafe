import React, {useEffect, useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

function MessageModal(props) {

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (search.trim() !== "" && search.length > 0 && !props.recipient) {
      let isFresh = true;
      axios.get("/api/forum/users/search/" + search).then(response => {
        if (isFresh){
          setUsers(response.data);
        }
      });
      return () => (isFresh = false);
    }
  }, [search]);

  function send(e) {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    let options = { withCredentials: true };
    axios.post(`/api/forum/messages/send`, data, options).then(() => {
      props.refresh();
    });
  }

  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose} backdrop="static">
      <Modal.Body>
        <Form id="messageForm" onSubmit={send}>
          <Form.Group>
            <Form.Label>Recipient:</Form.Label>
            <Combobox>
              <ComboboxInput
                as="input"
                autoComplete="off"
                name="recipient"
                value={props.recipient ? props.recipient : null}
                required
                className="form-control"
                placeholder="Type a username"
                onChange={e => setSearch(e.target.value)}
                style={{ width: 300 }}
              />
              {users && (
                <ComboboxPopover portal={false} className="shadow-popup" style={{ "position": "absolute", "zIndex": "1051" }}>
                  {users.length > 0 ? (
                    <ComboboxList>
                      {users.map((user) => {
                        return <ComboboxOption key={user.username} value={user.username} />;
                      })}
                    </ComboboxList>
                  ) : (
                    <span style={{ display: "block", margin: 8 }}>
                No results found
              </span>
                  )}
                </ComboboxPopover>
              )}
            </Combobox>
          </Form.Group>
          <hr/>
          <Form.Group>
            <Form.Control type="text" name="subject" defaultValue={props.subject} placeholder="Subject" />
          </Form.Group>
          <Form.Group>
            <Form.Control as="textarea" rows="4" name="message" placeholder="Message..." required/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" form="messageForm">
          Send Message
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MessageModal;