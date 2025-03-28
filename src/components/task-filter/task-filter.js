import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './task-filter.css'

export default class TaskFilter extends Component {
  static defaultProps = {
    activeFilter: 'all',
  }

  static propTypes = {
    changeFilter: PropTypes.func.isRequired,
    activeFilter: PropTypes.string,
  }

  static finalClassName(value, dataAtr) {
    if (value === dataAtr) {
      return 'selected'
    }
    return ''
  }

  render() {
    const { changeFilter, activeFilter } = this.props

    return (
      <ul className="filters" onClick={(e) => changeFilter(e.target.dataset.type)}>
        <li>
          <button className={TaskFilter.finalClassName(activeFilter, 'all')} data-type="all">
            All
          </button>
        </li>
        <li>
          <button data-type="active" className={TaskFilter.finalClassName(activeFilter, 'active')}>
            Active
          </button>
        </li>
        <li>
          <button data-type="done" className={TaskFilter.finalClassName(activeFilter, 'done')}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
