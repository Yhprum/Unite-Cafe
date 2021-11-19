import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import search from "../data/search.json";
import axios from "axios";

function EditProfileModal(props) {

  function save(e) {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    let options = { withCredentials: true };
    axios.post(`/api/forum/users/${props.user.id}/edit`, data, options).then(() => {
      props.refresh();
    });
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="updateUserForm" onSubmit={save}>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Status
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" name="status" defaultValue={props.user.quote} placeholder="A message to display on your profile" />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Location
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" defaultValue={props.user.location} name="location" />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Main
            </Form.Label>
            <Col sm="10">
              <Form.Control as="select" name="main" defaultValue={props.user.main}>
                <option value="">None</option>
                {search.filter(pokemon => pokemon.category === "pokemon").map(pokemon => <option key={pokemon.name}>{pokemon.name}</option>)}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Birthday
            </Form.Label>
            <Col sm="10">
              <Form.Control type="date" name="birthday" defaultValue={props.user.birthday ? new Date(props.user.birthday).toISOString().split("T")[0] : ""} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Website
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" name="website" defaultValue={props.user.website} placeholder="https://example.com" />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" form="updateUserForm">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditProfileModal;