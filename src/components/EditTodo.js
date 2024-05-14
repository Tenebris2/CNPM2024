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
  const { selectedTodo, projects, setSelectedTodo } = useContext(TodoContext);

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setDay(moment(selectedTodo.date, "DD/MM/YYYY").toDate());
      setTime(moment(selectedTodo.time, "hh:mm A").toDate());
      setTodoProject(selectedTodo.projectName);
      setShowForm(true); // Show form when todo is selected
    } else {
      setShowForm(false); // Close form if no todo is selected
    }
  }, [selectedTodo]);

  const handleSubmit = (formData) => {
    if (formData.text.trim() === "") {
      return; // Don't save if text is empty
    }

    const todoRef = firebase
      .firestore()
      .collection("todos")
      .doc(selectedTodo.id);

    if (formData.text !== selectedTodo.text) {
      todoRef.update({ text: formData.text });
    }
    if (
      formData.day !== selectedTodo.date ||
      formData.time !== selectedTodo.time
    ) {
      todoRef.update({
        date: moment(formData.day).format("DD/MM/YYYY"),
        day: moment(formData.day).format("d"),
        time: moment(formData.time).format("hh:mm A"),
      });
    }
    if (formData.todoProject !== selectedTodo.projectName) {
      todoRef.update({ projectName: formData.todoProject });
    }

    setSelectedTodo(null); // Deselect the todo
  };

  const handleDelete = () => {
    firebase.firestore().collection("todos").doc(selectedTodo.id).delete();
    setSelectedTodo(null); // Deselect the todo
  };

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
              handleDelete={handleDelete}
              initialText={text}
              initialDay={day}
              initialTime={time}
              initialTodoProject={todoProject}
              projects={projects}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EditTodo;
