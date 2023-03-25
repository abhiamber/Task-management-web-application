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
import { API } from "../../API";

let useDetails = {
  username: "",
  name: "",
  lastname: "",
  profilePhoto: "",
};

const AddUser = () => {
  let [useData, setUserData] = useState(useDetails);
  let [modal, setModal] = useState(false);
  // let [loading, setLoading] = useState(false);

  let handleInput = (e) => {
    setUserData({ ...useData, [e.target.name]: e.target.value });
  };

  let handleClick = () => {
    // console.log(useData);
    axios
      .post(`${API}/users`, useData)
      .then((response) => {
        if (response.data.message) alert(response.data.message);
        else {
          toggle();
          setUserData({
            username: null,
            name: null,
            lastName: null,
            profilePhoto: null,
          });
          // setLoading(false);
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
            <Input type="text" name="lastname" onChange={handleInput} />
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
