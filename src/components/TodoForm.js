import React from "react";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";
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
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={handleSubmit} className="TodoForm">
        <div className="text">
          {heading && <h3>{heading}</h3>}
          <input
            spellcheck="false"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Task name"
            autoFocus
          />
        </div>
        {/* <div className="text">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Description"
            autoFocus
          />
        </div> */}
        {/* <div c
        {/* <div className="remind">
          <Bell />
          <p>Remind Me!</p>
        </div> */}
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
        {showButtons && (
          <div>
            <div className="cancel" onClick={() => setShowModal(false)}>
              <X size="40" />
            </div>
            <div className="confirm">
              <button>Add to do</button>
            </div>
          </div>
        )}
      </form>
    </MuiPickersUtilsProvider>
  );
}

export default TodoForm;
