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

let useDetails = {
  modal: false,
  username: "",
  name: "",
  lastname: "",
  profilePhoto: "5af1921c0fe5703dd4a463ec",
  loading: false,
};

const AddUser = () => {
  let [useData, setUserData] = useState(useDetails);
  let [modal, setModal] = useState(false);

  let handleInput = (e) => {
    setUserData({ ...useDetails, [e.target.name]: e.target.value });
  };

  let handleClick = (event) => {
    axios
      .post("/users", { useData })
      .then((response) => {
        if (response.data.message) alert(response.data.message);
        else {
          toggle();
          setUserData({
            username: null,
            name: null,
            lastName: null,
            profilePhoto: null,
            loading: false,
          });
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
      <i className="fas fa-user-plus" onClick={toggle}></i>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <i className="fas fa-user-circle"></i> Add User
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="username">Username(*):</Label>
            <Input type="text" name="username" onChange={handleInput} />
          </FormGroup>
          <FormGroup>
            <Label for="name">Name(*):</Label>
            <Input type="text" name="name" onChange={handleInput} />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name(*):</Label>
            <Input type="text" name="lastName" onChange={handleInput} />
          </FormGroup>
          <FormGroup>
            <Label for="profilePhoto">Profile Photo URL(*):</Label>
            <Input type="text" name="profilePhoto" onChange={handleInput} />
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

export default AddUser;
