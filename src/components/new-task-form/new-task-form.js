import React, { Component } from 'react'
import './new-task-form.css'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  static propTypes = {
    onAddedItem: PropTypes.func.isRequired,
  }

  changeLabel = (e) => {
    this.setState(() => ({ label: e.target.value }))
  }

  submitForm = (e) => {
    e.preventDefault()
    if (!this.state.label.trim()) {
      // alert('Нельзя добавить пустую задачу')
    } else {
      this.props.onAddedItem(this.state.label)
    }
    this.setState(() => ({ label: '' }))
  }

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
    )
  }
}
