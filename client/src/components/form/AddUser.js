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

let userDetails = {
  userName: "",
  firstName: "",
  lastName: "",
};

const AddUser = ({ getUsers }) => {
  let [useData, setUserData] = useState(userDetails);
  let [modal, setModal] = useState(false);

  let handleInput = (e) => {
    setUserData({ ...useData, [e.target.name]: e.target.value });
  };

  let handleClick = async () => {
    try {
      await axios.post(`${API}/users`, useData);
      setUserData(userDetails);
      getUsers();
    } catch (err) {}
    toggle();
  };

  let toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <i className="fas fa-user-plus" onClick={toggle} />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          close={
            <Button color="secondary" onClick={toggle}>
              <i className="fas fa-times-circle"></i>
            </Button>
          }
        >
          <i className="fas fa-user-circle" /> Add User
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="username">Username(*):</Label>
            <Input type="text" name="userName" onChange={handleInput} />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">first Name(*):</Label>
            <Input type="text" name="firstName" onChange={handleInput} />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name(*):</Label>
            <Input type="text" name="lastName" onChange={handleInput} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClick}>
            <i className="fas fa-plus-circle"></i> Add
          </Button>
          <Button color="secondary" onClick={toggle}>
            <i className="fas fa-times-circle" /> Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddUser;
