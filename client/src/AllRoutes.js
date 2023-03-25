import React from "react";
import { Route, Link } from "react-router-dom";
import Dashboard from "./components/dashboard";
import App from "./components/dashboard";
const IndexPage = () => {
  return (
    <div>
      Welcome to Scrum Master
      <br />
      <Link href="/story/1">Homepage</Link>
    </div>
  );
};
const NotFoundPage = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <br />
      <Link href="/story/1">Homepage</Link>
    </div>
  );
};
export default (
  <Route>
    <Route path="/" element={<IndexPage />} />

    <Route path="/story/:id" element={<App />} />
    <Route path="*" exact component={NotFoundPage} />
  </Route>
);
