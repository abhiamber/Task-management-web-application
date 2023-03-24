import React from "react";
import { Route } from "react-router-dom";
import App from "./components/dashboard";
const IndexPage = () => {
  return (
    <div>
      Welcome to Scrum Master
      <br />
      <a href="/story/1">Homepage</a>
    </div>
  );
};
const NotFoundPage = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <br />
      <a href="/story/1">Homepage</a>
    </div>
  );
};
export default (
  <Route>
    <Route path="/story/:id" element={<App />} />
    <Route exact path="/" element={<IndexPage />} />
    <Route path="*" exact component={NotFoundPage} />
  </Route>
);
