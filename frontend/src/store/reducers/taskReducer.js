import { SET_LIST_TASK } from "../constants";

const initState = {
  listTask: [],
};

const taskReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_LIST_TASK:
      return {
        ...state,
        listTask: payload.sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        }),
      };

    default:
      return state;
  }
};

export default taskReducer;
