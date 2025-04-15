import React, { Component } from 'react'
import './new-task-form.css'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  static propTypes = {
    onAddedItem: PropTypes.func.isRequired,
  }

  changeLabel = (e) => {
    this.setState(() => ({ label: e.target.value }))
  }

  changeTime = (e, min) => {
    if (min) {
      this.setState(() => ({ minutes: e.target.value }))
    } else {
      this.setState(() => ({ seconds: e.target.value }))
    }
  }

  convertTime = () => (+this.state.minutes * 60 + +this.state.seconds) * 1000

  validateForm = () => {
    let message
    if (!this.state.label.trim()) {
      message = 'Нельзя добавить пустую задачу'
    }
    if (!this.state.minutes.trim() && !this.state.seconds.trim()) {
      message = 'Добавьте время выполнения задачи'
    }
    if (Number.isNaN(Number(this.state.minutes))) {
      message = 'Не корректно указаны минуты'
    }
    if (Number.isNaN(Number(this.state.seconds))) {
      message = 'Не корректно указаны секунды'
    }
    return message
  }

  submitForm = (e) => {
    e.preventDefault()
    const message = this.validateForm()

    if (message) {
      alert(message)
    } else {
      this.props.onAddedItem(this.state.label, this.convertTime())
    }
    this.setState(() => ({ label: '', minutes: '', seconds: '' }))
  }

  render() {
    return (
      <form onSubmit={this.submitForm} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.changeLabel}
          value={this.state.label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={(e) => {
            this.changeTime(e, true)
          }}
          value={this.state.minutes}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.changeTime}
          value={this.state.seconds}
        />
        <button type="submit" />
      </form>
    )
  }
}
