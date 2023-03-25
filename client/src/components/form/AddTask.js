import React, { useEffect, useState } from "react";
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
import { API } from "../../API";
let task = {
  title: "",
  content: "",
  contributors: "",
  // createdBy: "641e0ae624e37696d3d44b7d",
  dueDate: "",
  color: "",
};

let userContent;
let changeColumnTitle = (number) => {
  // console.log(number);
  let newTitle;
  if (number === 1) newTitle = "Backlog";
  else if (number === 2) newTitle = "ToDo";
  else if (number === 3) newTitle = "In Progress";
  else newTitle = "Done";

  return newTitle;
};
const AddModal = (props) => {
  // console.log(props);
  let [modal, setModal] = useState(false);
  let [users, setUsers] = useState([]);

  let [tasks, setTask] = useState(task);

  let handleInput = (e) => {
    setTask({ ...tasks, [e.target.name]: e.target.value });
  };
  let getUsers = () => {
    axios
      .get(`${API}/users`)
      .then((r) => {
        // console.log(r, "");
        setUsers(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  let handleClick = (event) => {
    axios
      .post(`${API}/tasks`, {
        title: tasks.title,
        content: tasks.content,
        status: props.status,
        contributors: tasks.contributors,
        dueDate: tasks.dueDate,
        color: tasks.color,
        storyId: props.storyType,
        createdBy: props.storyName[0].createdBy,
      })
      .then((response) => {
        if (response.data.message) alert(response.data.message);
        else {
          setTask({
            ...tasks,
            ttitle: null,
            content: null,
            contributors: null,
            dueDate: null,
            loading: false,
          });
        }
        props.setShowFunc("jnk,");

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    toggle();
  };
  let toggle = () => {
    getUsers();
    setModal(!modal);
  };
  useEffect(() => {
    getUsers();
  }, []);

  // console.log(creartor);

  if (users.length === 0) userContent = <option value="">Loading...</option>;
  else {
    let filterData = users.filter(
      (user) => user._id !== "641e0ae624e37696d3d44b7d"
    );
    userContent = filterData.map((user, index) => (
      <option key={index} value={user._id}>
        {user.name + " " + user.lastname}
      </option>
    ));
  }

  return (
    <div>
      <i className="fas fa-plus-circle customAddTask" onClick={toggle}></i>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle}>
          Create a New Task to {changeColumnTitle(props.status)}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Task Title(*):</Label>
            <Input
              type="text"
              name="title"
              id="taskTitle"
              onChange={handleInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="content">Task Details:</Label>
            <Input
              type="textarea"
              name="content"
              id="content"
              onChange={handleInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="contributors">Assign to:</Label>
            <Input
              type="select"
              name="contributors"
              id="contributors"
              onChange={handleInput}
            >
              <option value="">Choose:</option>
              {userContent}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="color">Task Color:</Label>
            <Input type="select" name="color" id="color" onChange={handleInput}>
              <option value="">Choose:</option>
              <option value="colorBlue">Red</option>
              <option value="colorGreen">Green</option>
              <option value="colorGrey">Grey</option>
            </Input>
          </FormGroup>
          <hr />
          <i className="fas fa-calendar-alt"></i> Created Date:{" "}
          {moment().format("L, h:mm:ss")} <br />
          <i className="fas fa-clock"></i> Due Date:{" "}
          <input
            name="dueDate"
            id="dueDate"
            type="datetime-local"
            onChange={handleInput}
          />
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

export default AddModal;
