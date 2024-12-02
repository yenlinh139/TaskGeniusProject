import { useMemo } from "react";
import { useSelector } from "react-redux";
import avatarDefault from "../../assets/avatarUser.png";
import { badgeColorMapping, tagMapping } from "../../common/constants";
import EditTaskModal from "./EditTaskModal";

const TaskElementRoleAdmin = ({ task, status, handleDelete }) => {
  const { projects } = useSelector((state) => state.projectStore);
  const { listUser } = useSelector((state) => state.userStore);

  // only re-run this funtion if task change
  const filteredData = useMemo(() => {
    const data = {};
    data.project = projects.find((p) => p.id === task.project_id);
    data.user = listUser.find((user) => user.email === task.user_mail);
    return data;
  }, [task]);

  const convertDateTime = (value) => {
    if (!value) return "";
    return new Date(value).toISOString().split("T")[0];
  };

  return (
    <>
      <div className="task">
        <div className="task__tags d-flex justify-content-between">
          <div
            className={`my-truncate text-truncate task__tag task__tag--${tagMapping[status]}`}
          >
            {task.task_name}
          </div>
          <div className="dropdown">
            <button
              className="task__options"
              id={`dropdown-${task.id}`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-h"></i>
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby={`dropdown-${task.id}`}
            >
              <li>
                <a
                  data-bs-toggle="modal"
                  data-bs-target={`#modalEditTask-${task.id}`}
                  className="dropdown-item"
                  role="button"
                >
                  <i className="fa-solid fa-pen-to-square"></i> Edit
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  role="button"
                  onClick={() => handleDelete(task.id)}
                >
                  <i className="fa-solid fa-trash"></i> Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p
          className={`${
            task.note
              ? "my-truncate text-truncate"
              : "my-truncate text-truncate empty"
          }`}
        >
          {task.note}
        </p>
        <div className="task__stats mb-3">
          <div>
            <i className="fa-solid fa-hourglass-start"></i>
            <span className="ps-2">{convertDateTime(task.time_start)}</span>
          </div>
          <div>
            <i className="fa-solid fa-hourglass-end"></i>
            <span className="ps-2">{convertDateTime(task.time_end)}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="w-75">
            <span
              className={`my-truncate text-truncate badge bg-${
                badgeColorMapping[filteredData?.project?.priority]
              }`}
            >
              {task.project_name}
            </span>
          </div>
          <div>
            <img
              loading="lazy"
              src={filteredData?.user?.avarta || avatarDefault}
              width={30}
              height={30}
              className="rounded-circle"
            />
          </div>
        </div>
      </div>
      <EditTaskModal taskEdit={task} />
    </>
  );
};

export default TaskElementRoleAdmin;
