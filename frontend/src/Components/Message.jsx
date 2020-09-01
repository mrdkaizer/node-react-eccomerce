import React, { useState, useEffect } from "react";

function Error(props) {
  const [error, setError] = useState("");
  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  return (
    <div className={error === "" ? "d-none" : "alert alert-danger"}>
      {error}
    </div>
  );
}

function Success(props) {
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setSuccess(props.success);
  }, [props.success]);

  return (
    <div className={success === "" ? "d-none" : "alert alert-success"}>
      {success}
    </div>
  );
}

export { Error, Success };
