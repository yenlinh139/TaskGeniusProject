import React, { useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../store/actions/taskAction";
import TaskElementRoleUser from "./TaskElementRoleUser";
import { statusMapping, TOAST } from "../../common/constants";
import { ToastCommon } from "../../components/ToastCommon";
import ModalConfirm from "../../components/ModalConfirm";

function TasksRoleUser() {
  const { listTask } = useSelector((state) => state.taskStore);
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newStatus, setNewStatus] = useState(null);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const taskId = result.draggableId;
    const task = listTask.find((task) => task.id === taskId);

    if (task) {
      const statusToChange = Number(destination.droppableId);

      if (task.status == 3 && task.status > statusToChange) {
        setCurrentTask(task);
        setNewStatus(2); // Thay đổi thành trạng thái 2
        setShowConfirmModal(true);
      } else if (
        task.status !== statusToChange &&
        statusToChange - task.status == 1
      ) {
        setCurrentTask(task);
        setNewStatus(statusToChange);
        setShowConfirmModal(true);
      } else {
        ToastCommon(TOAST.ERROR, "Change status Error");
      }
    }
  };

  const confirmChangeStatus = () => {
    if (currentTask) {
      dispatch(changeStatus({ ...currentTask, status: newStatus })); // Đổi trạng thái
    }
    setShowConfirmModal(false); // Đóng modal
  };

  const filteredTasks = useMemo(() => {
    const tasksByStatus = {};
    Object.keys(statusMapping).forEach((status) => {
      tasksByStatus[status] = listTask.filter((task) => task.status == status);
    });
    return tasksByStatus;
  }, [listTask]);

  return (
    <div className="app">
      <DragDropContext onDragEnd={onDragEnd}>
        <main className="project">
          <div className="project-tasks">
            {Object.keys(statusMapping).map((status) => (
              <Droppable key={status} droppableId={String(status)}>
                {(provided) => (
                  <div
                    className="project-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="project-column-heading">
                      <h2 className="project-column-heading__title">
                        {statusMapping[status].toUpperCase()}
                      </h2>
                    </div>
                    <div className="project-column-body">
                      {filteredTasks[status] &&
                        filteredTasks[status].map((task, index) => {
                          return (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TaskElementRoleUser
                                    task={task}
                                    status={status}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </main>
      </DragDropContext>
      {showConfirmModal && (
        <ModalConfirm
          message={`Do you want to change the status of this task to ${statusMapping[
            newStatus
          ].toUpperCase()}?`}
          onConfirm={confirmChangeStatus}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}

export default TasksRoleUser;