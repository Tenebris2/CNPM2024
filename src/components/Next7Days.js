import moment from "moment";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";

function Next7Days({ todos }) {
  const [todayTodos, setTodayTodos] = useState([]);
  const [tomorrowTodos, setTomorrowTodos] = useState([]);
  const [weekTodos, setWeekTodos] = useState([]);

  useEffect(() => {
    const today = moment().format("d");
    const tomorrow = moment().add(1, "day").format("d");

    const todayTasks = todos.filter((todo) => todo.day === today);
    const tomorrowTasks = todos.filter((todo) => todo.day === tomorrow);
    const weekTasks = todos.filter(
      (todo) => todo.day !== today && todo.day !== tomorrow
    );

    setTodayTodos(todayTasks);
    setTomorrowTodos(tomorrowTasks);
    setWeekTodos(weekTasks);
  }, [todos]);

  return (
    <div className="Next7Days">
      <div className="day today">
        <div className="name">{moment().format("dddd")} (Today)</div>
        <div className="todos">
          {todayTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
      <div className="day tomorrow">
        <div className="name">
          {moment().add(1, "day").format("dddd")} (Tomorrow)
        </div>
        <div className="todos">
          {tomorrowTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
      <div className="week">
        <div className="week-title">This Week</div>
        {weekTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default Next7Days;
