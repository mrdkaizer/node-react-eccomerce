import { myFetch } from "../../Utils/communication";
import { deleteToken } from "../../actions/deleteAction";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Logout(props) {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => ({
    token: state.tokenReducer.token,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          await myFetch("/user/logout", "POST", {}, token);
          dispatch(deleteToken());
        }
      } catch (e) {}
      window.location.replace("/");
    };
    fetchData();
  }, [token, dispatch]);

  return <div></div>;
}

export default Logout;
