import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { convertDateWithCurrentTime } from "../../common/dateFormat";
import { CREATE, FORM_ERRORS } from "../../common/messageConfirm";
import { createProject } from "../../store/actions/projectAction";
import ModalConfirm from "../../components/ModalConfirm";

function ProjectCreateModal() {
  const dispatch = useDispatch();
  const priorities = [1, 2, 3];
  const [formData, setFormData] = useState({
    name: "",
    payment: "",
    time_start: new Date().toISOString().split("T")[0],
    time_end: "",
    note: "",
    priority: 1,
  });
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateProject = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = FORM_ERRORS.name;
    if (!formData.payment) newErrors.payment = FORM_ERRORS.payment;
    if (
      !formData.time_end ||
      new Date(formData.time_start) >= new Date(formData.time_end)
    )
      newErrors.time_end = FORM_ERRORS.time_end;
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowConfirmModal(true);

      // Close the modal if there are no errors:
      const modalElement = document.getElementById("projectCreateModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  const confirmCreate = () => {
    const project = {
      name: formData.name,
      payment: formData.payment,
      time_start: convertDateWithCurrentTime(formData.time_start),
      time_end: convertDateWithCurrentTime(formData.time_end),
      note: formData.note,
      priority: Number(formData.priority),
    };

    dispatch(createProject(project));
    setShowConfirmModal(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="projectCreateModal"
        tabIndex="-1"
        aria-labelledby="projectCreateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bgTittleModel">
              <h1 className="modal-title fs-5" id="projectCreateModalLabel">
                Create Project
              </h1>
            </div>
            <div className="modal-body">
              <div className="container mt-2">
                <form>
                  <div className="row mb-3">
                    <label htmlFor="name" className="col-4 col-form-label">
                      Name:
                    </label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Project Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <div className="row mb-3">
                          <div className="col-12 text-end">
                            <span style={{ color: "red" }}>
                              {FORM_ERRORS.name}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="note" className="col-4 col-form-label">
                      Note:
                    </label>
                    <div className="col-8">
                      <textarea
                        className="form-control"
                        id="note"
                        name="note"
                        placeholder="Note..."
                        value={formData.note}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="payment" className="col-4 col-form-label">
                      Payment:
                    </label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="payment"
                        name="payment"
                        placeholder="Payment"
                        value={formData.payment}
                        onChange={handleChange}
                      />
                      {errors.payment && (
                        <div className="row mb-3">
                          <div className="col-12 text-end">
                            <span style={{ color: "red" }}>
                              {FORM_ERRORS.payment}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="time_start"
                      className="col-4 col-form-label"
                    >
                      Time Start:
                    </label>
                    <div className="col-8">
                      <input
                        type="date"
                        className="form-control"
                        id="time_start"
                        name="time_start"
                        value={formData.time_start}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {formData.time_start &&
                        new Date(formData.time_start) <
                          new Date(new Date().toISOString().split("T")[0]) && (
                          <p className="text-end" style={{ color: "red" }}>
                            Please select a date that is today or in the future!
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="time_end" className="col-4 col-form-label">
                      Time End:
                    </label>
                    <div className="col-8">
                      <input
                        type="date"
                        className="form-control"
                        id="time_end"
                        name="time_end"
                        value={formData.time_end}
                        onChange={handleChange}
                        style={{ borderColor: errors.time_end ? "red" : "" }}
                      />
                    </div>
                  </div>
                  {errors.time_end && (
                    <div className="row mb-3">
                      <div className="col-12 text-end">
                        <span style={{ color: "red" }}>
                          {FORM_ERRORS.time_end}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="row mb-3">
                    <label htmlFor="priority" className="col-4 col-form-label">
                      Priority:
                    </label>
                    <div className="col-8">
                      <select
                        className="form-select"
                        name="priority"
                        aria-label="Priority"
                        value={formData.priority}
                        onChange={handleChange}
                      >
                        {priorities &&
                          priorities.map((item, index) => (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn bgPrimary"
                onClick={() => handleCreateProject()}
              >
                Create
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <ModalConfirm
          message={CREATE.project}
          onConfirm={confirmCreate}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
}

export default ProjectCreateModal;
