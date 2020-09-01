import { Form, Button } from "react-bootstrap";
import { myFetch, getFetch } from "../../Utils/communication";
import { addToken } from "../../actions/addAction";
import { Error } from "../../Components/Message";

import React, { useState, useEffect } from "react";
import { useInput } from "../../hooks/input-hook";
import { connect } from "react-redux";

function Login(props) {
  const { value: emailValue, bind: emailBind, reset: emailReset } = useInput(
    ""
  );
  const { value: passValue, bind: passBind, reset: passReset } = useInput("");
  const [error, setError] = useState("");
  const [Loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.tokenProps.token) {
          await getFetch("/customer/", props.tokenProps.token);
          setLoggedin(true);
        }
      } catch (e) {
        setLoggedin(false);
      }
    };
    fetchData();
  }, [props.tokenProps.token]);

  const handleLogin = async () => {
    const data = {
      email: emailValue,
      password: passValue,
    };
    emailReset();
    passReset();
    try {
      const response = await myFetch("/user/login", "POST", data);
      const { token } = await response.json();
      props.addToken(token);
      window.location.replace("/");
    } catch (e) {
      setError("Username and/or password is incorrect.");
    }
  };

  return Loggedin ? (
    "You are already logged in"
  ) : (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <center>
          <h1>LOGIN</h1>
        </center>
        <br />
        <Error error={error} />
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email" {...emailBind} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              {...passBind}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleLogin}
            className="btn-block btn-lg"
            type="button"
          >
            SIGN IN
          </Button>
          <span className="p-1"></span>
          <center>
            <br />
            <a href="/register">Create an account</a>
            <br />
            <a href="/reset">Forgot your password?</a>
          </center>
        </Form>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  tokenProps: state.tokenReducer,
});
export default connect(mapStateToProps, { addToken })(Login);
