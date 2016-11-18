import React from 'react';

export default function TaskForm(props) {
  const handleSubmit = (event) => {
  // stop event from leaving the form and keep page from refreshing
  event.preventDefault();

  props.addTask(
    event.target.taskName.value,
    event.target.taskDesc.value
    );
  // from any event handler this will also kill the event
  return false;
};

  return (
  <form className="form-inline" onSubmit={handleSubmit}>

    <div className="form-group">
      <label className="sr-only" htmlFor="taskName">Task Name</label>
      <input type="text" className="form-control input-lg" name="taskName" placeholder="Task Name" />
    </div>

    <div className="form-group">
      <label className="sr-only" htmlFor="taskDesc">Task Description</label>
      <input type="text" className="form-control input-lg" name="taskDesc" placeholder="Task Description" />
    </div>
    <button type="submit" className="btn btn-danger btn-lg">Add Task</button>
  </form>
  );
}


