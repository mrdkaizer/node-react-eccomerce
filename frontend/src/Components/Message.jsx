import React, { useState, useEffect } from "react";
import { Alert } from "@material-ui/lab";

function Error(props) {
  const [error, setError] = useState("");
  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  return (
    <div className={error === "" ? "d-none" : ""}>
      <Alert severity="error">{error}</Alert>
      <br />
    </div>
  );
}

function Success(props) {
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setSuccess(props.success);
  }, [props.success]);

  return (
    <div className={success === "" ? "d-none" : ""}>
      <Alert severity="success">{success}</Alert>
      <br />
    </div>
  );
}

export { Error, Success };
