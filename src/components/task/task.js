import React from "react";
import "./task.css";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

const Task = ({ label, time }) => {
  const timeToNow = formatDistance(time, new Date(), {
    addSuffix: true,
    locale: ru,
  });
  console.log(timeToNow);
  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">{label}</span>
        <span className="created">{timeToNow}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  );
};

export default Task;
