import moment from "moment";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";

function Next7Days({ todos }) {
  const [todayTodos, setTodayTodos] = useState([]);
  const [weekTodos, setWeekTodos] = useState([]);

  useEffect(() => {
    const today = moment().format("d");

    const todayTasks = todos.filter((todo) => todo.day === today);
    const weekTasks = todos.filter((todo) => todo.day !== today);

    const sortedWeekTasks = ["0", "1", "2", "3", "4", "5", "6"].map((day) => {
      return {
        todos: weekTasks.filter((todo) => todo.day === day),
        number: day,
      };
    });

    const arrangeDays = sortedWeekTasks
      .slice(parseInt(today))
      .concat(sortedWeekTasks.slice(0, parseInt(today)));

    setTodayTodos(todayTasks);
    setWeekTodos(arrangeDays);
  }, [todos]);

  return (
    <div className="Next7Days">
      <div className="day today">
        <div className="name">
          {moment().format("dddd")} (Today)
        </div>
        <div className="todos">
          {todayTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
      <div className="week">
        <div className="week-title">This Week</div>
        {weekTodos.map((day) => (
          <div key={day.number} className="day">
            <div className="todos">
              {day.todos.map((todo) => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Next7Days;
