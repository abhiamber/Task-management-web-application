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
import moment from "moment";
import axios from "axios";
import { API } from "../API";

const ModalExample = ({ propContent, classType, setShowFunc }) => {
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(propContent.title);
  let [content, setContent] = useState(propContent.content);
  let [status, setStatus] = useState(propContent.status);

  // let [color, setColour] = useState(propContent.color);

  let handleClick = (id) => {
    axios
      .put(`${API}/tasks/update/${id}`, {
        title,
        content,
        status,
      })
      .then((response) => {
        if (response.data.message) alert(response.data.message);
        else {
          toggle();
          setTitle(null);
          setContent(null);
        }
        console.log(response);
        setShowFunc();
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
      <Button color="primary" size="sm" className={classType} onClick={toggle}>
        <i className="fas fa-arrow-alt-circle-right" />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <Label for="title">Task Title:</Label>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="content">Task Details:</Label>
            <Input
              type="textarea"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormGroup>
          <Label for="status">Status:</Label>
          <Input
            type="select"
            value={status}
            name="status"
            id="status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="1">Backlog</option>
            <option value="2">Todo</option>
            <option value="3">In Progress</option>
            <option value="4">Done</option>
          </Input>
          <hr />
          <i className="fas fa-calendar-alt"></i> Created Date:{" "}
          {moment(propContent.date).format("DD.MM.YYYY")}
          <br />
          <i className="fas fa-clock"></i> Due Date:{" "}
          {moment(propContent.dueDate).format("DD.MM.YYYY")}
          <br />
          <i className="fas fa-user"></i> Created by: {propContent.createdBy}
          <br />
          <i className="fas fa-user"></i> Contributed by:{" "}
          {propContent.contributors[0].name +
            " " +
            propContent.contributors[0].lastname}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleClick(propContent._id)}>
            Update
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
