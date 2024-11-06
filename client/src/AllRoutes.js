import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/story" element={<Dashboard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default AllRoutes;

const NotFoundPage = () => {
  return (
    <div>
      <h2 className="pt-5">No Page Found</h2>
      <Link to="/story">Homepage</Link>
    </div>
  );
};

const IndexPage = () => {
  return (
    <div>
      <h2 className="pt-5"> Welcome to Scrum Master</h2>
      <Link to="/story">Homepage</Link>
    </div>
  );
};
