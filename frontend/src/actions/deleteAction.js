import { DELETE_TOKEN, DELETE_TOKEN_ADMIN, DELETE_PRODUCT_CART } from "./types";

export const deleteToken = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_TOKEN,
    });
  };
};

export const deleteProduct = (link) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PRODUCT_CART,
      link,
    });
  };
};

export const deleteTokenAdmin = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_TOKEN_ADMIN,
    });
  };
};
