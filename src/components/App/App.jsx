import React     from 'react';
import Nav       from '../Nav/Nav';
import TaskForm  from '../TaskForm';
import Footer    from '../Footer/Footer';
import TaskList  from '../TaskList';
import AjaxAdapter from '../../Helpers/AjaxAdapter';

import './App.css';
import './GA_gear.png';

class Task {
  constructor(name, desc) {
    this.name = name;
    this.desc = desc;
  }
}

export default class App extends React.Component {

  constructor(props) {
    super();

    this.state = {
      tasks: {},
    };

    this.addTask = this.addTask.bind(this);
  }

  componentDidMount() {
    AjaxAdapter.getTasks()
    .then(allTasks =>
      this.setState({ tasks: allTasks })
      )
    .catch((error) => {
      throw error;
    });
  }


  addTask(name, desc) {

    AjaxAdapter.createTask({ name, desc })
      .then((newTask) => {
        const newState = { ...this.state.tasks };
        newState[newTask.id] = newTask;
        this.setState({ tasks: newState });
        })
      .catch((error) => {
        throw error;
      });

  }

  render() {
    return (
      <container>
        <header>
          <Nav />
        </header>
        <main className="container">
          <section className="jumbotron">
            <h1>Task Manager</h1>
            <TaskForm addTask={this.addTask} />
          </section>
          {/* to do lists */}
          <section className="row">
        {/* these are the open tasks*/}
            <article className="col-md-4">
              <h3>Open Items</h3>
              <TaskList
                filter={task => !task.completed && !task.deleted}
                collection={this.state.tasks}
              />
            </article>

   {/* these are the completed tasks*/}
            <article className="col-md-4">
              <h3>Completed Items</h3>
              <TaskList
                filter={task => task.completed && !task.deleted}
                collection={this.state.tasks}
              />
            </article>

   {/* these are the deleted tasks*/}
            <article className="col-md-4">
              <h3>Deleted Items</h3>
              <TaskList
                filter={task => task.deleted}
                collection={this.state.tasks}
              />
            </article>
          </section>
        </main>
        <footer>
          <Footer />
        </footer>

      </container>
    );
  }

}
