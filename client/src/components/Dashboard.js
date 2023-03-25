import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./common/Header";

import { Link } from "react-router-dom";
import AddStory from "./form/AddStory";
import { Story } from "./Story";
import { API } from "../API";

let storyTable;

const Dashboard = () => {
  let [id, setId] = useState(Number(localStorage.getItem("id")) || 1);
  let [task, setTask] = useState([]);
  let [stories, setStories] = useState([]);
  let [loading, setLoading] = useState(true);

  let getStoryDetails = () => {
    axios
      .get(`${API}/story`)
      .then((r) => {
        // console.log(r.data, "nnhjbhj");
        setStories(r.data);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  // ****************get task***********
  let getData = () => {
    axios
      .get(`${API}/tasks/${id}`)
      .then((r) => {
        // console.log(r.data, "bj", id);
        setTask(r.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        if (!e.response) {
          setLoading(true);
        } else setLoading(false);
      });
  };
  useEffect(() => {
    getStoryDetails();
    getData();
    localStorage.setItem("id", id);
  }, [id]);

  // console.log(typeof id);
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
                  setId(Number(story.storyId));
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
        <Header setId={setId} />
        <aside>
          <Story
            setShowFunc={getData}
            storyName={stories.filter((i) => i.storyId === id)}
            storyType={id}
            tasks={task}
            loading={loading}
          />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
