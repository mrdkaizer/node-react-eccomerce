import React, { useState } from "react";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";

function Announcement(props) {
  const [show, setShow] = useState(true);

  return props.info.announcement ? (
    <Alert
      onClose={() => {
        setShow(false);
      }}
      variant="filled"
      severity="info"
      className={!show ? "d-none" : ""}
    >
      {props.info.announcement}
    </Alert>
  ) : (
    ""
  );
}
const mapStateToProps = (state) => ({
  info: state.infoReducer,
});
export default connect(mapStateToProps, {})(Announcement);
