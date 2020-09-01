import { ADD_TOKEN, DELETE_TOKEN } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      const token = action.token;
      state = { token };
      return Object.assign({}, state);
    case DELETE_TOKEN:
      state = {};
      return Object.assign({}, state);
    default:
      return state;
  }
};
