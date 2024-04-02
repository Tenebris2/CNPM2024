import React, { useContext, useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";
import moment from "moment";
import firebase from "../firebase";
import EditTodoForm from "./EditTodoForm";
import { MdClose } from "react-icons/md";

function EditTodo() {
  // STATE
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState("");
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  // CONTEXT
  const { selectedTodo, projects, setSelectedTodo } = useContext(TodoContext);

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setDay(moment(selectedTodo.date, "MM/DD/YYYY").toDate());
      setTime(moment(selectedTodo.time, "hh:mm A").toDate());
      setTodoProject(selectedTodo.projectName);
      setShowForm(true); // Show form when todo is selected
    } else {
      setShowForm(false); // Close form if no todo is selected
    }
  }, [selectedTodo]);

  useEffect(() => {
    if (selectedTodo) {
      firebase
        .firestore()
        .collection("todos")
        .doc(selectedTodo.id)
        .update({
          text,
          date: moment(day).format("MM/DD/YYYY"),
          day: moment(day).format("d"),
          time: moment(time).format("hh:mm A"),
          projectName: todoProject,
        });
    }
  }, [text, day, time, todoProject]);

  function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission if needed
  }

  function handleClose() {
    setSelectedTodo(null); // Deselect the todo
  }

  return (
    <div>
      {showForm && selectedTodo && (
        <div className="EditTodo">
          <div className="headerbar">
            <div className="header">Task:</div>
            <button onClick={handleClose}>
              <MdClose size={28} className="closeIcon" />
            </button>
          </div>
          <div className="container">
            <EditTodoForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              day={day}
              setDay={setDay}
              time={time}
              setTime={setTime}
              todoProject={todoProject}
              setTodoProject={setTodoProject}
              projects={projects}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EditTodo;
