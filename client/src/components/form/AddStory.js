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

const AddStory = ({ setShowFunc }) => {
  let [modal, setModal] = useState(false);
  let [count, setCount] = useState(0);
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
      .get(`${API}/story/count`)
      .then((r) => {
        // console.log(r.data[0].count);
        setCount(r.data[0].count + 2);
      })
      .catch((e) => {
        setCount(2);

        console.log(e);
      });
  };
  let handleClick = async () => {
    // await getStoryCount();

    axios
      .post(`${API}/story`, {
        title,
        createdBy,
        storyId: count,
      })
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          // toggle();
          setTilte(null);
          setCreatedBy(null);
        }
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowFunc();
    toggle();
  };
  let toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getStoryCount();
  }, [modal]);
  // console.log(count);
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
