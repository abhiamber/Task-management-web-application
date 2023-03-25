import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./common/Header";

import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";
import AddStory from "./form/AddStory";
import { Story } from "./Story";
import { API } from "../API";

let storyTable;

const Dashboard = () => {
  let [id, setId] = useState(2);
  let [show, setShow] = useState(true);
  let [task, setTask] = useState([]);
  let [stories, setStories] = useState([]);
  let [err, setErr] = useState("");
  let [err2, setErr2] = useState("");
  let [loading, setLoading] = useState(true);
  // let params = useParams();
  // console.log(params, "cxv");
  // let [loadingStory, setLoadingStories] = useState(true);

  let getStoryDetails = () => {
    axios
      .get(`${API}/story`)
      .then((r) => {
        // console.log(r.data, "nnhjbhj");
        setStories(r.data);
        setErr2("");
      })

      .catch((e) => {
        setErr2(e);
      });
  };
  let getData = () => {
    axios
      .get(`${API}/tasks/1`)
      .then((r) => {
        console.log(r.data, "bj");
        setTask(r.data);
        setErr("");
      })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        if (!e.response) {
          setLoading(true);
          setErr(e);
        } else setLoading(false);
        setErr(e);
      });
  };
  useEffect(() => {
    getStoryDetails();
    getData();
    // setInterval(() => {
    //   getData();
    // }, 2000);
  }, []);

  // if (!loadingStory)
  //   storyTable = stories.map((story, index) => {
  //     return (
  //       <li key={index}>
  //         <Link to={`/story/${story.storyId}`} activeClassName="active">
  //           <i className="fas fa-list-alt"></i>
  //           <span className="menu-text">{story.title}</span>
  //         </Link>
  //       </li>
  //     );
  //   });
  // else
  //   storyTable = (
  //     <li>
  //       <div className="loader">
  //         <Loader />
  //       </div>
  //     </li>
  //   );
  // console.log(id);
  return (
    <div>
      <div className="side">
        <span className="logo">Task Manger</span>

        <ul className="side-menu">
          {storyTable}

          {stories.map((story, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setId(story.storyId);
                }}
              >
                <Link to={`/story/${story.storyId}`} activeClassName="active">
                  <i className="fas fa-list-alt"></i>
                  <span className="menu-text">{story.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="otherMenu">
          <AddStory setShowFunc={getStoryDetails} />
        </div>
      </div>
      <div className="con">
        <Header />
        <aside>
          <Story
            setShowFunc={getStoryDetails}
            storyName={stories.filter((i) => i.storyId === id)}
            storyType={1}
            tasks={task}
            loading={loading}
          />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
