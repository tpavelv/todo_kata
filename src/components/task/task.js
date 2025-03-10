import React, { Component } from "react";
import "./task.css";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

export default class Task extends Component {
  state = {
    done: this.props.done ? true : false,
  };

  onLabelClick = () => {
    this.setState(({ done }) => {
      return { done: !done };
    });
  };

  render() {
    const { label, time, onDeleted } = this.props;
    const { done } = this.state;

    const timeToNow = formatDistance(time, new Date(), {
      addSuffix: true,
      locale: ru,
    });
    let classNames = "view";
    if (done) {
      classNames += " done";
    }
    return (
      <div
        className={classNames}
        // onClick={(e) => {
        //   if (e.target.nodeName === "BUTTON") {
        //     console.log("button");
        //   } else this.onLabelClick();
        // }}
      >
        <input className="toggle" type="checkbox" />
        <label onClick={this.onLabelClick}>
          <span className="description">{label}</span>
          <span className="created">{timeToNow}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}

// const Task = ({ label, time }) => {
//   const timeToNow = formatDistance(time, new Date(), {
//     addSuffix: true,
//     locale: ru,
//   });

//   return (
//     <div className="view">
//       <input className="toggle" type="checkbox" />
//       <label>
//         <span className="description">{label}</span>
//         <span className="created">{timeToNow}</span>
//       </label>
//       <button className="icon icon-edit"></button>
//       <button className="icon icon-destroy"></button>
//     </div>
//   );
// };

// export default Task;
