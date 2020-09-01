import React, { useState } from "react";
import { connect } from "react-redux";

function Announcement(props) {
  const [show, setShow] = useState(true);

  return props.info.announcement ? (
    <div
      className={
        !show ? "d-none" : "alert alert-info alert-dismissible fade show"
      }
      role="alert"
    >
      <button
        type="button"
        className="close"
        onClick={() => {
          setShow(false);
        }}
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      {props.info.announcement}
    </div>
  ) : (
    ""
  );
}
const mapStateToProps = (state) => ({
  info: state.infoReducer,
});
export default connect(mapStateToProps, {})(Announcement);
