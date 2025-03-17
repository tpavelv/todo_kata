import React from "react";
import "./footer.css";

import TaskFilter from "../task-filter";

const Footer = ({ count, onClear, activeFilter, changeFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TaskFilter changeFilter={changeFilter} activeFilter={activeFilter} />
      <button className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
