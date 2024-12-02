import { GET_PROJECTS_DATA } from '../constants';

const initialState = {
  projects: [],
};

const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROJECTS_DATA:
      return {
        ...state,
        projects: payload.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }),
      };

    default:
      return state;
  }
};

export default projectReducer;
