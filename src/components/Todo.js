import React, { useContext, useState, useEffect } from "react";
import {
  ArrowClockwise,
  CheckCircleFill,
  Circle,
  Trash,
  ChevronRight,
  XCircleFill,
} from "react-bootstrap-icons";
import { TodoContext } from "../context";
import firebase from "../firebase";
import moment from "moment";

function Todo({ todo }) {
  // STATE
  const [hover, setHover] = useState(false);

  // CONTEXT
  const { setSelectedTodo } = useContext(TodoContext);

  const isDeadlinePassed = (todo) => {
    const currentDateTime = moment();
    const deadlineDateTime = moment(
      `${todo.date} ${todo.time}`,
      "DD/MM/YYYY hh:mm A"
    );
    return (
      currentDateTime.isAfter(deadlineDateTime) ||
      currentDateTime.isSame(deadlineDateTime)
    );
  };

  const handleCheckDeadline = (todo) => {
    const isNotified = localStorage.getItem(`notification_${todo.id}`);
    if (!todo.checked && isDeadlinePassed(todo) && !isNotified) {
      alert(`Thời gian deadline của todo "${todo.text}" đã quá hạn.`);
      localStorage.setItem(`notification_${todo.id}`, "true");
    }
  };

  useEffect(() => {
    handleCheckDeadline(todo);
  }, [todo]);

  const handleDelete = () => {
    deleteTodo(todo);
  };

  const deleteTodo = (todo) => {
    firebase.firestore().collection("todos").doc(todo.id).delete();
  };

  const checkTodo = () => {
    firebase.firestore().collection("todos").doc(todo.id).update({
      checked: !todo.checked,
    });
  };

  const repeatNextDay = () => {
    const nextDayDate = moment(todo.date, "DD/MM/YYYY").add(1, "days");

    const repeatedTodo = {
      ...todo,
      checked: false,
      date: nextDayDate.format("DD/MM/YYYY"),
      day: nextDayDate.format("d"),
    };

    delete repeatedTodo.id;

    firebase.firestore().collection("todos").add(repeatedTodo);
  };

  const handleTodoClick = () => {
    setSelectedTodo(todo);
  };

  return (
    <div className="Todo">
      <div
        className="todo-container hvr-grow-shadow"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="check-todo" onClick={checkTodo}>
          {!todo.checked && isDeadlinePassed(todo) ? (
            <span className="checked">
              <XCircleFill color="red" />
            </span>
          ) : todo.checked ? (
            <span className="checked">
              <CheckCircleFill color="#bebebe" />
            </span>
          ) : (
            <span className="unchecked">
              <Circle color={todo.color} />
            </span>
          )}
        </div>
        <div className="text" onClick={handleTodoClick}>
          <p style={{ color: todo.checked ? "#bebebe" : "#000000" }}>
            {todo.text}
          </p>
          <span className="tagTodo">
            {todo.time} &nbsp; | {todo.date} | &nbsp; {todo.projectName}
          </span>
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>
        <div className="delete-todo" onClick={handleDelete}>
          <span>
            <ChevronRight />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Todo;
