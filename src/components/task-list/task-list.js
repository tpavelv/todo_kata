import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './task-list.css'

import Task from '../task'

export default class TaskList extends Component {
  state = {
    labelCash: null,
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
  }

  changeLabel = (e) => {
    this.setState(() => ({ labelCash: e.target.value }))
  }

  render() {
    const { todos, onDeleted, onToggleDone, onToggleEdit, onEditItem } = this.props

    const onSubmitForm = (e, id) => {
      e.preventDefault()
      if (this.state.labelCash) {
        onEditItem(id, this.state.labelCash)
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
              <input type="text" className="edit" defaultValue={el.label} onChange={this.changeLabel} autoFocus />
            </form>
          )}
        </li>
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
}
