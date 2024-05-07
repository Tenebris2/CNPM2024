import React, { useState, useEffect } from "react";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function EditTodoForm({
  handleSubmit,
  handleDelete,
  heading = false,
  initialText,
  initialDay,
  initialTime,
  initialTodoProject,
  projects,
  showButtons = false,
  setShowModal = false,
}) {
  const [text, setText] = useState(initialText);
  const [day, setDay] = useState(initialDay);
  const [time, setTime] = useState(initialTime);
  const [todoProject, setTodoProject] = useState(initialTodoProject);

  // State to track form data changes
  const [formData, setFormData] = useState({
    text: initialText,
    day: initialDay,
    time: initialTime,
    todoProject: initialTodoProject,
  });

  // Update formData state when any form field changes
  useEffect(() => {
    setFormData({
      text,
      day,
      time,
      todoProject,
    });
  }, [text, day, time, todoProject]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        className="EditTodoForm"
      >
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

        <div className="editConBtn">
          <button className="deleteTaskBtn" onClick={handleDelete}>
            Delete task
          </button>
          <button className="saveChangesBtn" type="submit">
            Save changes
          </button>
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

export default EditTodoForm;
