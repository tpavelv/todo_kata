import React from 'react'
import PropTypes from 'prop-types'
import './task-filter.css'

const TaskFilter = (props) => {
  const { changeFilter, activeFilter } = props

  const finalClassName = (value, dataAtr) => {
    if (value === dataAtr) {
      return 'selected'
    }
    return ''
  }

  return (
    <ul className="filters" onClick={(e) => changeFilter(e.target.dataset.type)}>
      <li>
        <button className={finalClassName(activeFilter, 'all')} data-type="all">
          All
        </button>
      </li>
      <li>
        <button data-type="active" className={finalClassName(activeFilter, 'active')}>
          Active
        </button>
      </li>
      <li>
        <button data-type="done" className={finalClassName(activeFilter, 'done')}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilter.defaultProps = {
  activeFilter: 'all',
}

TaskFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.string,
}
export default TaskFilter
