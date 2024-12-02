import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getListTask,
  getListTaskByUserId,
} from "../../store/actions/taskAction";
import { useSelector } from "react-redux";
import TasksRoleAdmin from "./TasksRoleAdmin";
import TasksRoleUser from "./TasksRoleUser";
import Loading from "../../components/Loading";
import { getProjectsData } from "../../store/actions/projectAction";
import { getListUser } from "../../store/actions/userAction";

function WrapperTask() {
  const { userInfo } = useSelector((state) => state.authStore);
  const { isLoading } = useSelector((state) => state.appStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Number(userInfo.role) === 1) {
      dispatch(getListTask());
    } else {
      dispatch(getListTaskByUserId({ userId: userInfo.id }));
    }
    dispatch(getListUser());
    dispatch(getProjectsData());
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>{Number(userInfo.role) === 1 ? <TasksRoleAdmin /> : <TasksRoleUser />}</>
  );
}

export default WrapperTask;
