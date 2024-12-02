import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  convertDateToYMD,
  convertDateWithCurrentTime,
} from "../../common/dateFormat";
import { FORM_ERRORS, UPDATE } from "../../common/messageConfirm";
import { updateProject } from "../../store/actions/projectAction";
import ModalConfirm from "../../components/ModalConfirm";

function ProjectUpdateModal({ projectData }) {
  const [project, setProject] = useState(projectData);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleProjectNameChange = (e) => {
    setProject({ ...project, name: e.target.value });
  };

  const handleNoteChange = (e) => {
    setProject({ ...project, note: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setProject({ ...project, payment: e.target.value });
  };

  const handleTimeStartChange = (e) => {
    setProject({
      ...project,
      time_start: convertDateWithCurrentTime(e.target.value),
    });
  };
  const handleTimeEndChange = (e) => {
    setProject({
      ...project,
      time_end: convertDateWithCurrentTime(e.target.value),
    });
  };

  const handlePriorityChange = (e) => {
    setProject({ ...project, priority: Number(e.target.value) });
  };

  const handleUpdateProject = () => {
    const newErrors = {};
    if (new Date(project.time_start) >= new Date(project.time_end))
      newErrors.time_end = FORM_ERRORS.time_end;
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowConfirmModal(true);

      // Close the modal if there are no errors:
      const modalElement = document.getElementById("projectUpdateModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  const confirmUpdate = () => {
    dispatch(updateProject(project));
    setShowConfirmModal(false);
  };

  useEffect(() => {
    setProject(projectData);
  }, [projectData]);

  return (
    <>
      <div
        className="modal fade"
        id="projectUpdateModal"
        tabIndex="-1"
        aria-labelledby="projectUpdateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h1 className="modal-title fs-5" id="projectUpdateModalLabel">
                Project Information
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container mt-5">
                <form>
                  <div className="row mb-3">
                    <label htmlFor="name" className="col-4 col-form-label">
                      Project Name
                    </label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Project Name..."
                        value={project?.name}
                        onChange={(e) => handleProjectNameChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="note" className="col-4 col-form-label">
                      Note
                    </label>
                    <div className="col-8">
                      <textarea
                        type="text"
                        className="form-control"
                        id="note"
                        placeholder="Note..."
                        value={project?.note}
                        onChange={(e) => handleNoteChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="payment" className="col-4 col-form-label">
                      Payment
                    </label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="payment"
                        placeholder="Payment"
                        value={project?.payment}
                        onChange={(e) => handlePaymentChange(e)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="timeStart" className="col-4 col-form-label">
                      Time Start
                    </label>
                    <div className="col-8">
                      <input
                        type="date"
                        className="form-control"
                        id="timeStart"
                        value={convertDateToYMD(project?.time_start)}
                        disabled
                        onChange={(e) => handleTimeStartChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="timeEnd" className="col-4 col-form-label">
                      Time End
                    </label>
                    <div className="col-8">
                      <input
                        type="date"
                        className="form-control"
                        id="timeEnd"
                        value={convertDateToYMD(project?.time_end)}
                        onChange={(e) => handleTimeEndChange(e)}
                        style={{ borderColor: errors.time_end ? "red" : "" }}
                      />
                      {errors.time_end && (
                        <div className="row mb-3">
                          <div className="col-12 text-end">
                            <span style={{ color: "red" }}>
                              {FORM_ERRORS.time_end}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="priority" className="col-4 col-form-label">
                      Priority
                    </label>
                    <div className="col-8">
                      <select
                        className="form-select"
                        aria-label="priority"
                        value={project?.priority}
                        onChange={(e) => handlePriorityChange(e)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleUpdateProject()}
              >
                Update
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
          message={UPDATE.project}
          onConfirm={confirmUpdate}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
}

export default ProjectUpdateModal;
