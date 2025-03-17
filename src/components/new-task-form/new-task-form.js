import React, { Component } from "react";
import "./new-task-form.css";

export default class NewTaskForm extends Component {
  state = {
    label: "",
  };

  changeLabel = (e) => {
    this.setState(() => {
      return { label: e.target.value };
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    this.props.onAddedItem(this.state.label);
    this.setState(() => {
      return { label: "" };
    });
  };

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.changeLabel}
          value={this.state.label}
        />
      </form>
    );
  }
}
