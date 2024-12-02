import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { createTask } from "../../store/actions/taskAction";
import Select from "react-select";

function AddTaskModal({ taskNewData }) {
  const { listUser } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const { project_name, project_start, project_end, ...taskData } = taskNewData;

  const [formData, setFormData] = useState({
    user_mail: "",
    project_id: taskData?.project_id || "",
    time_start: "",
    time_end: "",
    status: "1",
    task_name: "",
    note: "",
  });

  const [dateError, setDateError] = useState("");

  // Cập nhật formData khi taskNewData thay đổi
  useEffect(() => {
    setFormData({ ...taskData });
  }, [taskNewData]);

  // Xử lý khi input thay đổi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    // Convert project_start và project_end sang Date
    const projectStartDate = new Date(project_start);
    const projectEndDate = new Date(project_end);
    const newValueDate = new Date(value);

    // Update form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate time_start
    if (name === "time_start") {
      if (newValueDate < projectStartDate) {
        error = "Time start must be after project start.";
      } else if (
        formData.time_end &&
        newValueDate > new Date(formData.time_end)
      ) {
        error = "Time start must be before time end.";
      }
    }

    // Validate time_end
    if (name === "time_end") {
      if (newValueDate > projectEndDate) {
        error = "Time end must be before project end.";
      } else if (
        formData.time_start &&
        newValueDate < new Date(formData.time_start)
      ) {
        error = "Time end must be after time start.";
      }
    }

    // Cập nhật error
    setDateError(error);
  };

  // Options cho Select component
  const userOptions =
    listUser?.map((user) => ({
      value: user.email,
      label: user.email,
    })) || [];

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      user_mail: selectedOption ? selectedOption.value : "",
    });
  };

  // Xử lý tạo task
  const handleCreateTask = () => {
    if (new Date(formData.time_start) >= new Date(formData.time_end)) {
      setDateError("Time end must be after time start.");
    } else {
      setDateError("");
      dispatch(createTask(formData));

      // Reset form
      setFormData({
        user_mail: "",
        project_id: taskNewData?.project_id || "",
        time_start: "",
        time_end: "",
        status: "1",
        task_name: "",
        note: "",
      });

      // Đóng modal nếu không có lỗi
      const modalElement = document.getElementById("addTaskModal");
      const modalInstance = modalElement
        ? bootstrap.Modal.getInstance(modalElement)
        : null;
      if (modalInstance) {
        modalInstance.hide(); // Đóng modal
      }
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="addTaskModal"
        tabIndex="-1"
        aria-labelledby="addTaskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bgTittleModelCreateTask">
              <h1 className="modal-title fs-5" id="addTaskModalLabel">
                Create New Task of Project{" "}
                <span className="fs-4">{project_name}</span>
              </h1>
            </div>
            <div className="modal-body">
              <div className="container mt-2">
                <form>
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">Task name:</label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Task name"
                        name="task_name"
                        value={formData.task_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">User mail:</label>
                    <div className="col-8">
                      <Select
                        options={userOptions}
                        value={userOptions.find(
                          (option) => option.value === formData.user_mail
                        )}
                        className="selectEmail"
                        onChange={handleSelectChange}
                        placeholder="Search for user email..."
                        isClearable
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">Time Start:</label>
                    <div className="col-8">
                      <input
                        type="date"
                        className="form-control"
                        name="time_start"
                        value={formData.time_start}
                        onChange={handleInputChange}
                        min={
                          project_start
                            ? new Date(project_start)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        style={{ borderColor: dateError ? "red" : "" }}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">Time End:</label>
                    <div className="col-8">
                      <input
                        type="date"
                        className="form-control"
                        name="time_end"
                        value={formData.time_end}
                        onChange={handleInputChange}
                        min={
                          formData.time_start
                            ? new Date(formData.time_start)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        max={
                          project_end
                            ? new Date(project_end).toISOString().split("T")[0]
                            : ""
                        }
                        style={{ borderColor: dateError ? "red" : "" }}
                      />
                    </div>
                  </div>
                  {dateError && (
                    <div className="row mb-3">
                      <div className="col-12 text-end">
                        <span style={{ color: "red" }}>{dateError}</span>
                      </div>
                    </div>
                  )}
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">Status:</label>
                    <div className="col-8">
                      <select
                        className="form-select select-custom"
                        aria-label="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        disabled
                      >
                        <option value="1">Pending</option>
                        <option value="2">In-progress</option>
                        <option value="3">Complete</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">Note:</label>
                    <div className="col-8">
                      <textarea
                        type="text"
                        className="form-control"
                        name="note"
                        value={formData.note}
                        placeholder="Note..."
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn bgPrimary"
                onClick={handleCreateTask}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTaskModal;
