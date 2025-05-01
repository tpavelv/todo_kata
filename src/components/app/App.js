import React, { Component } from 'react'
import './App.css'

// import { interval } from 'date-fns'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

export default class App extends Component {
  maxId = 100

  state = {
    data: [
      {
        label: 'Completed ',
        time: new Date(2024, 3, 9),
        done: true,
        id: 1,
        edit: false,
        timer: null,
      },
      {
        label: 'Editing task',
        time: new Date(2025, 3, 15),
        done: false,
        edit: false,
        id: 2,
        timer: 65000,
      },
      {
        label: 'Active task ',
        time: new Date(2025, 2, 15),
        done: false,
        id: 3,
        edit: false,
        timer: 60000,
      },
      this.createItem('Рисование', 60000),
    ],

    activeFilter: 'all',
  }

  intervalId = null

  createItem(label, timer) {
    this.maxId += 1
    return {
      label,
      timer,
      time: new Date(),
      done: false,
      id: this.maxId,
      edit: false,
    }
  }

  addItem = (text, time) => {
    this.setState(({ data }) => {
      const newArr = [...data, this.createItem(text, time)]
      return { data: newArr }
    })
  }

  deleteItem = (id) => {
    clearTimeout(this.intervalId)

    this.setState(({ data }) => {
      const newData = data.filter((el) => el.id !== id)
      return {
        data: newData,
      }
    })
  }

  editItem = (id, newLabel) => {
    this.setState(({ data }) => {
      const newArr = [...data]
      const idx = newArr.findIndex((el) => el.id === id)
      newArr[idx].label = newLabel
      return { data: newArr }
    })
  }

  static toggleProperty(arr, id, propName) {
    const newArr = [...arr]
    const idx = newArr.findIndex((el) => el.id === id)
    newArr[idx][propName] = !newArr[idx][propName]
    return newArr
  }

  static clearTimeoutInDoneTask(arr, id) {
    const newArr = [...arr]
    const idx = newArr.findIndex((el) => el.id === id)
    newArr[idx].timer = null
    return newArr
  }

  toggleEdit = (id) => {
    this.setState(({ data }) => ({ data: App.toggleProperty(data, id, 'edit') }))
  }

  toggleDone = (id) => {
    this.setState(({ data }) => ({ data: App.toggleProperty(data, id, 'done') }))
    this.setState(({ data }) => ({ data: App.clearTimeoutInDoneTask(data, id) }))
  }

  clearDoneItems = () => {
    this.setState(({ data }) => ({ data: data.filter((el) => !el.done) }))
  }

  changeActiveFilter = (value) => {
    this.setState(() => ({ activeFilter: value }))
  }

  dataFilter = (value) => {
    switch (value) {
      case 'active':
        return this.state.data.filter((el) => !el.done)
      case 'done':
        return this.state.data.filter((el) => el.done)
      default:
        return this.state.data
    }
  }

  render() {
    const activeCount = this.state.data.filter((el) => !el.done).length
    const renderData = this.dataFilter(this.state.activeFilter)
    return (
      <div className="App">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddedItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={renderData}
            onDeleted={this.deleteItem}
            onToggleDone={this.toggleDone}
            onCreateItems={this.createItem}
            onToggleEdit={this.toggleEdit}
            onEditItem={this.editItem}
          />

          <Footer
            count={activeCount}
            onClear={this.clearDoneItems}
            activeFilter={this.state.activeFilter}
            changeFilter={this.changeActiveFilter}
          />
        </section>
      </div>
    )
  }
}
