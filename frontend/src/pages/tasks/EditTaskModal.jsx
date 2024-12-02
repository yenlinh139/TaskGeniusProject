import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REQUIRE_NAME,
  REQUIRE_TIME_END,
  REQUIRE_TIME_START,
  TIME_START_LESS_TIME_END,
} from "../../common/messageError";
import { updateTask } from "../../store/actions/taskAction";
import "./style.scss";

const initErrorMessages = {
  time_end: "",
  note: "",
  time_start: "",
  task_name: "",
};

function EditTaskModal({ taskEdit }) {
  const dispatch = useDispatch();
  const [taskDetail, setTaskDetail] = useState(taskEdit || initTask);
  const [errorMessages, setErrorMessages] = useState(initErrorMessages);
  const { listUser } = useSelector((state) => state.userStore);
  const { projects } = useSelector((state) => state.projectStore);

  const handleOnSubmit = () => {
    if (taskDetail.task_name.length === 0) {
      setErrorMessages({ task_name: REQUIRE_NAME });
      return;
    }

    if (taskDetail.time_start.length === 0) {
      setErrorMessages({ time_start: REQUIRE_TIME_START });
      return;
    }

    if (taskDetail.time_end.length === 0) {
      setErrorMessages({ time_end: REQUIRE_TIME_END });
      return;
    }

    if (Date.parse(taskDetail.time_start) > Date.parse(taskDetail.time_end)) {
      setErrorMessages({ time_end: TIME_START_LESS_TIME_END });
      return;
    }

    dispatch(updateTask(taskDetail));
  };

  const handleSetTimeEnd = (value) => {
    setTaskDetail({
      ...taskDetail,
      time_end: value,
    });
  };

  const handleSetTimeStart = (value) => {
    setTaskDetail({
      ...taskDetail,
      time_start: value,
    });
  };

  const handleSetNote = (value) => {
    setTaskDetail({
      ...taskDetail,
      note: value,
    });
  };

  const handleSetTaskName = (value) => {
    setTaskDetail({
      ...taskDetail,
      task_name: value,
    });
  };

  const convertDateTime = (value) => {
    if (!value) return "";
    return new Date(value).toISOString().split("T")[0];
  };

  const handleChangeUser = (email) => {
    const user = listUser.find((u) => u.email === email);
    setTaskDetail({
      ...taskDetail,
      user_mail: user.email,
      user_name: user.name,
    });
  };

  const handleChangeProject = (projectId) => {
    const project = projects.find((u) => u.id === projectId);
    setTaskDetail({
      ...taskDetail,
      project_id: project.id,
      project_name: project.name,
      project_start: project.time_start,
      project_end: project.time_end,
    });
  };

  useEffect(() => {
    setTaskDetail(taskEdit);
    setErrorMessages(initErrorMessages);
  }, [taskEdit]);

  return (
    <div className="modal fade" id={`modalEditTask-${taskEdit.id}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit Task</h4>
            <button
              id={`close-edit-task-btn-${taskDetail.id}`}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">
                  Name <span className="require">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errorMessages.task_name?.length > 0 && "is-invalid"
                  }`}
                  value={taskDetail?.task_name}
                  onChange={(e) => handleSetTaskName(e.target.value)}
                />
                <span className="invalid-feedback">
                  {errorMessages.task_name}
                </span>
              </div>
              <div className="row mb-3">
                <div className="col-6 ">
                  <label className="form-label">
                    Start time <span className="require">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errorMessages.time_start?.length > 0 && "is-invalid"
                    }`}
                    value={convertDateTime(taskDetail?.time_start)}
                    onChange={(e) => handleSetTimeStart(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <span className="invalid-feedback">
                    {errorMessages.time_start}
                  </span>
                </div>
                <div className="col-6 ">
                  <label className="form-label">
                    End time <span className="require">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errorMessages.time_end?.length > 0 && "is-invalid"
                    }`}
                    value={convertDateTime(taskDetail?.time_end)}
                    onChange={(e) => handleSetTimeEnd(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <span className="invalid-feedback">
                    {errorMessages.time_end}
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Note </label>
                <textarea
                  className="form-control"
                  value={taskDetail?.note}
                  onChange={(e) => handleSetNote(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Select User</label>
                <select
                  className="form-control"
                  value={taskDetail?.user_mail}
                  onChange={(e) => handleChangeUser(e.target.value)}
                >
                  {listUser.map((user) => (
                    <option key={user.id} value={user.email}>
                      {" "}
                      {user.email}
                    </option>
                  ))}
                </select>
                <span className="invalid-feedback">{errorMessages.note}</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Select Project</label>
                <select
                  className="form-control"
                  value={taskDetail?.project_id}
                  onChange={(e) => handleChangeProject(e.target.value)}
                >
                  {projects.map((pro) => (
                    <option key={pro.id} value={pro.id}>
                      {" "}
                      {pro.name}
                    </option>
                  ))}
                </select>
                <span className="invalid-feedback">{errorMessages.note}</span>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleOnSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
