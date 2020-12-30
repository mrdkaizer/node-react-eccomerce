import { myFetch } from "../../Utils/communication";
import { Error, Success } from "../../Components/Message";

import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

function Reset(props) {
  const Email = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const reset = async () => {
    try {
      const email = Email.current.value;
      if (!email) {
        setSuccess("");
        return setError("Please enter your email");
      }
      const response = await myFetch("/user/reset", "POST", { email });
      if (response.status === 404) {
        setError("There is no account associated with this email.");
        setSuccess("");
        return;
      }
      setError("");
      setSuccess("Please check your email for further instructions.");
    } catch (e) {
      setSuccess("");
      setError("Something went wrong");
    }
  };

  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <h5>RESET PASSWORD</h5>
        <Form>
          <Error error={error} />
          <Success success={success} />
          <Form.Group controlId="email">
            <Form.Control
              ref={Email}
              type="email"
              placeholder="Email Address"
            />
          </Form.Group>
          <Button
            className="btn"
            variant="primary"
            type="button"
            onClick={reset}
          >
            RESET
          </Button>
        </Form>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  info: state.infoReducer,
});
export default connect(mapStateToProps, {})(Reset);
