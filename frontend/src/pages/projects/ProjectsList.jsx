import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertDateToDMY } from "../../common/dateFormat";
import { DELETE } from "../../common/messageConfirm";
import { deleteProject } from "../../store/actions/projectAction";
import AddTaskModal from "../tasks/AddTaskModal";
import ProjectCreateModal from "./ProjectCreateModal";
import ProjectUpdateModal from "./ProjectUpdateModal";
import ModalConfirm from "../../components/ModalConfirm";

const ProjectsList = ({ projects }) => {
  const [projectData, setProjectData] = useState({
    name: "",
    payment: "",
    time_start: "",
    time_end: "",
    note: "",
    priority: "",
  });
  const [taskData, setTaskData] = useState({
    user_mail: "",
    project_id: "",
    time_start: "",
    time_end: "",
    status: "1",
    task_name: "",
    note: "",
  });
  const { userInfo } = useSelector((state) => state.authStore);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  const handleDelete = (id) => {
    setProjectIdToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProject({ id: projectIdToDelete }));
    setShowConfirmModal(false);
  };

  const showProjectUpdateModal = (project) => {
    setProjectData(project);
  };

  const handleAddTask = (id, projectName, projectStart, projectEnd) => {
    setTaskData({
      ...taskData,
      project_id: id,
      project_name: projectName,
      project_start: projectStart,
      project_end: projectEnd,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearchTerm = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPriority =
      priorityFilter === "all" || project.priority === +priorityFilter;
    return matchesSearchTerm && matchesPriority;
  });

  return (
    <>
      <div
        className="container mt-2 mb-4 d-flex justify-content-between align-items-center"
        id="project"
      >
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn bgCreate px-4 py-2 text-white"
            data-bs-toggle="modal"
            data-bs-target="#projectCreateModal"
            disabled={userInfo?.role != 1}
          >
            <strong>
              <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                <i className="fa-solid fa-plus me-1"></i> Create Project
              </span>
            </strong>
          </button>
        </div>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e)}
          />
          <select
            className="form-select"
            aria-label="priority"
            onChange={(e) => handlePriorityChange(e)}
            value={priorityFilter}
          >
            <option value="all">All Priorities</option>
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>
        </div>
      </div>
      <div className="container my-4">
        <div className="row">
          {filteredProjects &&
            filteredProjects.map((project) => (
              <div
                className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4 hoverCard"
                key={project.id}
              >
                <div
                  className={`card bg-light shadow-sm border border-3 ${
                    project.priority === 1
                      ? "border-danger"
                      : project.priority === 2
                      ? "border-warning"
                      : ""
                  }`}
                >
                  <div className="card-body">
                    <h5 className="card-title mb-3 border-bottom pt-1 pb-2 text-truncate ">
                      <strong>{project.name}</strong>
                    </h5>
                    <p className="card-text text-truncate">
                      <strong>Note: </strong>
                      {project.note}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Payment: </strong>
                      {project.payment}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Time Start: </strong>
                      {convertDateToDMY(project.time_start)}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Time End: </strong>
                      {convertDateToDMY(project.time_end)}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Priority: </strong>
                      {project.priority}
                    </p>
                    <div className="mt-2 text-center">
                      <button
                        type="button"
                        className="btn bgCreate mx-1 my-1"
                        data-bs-toggle="modal"
                        data-bs-target="#projectUpdateModal"
                        onClick={() => showProjectUpdateModal(project)}
                        disabled={userInfo?.role != 1}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-1 my-1"
                        onClick={() => handleDelete(project.id)}
                        disabled={userInfo?.role != 1}
                      >
                        Delete
                      </button>
                    </div>
                    <hr />
                    <div className="text-center mt-3">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addTaskModal"
                        className="btn bgPrimary"
                        onClick={() =>
                          handleAddTask(
                            project.id,
                            project.name,
                            project.time_start,
                            project.time_end
                          )
                        }
                        disabled={userInfo?.role != 1}
                      >
                        <i className="fa-solid fa-plus"></i> add task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <ProjectCreateModal />
      <AddTaskModal taskNewData={taskData} />
      <ProjectUpdateModal projectData={projectData} />
      {showConfirmModal && (
        <ModalConfirm
          message={DELETE.project}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
};

export default ProjectsList;
