import React, { Component } from "react";
import "./task.css";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export default class Task extends Component {
  render() {
    const { label, time, done, onDeleted, onToggleDone } = this.props;

    const timeToNow = formatDistanceToNow(time, {
      addSuffix: true,
      locale: ru,
    });

    let classNames = "view";
    if (done) {
      classNames += " done";
    }
    return (
      <div className={classNames}>
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={onToggleDone}
        />
        <label onClick={onToggleDone}>
          <span className="description">{label}</span>
          <span className="created">{timeToNow}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
