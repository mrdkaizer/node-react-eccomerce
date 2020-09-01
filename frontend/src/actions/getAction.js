import { GET_NUMBER_BASKET, GET_TOKEN, GET_TOKEN_ADMIN } from "./types";

export const getNumbers = () => {
  return (dispatch) => {
    dispatch({
      type: GET_NUMBER_BASKET,
    });
  };
};

export const getToken = () => {
  return (dispatch) => {
    dispatch({
      type: GET_TOKEN,
    });
  };
};

export const getTokenAdmin = () => {
  return (dispatch) => {
    dispatch({
      type: GET_TOKEN_ADMIN,
    });
  };
};
