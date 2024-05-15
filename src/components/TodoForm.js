import React, { useState } from "react";
import { X } from "react-bootstrap-icons";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function TodoForm({
  handleSubmit,
  heading = false,
  text,
  setText,
  day,
  setDay,
  time,
  setTime,
  todoProject,
  setTodoProject,
  projects,
  showButtons = false,
  setShowModal = false,
}) {
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!todoProject) {
      setError("Please select a project.");
      return;
    }
    setError("");
    handleSubmit(e);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={onSubmit} className="TodoForm">
        <div className="text">
          {heading && <h3>{heading}</h3>}
          <input
            spellCheck="false"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Task name"
            autoFocus
          />
        </div>
        <div className="pick-day">
          <div className="title">
            <p>Due date</p>
            <DatePicker
              value={day}
              onChange={(day) => setDay(day)}
              format="dd-MM-yy"
            />
          </div>
        </div>
        <div className="pick-time">
          <div className="title">
            <p>Choose time</p>
            <TimePicker value={time} onChange={(time) => setTime(time)} />
          </div>
        </div>
        <div className="pick-project">
          <div className="title">
            <p>List</p>
            <div className="projects">
              {projects.length > 0 ? (
                <select
                  className="selectList"
                  value={todoProject}
                  onChange={(e) => setTodoProject(e.target.value)}
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option value={project.name} key={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div style={{ color: "#ff0000" }}>
                  Please add a project before proceeding
                </div>
              )}
            </div>
          </div>
        </div>
        {error && <div style={{ color: "#ff0000" }}>{error}</div>}
        {showButtons && (
          <div>
            <div className="cancel" onClick={() => setShowModal(false)}>
              <X size="40" />
            </div>
            <div className="confirm">
              <button type="submit">Add to do</button>
            </div>
          </div>
        )}
      </form>
    </MuiPickersUtilsProvider>
  );
}

export default TodoForm;
