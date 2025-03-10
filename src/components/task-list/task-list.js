import React from "react";
import "./task-list.css";

import Task from "../task";

const TaskList = ({ todos, onDeleted }) => {
  const elements = todos.map((el) => {
    const { id } = el;
    return (
      <li className={el.status} key={el.id}>
        <Task {...el} onDeleted={() => onDeleted(id)} />
        {el.status === "editing" && (
          <input type="text" className="edit" defaultValue={el.label} />
        )}
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};
export default TaskList;
