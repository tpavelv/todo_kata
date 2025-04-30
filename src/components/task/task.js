import React from 'react'
import PropTypes from 'prop-types'
import './task.css'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

import Timer from '../timer'

const Task = (props) => {
  const { label, time = new Date(), done = false, timer } = props
  const { onDeleted, onToggleDone, onToggleEdit, onStartTimer, onPausedTimer } = props

  const timeToNow = formatDistanceToNow(time, {
    addSuffix: true,
    locale: ru,
  })

  let classNames = 'view'
  if (done) {
    classNames += ' done'
  }

  return (
    <div className={classNames}>
      <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
      <label>
        <span className="description" onClick={onToggleDone}>
          {label}
        </span>
        <Timer timer={timer} onStartTimer={onStartTimer} onPausedTimer={onPausedTimer} />
        <span className="created">{timeToNow}</span>
      </label>
      <button className="icon icon-edit" onClick={onToggleEdit}></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  )
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  time: PropTypes.object.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
}

export default Task
