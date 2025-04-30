import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './task-list.css'

import Task from '../task'

const TaskList = ({ todos, onDeleted, onToggleDone, onToggleEdit, onEditItem }) => {
  const [labelCash, setLabelCash] = useState(null)

  const changeLabel = (e) => {
    setLabelCash(e.target.value)
  }

  const onSubmitForm = (e, id) => {
    e.preventDefault()
    if (labelCash) {
      onEditItem(id, labelCash)
    }
    onToggleEdit(id)
  }

  const elements = todos.map((el) => {
    const { id } = el
    return (
      <li className={el.edit ? 'editing' : null} key={el.id}>
        <Task
          {...el}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleEdit={() => onToggleEdit(id)}
        />
        {el.edit && (
          <form onSubmit={(e) => onSubmitForm(e, el.id)}>
            <input type="text" className="edit" defaultValue={el.label} onChange={changeLabel} autoFocus />
          </form>
        )}
      </li>
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
}

export default TaskList
