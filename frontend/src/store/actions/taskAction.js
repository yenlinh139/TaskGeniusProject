import { TOAST } from "../../common/constants";
import { ToastCommon } from "../../components/ToastCommon";
import axiosInstance from "../../config/axios-config";
import { SET_LIST_TASK } from "../constants";
import { hideLoading, showLoading } from "./appAction";

export const getListTask = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(showLoading());
      const resp = await axiosInstance.get(
        import.meta.env.VITE_BASE_URL + "/api/task"
      );

      if (resp && resp.data.message !== "No task found") {
        dispatch({
          type: SET_LIST_TASK,
          payload: resp.data,
        });

      }

      if(resp.data.message === "No task found") {
        dispatch({
          type: SET_LIST_TASK,
          payload: [],
        });
      }

      dispatch(hideLoading());

    } catch (error) {
      console.log(error.response?.data?.message);
      dispatch(hideLoading());
    }
  };
};

export const getListTaskByUserId = (params) => {
  return async (dispatch, getState) => {
    try {
      dispatch(showLoading());
      const resp = await axiosInstance.get(
        import.meta.env.VITE_BASE_URL + "/api/gettaskbyuser/" + params.userId
      );

      if (resp && resp.data.message !== "No task found") {
        dispatch({
          type: SET_LIST_TASK,
          payload: resp.data,
        });
      }

      if(resp.data.message === "No task found") {
        dispatch({
          type: SET_LIST_TASK,
          payload: [],
        });
      }

      dispatch(hideLoading());
    } catch (error) {
      console.log(error.response?.data?.message);
      dispatch(hideLoading());
    }
  };
};

export const createTask = (params) => {
  return async (dispatch, getState) => {
    try {
      // Chuyển đổi ngày trong params về dạng ISO để đảm bảo không bị trừ ngày
      const newParams = {
        ...params,

        time_end: new Date(params.time_end).toISOString(),
        time_start: new Date(params.time_start).toISOString(),
      };

      const res = await axiosInstance.post(
        import.meta.env.VITE_BASE_URL + "/api/task",
        newParams
      );

      if (res) {
        dispatch(getListTask());
        ToastCommon(TOAST.SUCCESS, "Created task new successfully");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};

export const updateTask = (params, position) => {
  return async (dispatch, getState) => {
    try {
      const time = "T17:00:00.000Z";
      const res = await axiosInstance.put(
        import.meta.env.VITE_BASE_URL + "/api/task",
        {
          ...params,
          time_start: params.time_start.split("T")[0] + time,
          time_end: params.time_end.split("T")[0] + time,
        }
      );

      if (res) {
        ToastCommon(TOAST.SUCCESS, "Task saved successfully");
        document.getElementById(`close-edit-task-btn-${params.id}`).click();
        dispatch(getListTask());
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};

export const changeStatus = (params, userId) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.put(
        import.meta.env.VITE_BASE_URL + "/api/task",
        params
      );

      if (res) {
        dispatch(
          getListTaskByUserId({ userId: getState().authStore.userInfo.id })
        );
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};

export const deleteTask = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.delete(
        import.meta.env.VITE_BASE_URL + "/api/task",
        {
          data: params,
        }
      );

      if (res) {
        dispatch(getListTask());
        ToastCommon(TOAST.SUCCESS, "Deleted task successfully");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};
