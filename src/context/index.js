import React, { createContext, useEffect, useState } from "react";
import {
  useTodos,
  useProjects,
  useFilterTodos,
  useProjectsWithStats,
} from "../hooks";
import { auth } from "../firebase/FirebaseForLogin"; // Adjust the import path as needed
import { onAuthStateChanged } from "firebase/auth";

const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const defaultProject = "today";
  const [selectedProject, setSelectedProject] = useState(defaultProject);
  const [selectedTodo, setSelectedTodo] = useState(undefined);

  const todos = useTodos();
  const projects = useProjects();
  const projectsWithStats = useProjectsWithStats(projects, todos);
  const filteredTodos = useFilterTodos(todos, selectedProject);

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Set loading to false after the auth state has been checked
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth state
  }

  return (
    <TodoContext.Provider
      value={{
        defaultProject,
        selectedProject,
        setSelectedProject,
        todos: filteredTodos,
        projects: projectsWithStats,
        selectedTodo,
        setSelectedTodo,
        currentUser,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContextProvider, TodoContext };
