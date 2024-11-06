import moment from "moment";
import axios from "axios";
import { API } from "../API";

import Loader from "./Loader";
import ModalExample from "./Modal";
let content;

const Task = ({ tasks, loading, filter, setShowFunc }) => {
  let deleteTaskFunc = async (id) => {
    try {
      let response = await axios.delete(`${API}/tasks/delete/${id}`);
      if (response.status === "1") alert("ok");
    } catch (error) {}

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
      .filter((i) => i.status == Number(filter))
      .map((i, index) => {
        return (
          <li id={i._id} className="mcell-task" key={index}>
            <span className="task-name">
              <span>{i.title}</span>
              <i
                id="delete"
                className="fas fa-times"
                onClick={() => deleteTaskFunc(i._id)}
              />
            </span>
            <span className="task-details">{i.content}</span>
            <div>
              <div className="task-due m-2">
                {moment(i.dueDate).format("DD.MM.YYYY")}
              </div>
            </div>

            {/* <div className={i.color} /> */}
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
