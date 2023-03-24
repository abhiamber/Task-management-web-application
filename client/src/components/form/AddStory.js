import React, { useState } from "react";
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

const AddStory = () => {
  let [modal, setModal] = useState(false);
  let [count, setCount] = useState(2);
  let [title, setTilte] = useState("");
  let [createdBy, setCreatedBy] = useState("");

  let handleInput = (e) => {
    if (e.target.name === "title") {
      setTilte(e.target.value);
    } else if (e.target.name === "createdBy") {
      setCreatedBy(e.target.value);
    }
  };

  let getStoryCount = () => {
    axios
      .get(`/story/count`)
      .then((r) => {
        setCount(r.data.count);
      })
      .catch((e) => {
        this.setState({
          err: e,
        });
      });
  };
  let handleClick = (event) => {
    getStoryCount();
    axios
      .post("/story", {
        title,
        createdBy,
        storyId: count,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          toggle();
          setTilte(null);
          setCreatedBy(null);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <Button color="secondary" onClick={toggle}>
        <i className="fas fa-plus-circle" /> Add Project
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Story</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Story Title(*):</Label>
            <Input type="text" name="title" onChange={handleInput} />
          </FormGroup>
          <FormGroup>
            <Label for="createdBy">Created by(*):</Label>
            <Input type="text" name="createdBy" onChange={handleInput} />
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
