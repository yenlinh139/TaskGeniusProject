import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statusMapping } from "../../common/constants";
import { deleteTask } from "../../store/actions/taskAction";
import TaskElementRoleAdmin from "./TaskElementRoleAdmin";
import ModalConfirm from "../../components/ModalConfirm";
import { DELETE } from "../../common/messageConfirm";

function TasksRoleAdmin() {
  const { listTask } = useSelector((state) => state.taskStore);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    setTaskId(id); // Lưu lại id của task cần xóa
    setShowConfirmModal(true); // Hiển thị modal xác nhận
  };

  const confirmDelete = () => {
    dispatch(deleteTask({ id: taskId })); // Xóa task với id đã lưu
    setShowConfirmModal(false); // Đóng modal
  };

  const filteredTasks = useMemo(() => {
    const tasksByStatus = {};
    Object.keys(statusMapping).forEach((status) => {
      tasksByStatus[status] = listTask.filter(
        (task) => task.status === parseInt(status)
      );
    });
    return tasksByStatus;
  }, [listTask]);

  return (
    <div className="app">
      <main className="project">
        <div className="project-tasks">
          {Object.keys(statusMapping).map((status) => (
            <div className="project-column " key={status}>
              <div className="project-column-heading">
                <h2 className="project-column-heading__title">
                  {statusMapping[status].toUpperCase()}{" "}
                  <span className="fs-6">
                    ({filteredTasks[status]?.length})
                  </span>
                </h2>
              </div>
              <div className="project-column-body">
                {filteredTasks[status]?.length > 0 &&
                  filteredTasks[status].map((task) => (
                    <TaskElementRoleAdmin
                      key={task.id}
                      task={task}
                      status={status}
                      handleDelete={handleDelete}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      {showConfirmModal && (
        <ModalConfirm
          message={DELETE.task}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}

export default TasksRoleAdmin;
