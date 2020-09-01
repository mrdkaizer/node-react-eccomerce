import { ADD_PRODUCT_CART, ADD_TOKEN, ADD_TOKEN_ADMIN } from "./types";

export const addCart = (product) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PRODUCT_CART,
      product,
    });
  };
};

export const addToken = (token) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TOKEN,
      token,
    });
  };
};

export const addTokenAdmin = (token) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TOKEN_ADMIN,
      token,
    });
  };
};
