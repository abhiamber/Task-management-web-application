import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import axios from "axios";
import { API } from "../../API";

const AddStory = ({ setShowFunc, users }) => {
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState("");
  let [createdBy, setCreatedBy] = useState("");

  let handleInput = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "createdBy") {
      setCreatedBy(e.target.value);
    }
  };

  let handleClick = async () => {
    try {
      let res = await axios.post(`${API}/story`, {
        title,
        createdBy,
      });
      setTitle(null);
      setCreatedBy(null);
      setShowFunc();
    } catch (err) {}

    toggle();
  };
  let toggle = () => {
    setModal(!modal);
  };

  const userContent = users.map((user, index) => (
    <option key={index} value={user._id}>
      {user.firstName + " " + user.lastName}
    </option>
  ));
  return (
    <div>
      <Button color="secondary" onClick={toggle}>
        <i className="fas fa-plus-circle" /> Add Project
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          close={
            <Button color="secondary" onClick={toggle}>
              <i className="fas fa-times-circle"></i>
            </Button>
          }
        >
          Add Story
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Story Title(*)</Label>
            <Input type="text" name="title" onChange={handleInput} />
          </FormGroup>
          <FormGroup>
            <Label for="createdBy">Created by(*)</Label>
            <Input
              type="select"
              name="createdBy"
              id="createdBy"
              onChange={handleInput}
            >
              <option value="">Choose:</option>
              {userContent}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClick}>
            <i className="fas fa-plus-circle"></i> Add
          </Button>
          <Button color="secondary" onClick={toggle}>
            <i className="fas fa-times-circle"></i> Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddStory;
