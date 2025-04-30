import React, { useState } from 'react'
import './new-task-form.css'
import PropTypes from 'prop-types'

const NewTaskForm = ({ onAddedItem }) => {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const changeLabel = (e) => {
    setLabel(e.target.value)
  }

  const changeTime = (e, min) => {
    if (min) {
      setMinutes(e.target.value)
    } else {
      setSeconds(e.target.value)
    }
  }

  const convertTime = () => (+minutes * 60 + +seconds) * 1000

  const validateForm = () => {
    let message
    if (!label.trim()) {
      message = 'Нельзя добавить пустую задачу'
    }
    if (!minutes.trim() && !seconds.trim()) {
      message = 'Добавьте время выполнения задачи'
    }
    if (Number.isNaN(Number(minutes))) {
      message = 'Не корректно указаны минуты'
    }
    if (Number.isNaN(Number(seconds))) {
      message = 'Не корректно указаны секунды'
    }
    return message
  }

  const submitForm = (e) => {
    e.preventDefault()
    const message = validateForm()

    if (message) {
      alert(message)
    } else {
      onAddedItem(label, convertTime())
    }

    setLabel('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <form onSubmit={submitForm} className="new-todo-form">
      <input className="new-todo" placeholder="What needs to be done?" autoFocus onChange={changeLabel} value={label} />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(e) => {
          changeTime(e, true)
        }}
        value={minutes}
      />
      <input className="new-todo-form__timer" placeholder="Sec" onChange={changeTime} value={seconds} />
      <button type="submit" />
    </form>
  )
}

NewTaskForm.propTypes = {
  onAddedItem: PropTypes.func.isRequired,
}
export default NewTaskForm
