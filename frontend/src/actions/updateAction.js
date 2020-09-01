import { UPDATE_CART } from "./types";
import { UPDATE_INFO } from "./types";

export const updateCart = (updates) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CART,
      updates,
    });
  };
};

export const updateInfo = (updates) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_INFO,
      updates,
    });
  };
};
