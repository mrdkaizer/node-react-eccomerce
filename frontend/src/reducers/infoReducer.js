import { UPDATE_INFO } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INFO:
      const info = action.updates;
      state = info;
      return Object.assign({}, state);
    default:
      return state;
  }
};
