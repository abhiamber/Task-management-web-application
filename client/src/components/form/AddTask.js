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
let userContent;

const AddModal = (props) => {
  let task = {
    modal: false,
    title: "",
    content: "",
    contributors: "",
    createdBy: "5af1921c0fe5703dd4a463ec",
    dueDate: "",
    status: props.status,
    color: "",
    storyId: props.storyType,
    loading: false,
    users: [],
  };
  let [tasks, setTask] = useState(task);

  useEffect(() => {
    changeColumnTitle();
  }, []);

  let changeColumnTitle = (number) => {
    let newTitle;
    if (number === "1") newTitle = "Backlog";
    else if (number === "2") newTitle = "ToDo";
    else if (number === "3") newTitle = "In Progress";
    else newTitle = "Done";

    return newTitle;
  };
  let handleInput = (e) => {
    setTask({ ...tasks, [e.target.name]: e.target.value });
    console.log(this.state.dueDate);
  };
  let getUsers = () => {
    axios
      .get("/users")
      .then((r) => {
        setTask({ ...tasks, users: r.data, err: "" });
      })
      .then((r) => {
        console.log(tasks.users);
      })
      .catch((e) => {
        setTask({ ...tasks, err: e });
      });
  };
  let handleClick = (event) => {
    axios
      .post("/tasks", {
        title: tasks.title,
        content: tasks.content,
        status: tasks.status,
        contributors: tasks.contributors,
        dueDate: tasks.dueDate,
        color: tasks.color,
        storyId: tasks.storyId,
        createdBy: tasks.createdBy,
      })
      .then((response) => {
        if (response.data.message) alert(response.data.message);
        else {
          toggle();
          setTask({
            ...tasks,
            ttitle: null,
            content: null,
            contributors: null,
            dueDate: null,
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
    getUsers();
    setTask({ ...tasks, modal: !tasks.modal });
  };

  const { users } = tasks;
  let userContent;
  if (!users) userContent = <option value="">Loading...</option>;
  else {
    userContent = users.map((user, index) => (
      <option key={index} value={user._id}>
        {user.name + " " + user.lastName}
      </option>
    ));
  }
  return (
    <div>
      <i className="fas fa-plus-circle customAddTask" onClick={toggle}></i>
      <Modal
        isOpen={tasks.modal}
        toggle={toggle}
        // className={this.props.className}
      >
        <ModalHeader toggle={toggle}>
          Create a New Task to {changeColumnTitle(tasks.status)}
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
