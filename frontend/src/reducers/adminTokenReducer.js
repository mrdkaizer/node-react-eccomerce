import { ADD_TOKEN_ADMIN, DELETE_TOKEN_ADMIN } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN_ADMIN:
      const token = action.token;
      state = { token };
      return Object.assign({}, state);
    case DELETE_TOKEN_ADMIN:
      state = {};
      return Object.assign({}, state);
    default:
      return state;
  }
};
