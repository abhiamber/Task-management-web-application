import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./common/Header";

import { Link } from "react-router-dom";
import AddStory from "./form/AddStory";
import { Story } from "./Story";
import { API } from "../API";

const Dashboard = () => {
  let [stories, setStories] = useState([]);
  let [loading, setLoading] = useState(false);
  let [selectedStory, setSelectedStory] = useState();
  let [users, setUsers] = useState([]);
  let [task, setTask] = useState([]);

  let getSingleStory = async () => {
    setLoading(true);
    try {
      let { data } = await axios.get(`${API}/tasks/${selectedStory._id}`);
      setTask(data);
    } catch (err) {}
    setLoading(false);
  };

  let getAllStory = async () => {
    setLoading(true);
    try {
      let { data } = await axios.get(`${API}/story`);
      setStories(data);
    } catch (err) {}
    setLoading(false);
  };

  let getUsers = async () => {
    try {
      let { data } = await axios.get(`${API}/users`);
      setUsers(data);
    } catch (err) {}
  };

  useEffect(() => {
    getAllStory();
  }, []);

  useEffect(() => {
    if (selectedStory) {
      getSingleStory();
      getUsers();
    }
  }, [selectedStory]);

  return (
    <div>
      <div className="side">
        <Link to="/">
          <span className="logo">Task Manager</span>
        </Link>

        <ul className="side-menu">
          {stories?.map((story, index) => {
            return (
              <li
                key={index}
                onClick={() => setSelectedStory(story)}
                className="pt-3"
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-list-alt" />
                <span className="menu-text">{story.title}</span>
              </li>
            );
          })}
        </ul>

        <div className="otherMenu">
          <AddStory setShowFunc={getAllStory} users={users} />
        </div>
      </div>
      <div className="con">
        <Header getUsers={getUsers} />
        <aside>
          {selectedStory && (
            <Story
              setShowFunc={getSingleStory}
              selectedStory={selectedStory}
              tasks={task}
              loading={loading}
            />
          )}
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
