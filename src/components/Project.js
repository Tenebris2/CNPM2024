import React, { useContext, useState } from "react";
import { Pencil, XCircle } from "react-bootstrap-icons";
import Modal from "./Modal";
import RenameProject from "./RenameProject";
import { TodoContext } from "../context";
import firebase from "../firebase";

function Project({ project, edit }) {
  // CONTEXT
  const { defaultProject, selectedProject, setSelectedProject } =
    useContext(TodoContext);

  // STATE
  const [showModal, setShowModal] = useState(false);

  const deleteProject = (projectId) => {
    firebase
      .firestore()
      .collection("projects")
      .doc(projectId)
      .delete()
      .then(() => {
        firebase
          .firestore()
          .collection("todos")
          .where("projectName", "==", project.name)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
            });
          });
      })
      .then(() => {
        if (selectedProject === project.name) {
          setSelectedProject(defaultProject);
        }
      });
  };

  return (
    <div className="Project" onClick={() => setSelectedProject(project.name)}>
      <div className="name">{project.name}</div>
      <div className="btns">
        {edit ? (
          <div className="edit-delete">
            <span className="edit" onClick={() => setShowModal(true)}>
              <Pencil size="13" />
            </span>
            <span className="delete" onClick={() => deleteProject(project.id)}>
              <XCircle size="13" />
            </span>
          </div>
        ) : project.numOfTodos === 0 ? (
          ""
        ) : (
          <div className="total-todos">{project.numOfTodos}</div>
        )}
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameProject project={project} setShowModal={setShowModal} />
      </Modal>
    </div>
  );
}

export default Project;
