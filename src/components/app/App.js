import React, { useRef, useState } from 'react'
import './App.css'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

const startData = [
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
]

const App = () => {
  const maxIdRef = useRef(100)

  const [data, setData] = useState(startData)

  const [activeFilter, setActiveFilter] = useState('all')

  const createItem = (label, timer) => {
    maxIdRef.current += 1
    return {
      label,
      timer,
      time: new Date(),
      done: false,
      id: maxIdRef.current,
      edit: false,
    }
  }

  const addItem = (text, time) => {
    setData((prevData) => {
      const newArr = [...prevData, createItem(text, time)]
      return newArr
    })
  }

  const deleteItem = (id) => {
    // clearTimeout(intervalIdRef.current)
    setData((prevData) => {
      const newData = prevData.filter((el) => el.id !== id)
      return newData
    })
  }

  const editItem = (id, newLabel) => {
    setData((prevData) => {
      const newArr = [...prevData]
      const idx = newArr.findIndex((el) => el.id === id)
      newArr[idx].label = newLabel

      return newArr
    })
  }

  const toggleProperty = (arr, id, propName) => {
    const newArr = [...arr]
    const idx = newArr.findIndex((el) => el.id === id)
    newArr[idx][propName] = !newArr[idx][propName]
    return newArr
  }

  const toggleEdit = (id) => {
    setData((prevData) => toggleProperty(prevData, id, 'edit'))
  }

  const toggleDone = (id) => {
    setData((prevData) => toggleProperty(prevData, id, 'done'))
  }

  const clearDoneItems = () => {
    setData((prevData) => prevData.filter((el) => !el.done))
  }

  const changeActiveFilter = (value) => {
    setActiveFilter(value)
  }

  const dataFilter = (value) => {
    switch (value) {
      case 'active':
        return data.filter((el) => !el.done)
      case 'done':
        return data.filter((el) => el.done)
      default:
        return data
    }
  }

  const activeCount = data.filter((el) => !el.done).length
  const renderData = dataFilter(activeFilter)

  return (
    <div className="App">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddedItem={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={renderData}
          onDeleted={deleteItem}
          onToggleDone={toggleDone}
          onCreateItems={createItem}
          onToggleEdit={toggleEdit}
          onEditItem={editItem}
        />

        <Footer
          count={activeCount}
          onClear={clearDoneItems}
          activeFilter={activeFilter}
          changeFilter={changeActiveFilter}
        />
      </section>
    </div>
  )
}

export default App
