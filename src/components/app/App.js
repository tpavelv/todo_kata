import React, { Component } from "react";
import "./App.css";

import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

export default class App extends Component {
  state = {
    data: [
      {
        label: "Completed task",
        time: new Date(2014, 6, 2),
        done: true,
        // status: "completed",
        id: 1,
      },
      {
        label: "Editing task",
        time: new Date(2024, 6, 2),
        status: "editing",
        id: 2,
      },
      {
        label: "Active task ",
        time: new Date(2025, 3, 1),
        id: 3,
      },
    ],
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

  render() {
    const count = this.state.data.filter((el) => !el.status).length;

    return (
      <div className="App">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList todos={this.state.data} onDeleted={this.deleteItem} />
          <Footer count={count} />
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
