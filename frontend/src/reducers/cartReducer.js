import {
  ADD_PRODUCT_CART,
  UPDATE_CART,
  DELETE_PRODUCT_CART,
} from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_CART:
      const input = action.product;
      const link = input.link;
      const quantity = input.quantity ? input.quantity : 1;
      if (state[link]) {
        state[link].quantity += quantity;
      } else {
        state[link] = input;
        state[link].quantity = quantity;
      }
      return Object.assign({}, state);
    case DELETE_PRODUCT_CART:
      delete state[action.link];
      return Object.assign({}, state);
    case UPDATE_CART:
      const updates = action.updates;
      return Object.assign({}, updates);
    default:
      return state;
  }
};
