import React, { Component } from "react";
import "./App.css";

import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

export default class App extends Component {
  maxId = 100;
  state = {
    data: [
      {
        label: "Completed task",
        time: new Date(2024, 3, 9),
        done: true,
        id: 1,
      },
      {
        label: "Editing task",
        time: new Date(2025, 3, 15),
        done: false,
        status: "editing",
        id: 2,
      },
      {
        label: "Active task ",
        time: new Date(2025, 2, 15),
        done: false,
        id: 3,
      },
      this.createItem("Рисование"),
    ],
    activeFilter: "all",
  };

  createItem(label) {
    return {
      label: label,
      time: new Date(),
      done: false,
      id: this.maxId++,
    };
  }

  addItem = (text) => {
    this.setState(({ data }) => {
      const newArr = [...data, this.createItem(text)];
      return { data: newArr };
    });
  };

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const newData = data.filter((el) => {
        return el.id !== id;
      });
      return {
        data: newData,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const newArr = [...arr];
    const idx = newArr.findIndex((el) => el.id === id);
    newArr[idx][propName] = !newArr[idx][propName];
    return newArr;
  }

  toggleDone = (id) => {
    this.setState(({ data }) => {
      return { data: this.toggleProperty(data, id, "done") };
    });
  };

  clearDoneItems = () => {
    this.setState(({ data }) => {
      return { data: data.filter((el) => !el.done) };
    });
  };

  changeActiveFilter = (value) => {
    this.setState(() => {
      return { activeFilter: value };
    });
  };

  dataFilter = (value) => {
    if (value === "active") {
      return this.state.data.filter((el) => !el.done);
    }
    if (value === "done") {
      return this.state.data.filter((el) => el.done);
    }
    return this.state.data;
  };

  render() {
    const activeCount = this.state.data.filter((el) => !el.done).length;
    const renderData = this.dataFilter(this.state.activeFilter);
    return (
      <div className="App">
        <header
          className="header"
          onClick={() => {
            console.log(this.state.data);
          }}
        >
          <h1>todos</h1>
          <NewTaskForm onAddedItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            // todos={this.state.data}
            todos={renderData}
            onDeleted={this.deleteItem}
            onToggleDone={this.toggleDone}
            onCreateItems={this.createItem}
          />
          <Footer
            count={activeCount}
            onClear={this.clearDoneItems}
            activeFilter={this.state.activeFilter}
            changeFilter={this.changeActiveFilter}
          />
        </section>
      </div>
    );
  }
}

// function App() {
//   // const data = [
//   //   {
//   //     label: "Completed task",
//   //     time: new Date(2014, 6, 2),
//   //     status: "completed",
//   //     id: 1,
//   //   },
//   //   {
//   //     label: "Editing task",
//   //     time: new Date(2024, 6, 2),
//   //     status: "editing",
//   //     id: 2,
//   //   },
//   //   {
//   //     label: "Active task ",
//   //     time: new Date(2025, 3, 1),
//   //     id: 3,
//   //   },
//   // ];

//   const count = data.filter((el) => !el.status).length;
//   console.log(count);
//   return (
//     <div className="App">
//       <header className="header">
//         <h1>todos</h1>
//         <NewTaskForm />
//       </header>
//       <section className="main">
//         <TaskList todos={data} />
//         <Footer count={count} />
//       </section>
//     </div>
//   );
// }

// export default App;
