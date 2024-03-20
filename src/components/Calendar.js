import React, { useContext } from "react";
import { CalendarDate, CaretUp } from "react-bootstrap-icons";
import { calendarItems } from "../constants";
import { TodoContext } from "../context";
import {FaTasks} from "react-icons/fa"
import { MdDoubleArrow } from "react-icons/md";
import { MdDoneAll } from "react-icons/md";
function Calendar() {
  // CONTEXT
  const { setSelectedProject } = useContext(TodoContext);

  return (
    <div className="Calendar">
      <div className="header">
        <div className="title">
          <p>Tasks</p>
        </div>
        <div className="btns">
          <span>
            <CaretUp size="20" />
          </span>
        </div>
      </div>
      <div className="items">
  <div className="item" onClick={() => setSelectedProject(calendarItems[0])}>
    <FaTasks />
    {calendarItems[0]}
  </div>
  <div className="item" onClick={() => setSelectedProject(calendarItems[1])}>
  <MdDoubleArrow />
    {calendarItems[1]}
  </div>
  <div className="item" onClick={() => setSelectedProject(calendarItems[2])}>
  <MdDoneAll />
    {calendarItems[2]}
  </div>
</div>
    </div>
  );
}

export default Calendar;
