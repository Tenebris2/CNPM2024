import moment from "moment";
import { useState, useEffect } from "react";
import firebase from "../firebase";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("todos")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setTodos(data);
      });

    return () => unsubscribe();
  }, []);

  return todos;
}

export function useFilterTodos(todos, selectedProject) {
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let data;
    const todayDateFormatted = moment().format("DD/MM/YYYY");

    if (selectedProject === "Today") {
      data = todos.filter((todo) => todo.date === todayDateFormatted);
    } else if (selectedProject === "Upcoming") {
      data = todos.filter((todo) => {
        const todoDate = moment(todo.date, "DD/MM/YYYY");
        const todayDate = moment(todayDateFormatted, "DD/MM/YYYY");

        const diffDays = todoDate.diff(todayDate, "days");

        return diffDays >= 0 && diffDays < 7;
      });
    } else if (selectedProject === "All Tasks") {
      data = todos;
    } else {
      data = todos.filter((todo) => todo.projectName === selectedProject);
    }

    // Sort todos by day and time ascending
    data.sort((a, b) => {
      const aDateTime = moment(`${a.date} ${a.time}`, "DD/MM/YYYY h:mm a");
      const bDateTime = moment(`${b.date} ${b.time}`, "DD/MM/YYYY h:mm a");
      return aDateTime - bDateTime;
    });

    setFilteredTodos(data);
  }, [todos, selectedProject]);

  return filteredTodos;
}

export function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("projects")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
          };
        });
        setProjects(data);
      });

    return () => unsubscribe();
  }, []);

  return projects;
}

export function useProjectsWithStats(projects, todos) {
  const [projectsWithStats, setProjectsWithStats] = useState([]);

  useEffect(() => {
    const data = projects.map((project) => {
      return {
        numOfTodos: todos.filter(
          (todo) => todo.projectName === project.name && !todo.checked
        ).length,
        ...project,
      };
    });

    setProjectsWithStats(data);
  }, [projects, todos]);

  return projectsWithStats;
}
