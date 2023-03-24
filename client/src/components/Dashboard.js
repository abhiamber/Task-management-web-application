import React, { useState } from "react";
import axios from "axios";
import Header from "./common/Header";

import { Link } from "react-router-dom";
import Loader from "./Loader";
import AddStory from "./form/AddStory";
import { Story } from "./Story";

let storyTable;

const Dashboard = () => {
  let [open, setOpen] = useState(false);
  let [show, setShow] = useState(true);
  let [task, setTask] = useState([]);
  let [stories, setStories] = useState([]);
  let [err, setErr] = useState("");
  let [err2, setErr2] = useState("");
  let [loading, setLoading] = useState(true);
  let [loadingStory, setLoadingStories] = useState(true);
  let componentDidMount = () => {
    getStoryDetails();
    getData();
    setInterval(() => {
      getData();
    }, 2000);
  };

  let getStoryDetails = () => {
    axios
      .get(`/story`)
      .then((r) => {
        console.log(r.data, "nnhjbhj");
        setStories([]);
        setErr2("");
      })
      .then(() => {
        setLoadingStories(false);
      })
      .catch((e) => {
        setLoadingStories(true);

        setErr2(e);
      });
  };
  let getData = () => {
    axios
      .get(`/tasks/${this.props.params.id}`)
      .then((r) => {
        setTask([]);
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

  if (!loadingStory)
    storyTable = stories.map((story, index) => {
      return (
        <li key={index}>
          <Link to={`/story/${story.storyId}`} activeClassName="active">
            <i className="fas fa-list-alt"></i>
            <span className="menu-text">{story.title}</span>
          </Link>
        </li>
      );
    });
  else
    storyTable = (
      <li>
        <div className="loader">
          <Loader />
        </div>
      </li>
    );
  return (
    <div>
      <div className="side">
        <span className="logo">Scrum Beta</span>

        <ul className="side-menu">{storyTable}</ul>

        <div className="otherMenu">
          <AddStory />
        </div>
      </div>
      <div className="con">
        <Header />
        <aside>
          <Story
            storyName={stories.filter((i) => i.storyId === 2)}
            storyType={2}
            tasks={task}
            loading={loading}
          />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
