import moment from "moment";
// import ModalExampleDimmer from "./Modal";
import axios from "axios";
import { API } from "../API";

import Loader from "./Loader";
import ModalExample from "./Modal";
let content;

const Task = ({ tasks, loading, filter, setShowFunc }) => {
  // console.log(tasks, loading, filter);
  let api = (id) => {
    axios
      .delete(`${API}/tasks/delete/${id}`)
      .then(function (response) {
        if (response.status === "1") alert("ok");
        console.log(response);
      })
      .then(() => {})
      .catch(function (error) {
        console.log(error);
      });
    setShowFunc();
  };

  if (loading) {
    content = (
      <div className="loader">
        <Loader />
      </div>
    );
  } else {
    content = tasks
      .filter((i) => i.status === Number(filter))
      .map((i, index) => {
        return (
          <li id={i._id} className="mcell-task" key={index}>
            <span className="task-name">
              <span>{i.title}</span>
              <i
                id="delete"
                className="fas fa-times"
                onClick={() => api(i._id)}
              ></i>
            </span>
            <span className="task-details">{i.content}</span>
            <div>
              <span className="task-due">
                {moment(i.dueDate).format("DD.MM.YYYY")}
              </span>
              <span className="task-contributors"></span>
            </div>
            <div className={i.color} />
            <ModalExample
              setShowFunc={setShowFunc}
              propContent={i}
              classType="btnDashboard"
            />
          </li>
        );
      });
  }
  return <div className="process">{content}</div>;
};

export default Task;
