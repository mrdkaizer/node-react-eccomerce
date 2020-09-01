import { Form, Button } from "react-bootstrap";
import { addToken } from "../../actions/addAction";
import { validation } from "../../Utils/accountValidation";
import { useForm } from "../../hooks/form-hook";
import { myFetch } from "../../Utils/communication";
import { Error, Success } from "../../Components/Message";

import { connect } from "react-redux";
import React, { useState, useRef } from "react";

function Register(props) {
  const [values, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    confirm: "",
    address: "",
    postal: "",
    city: "",
    country: "",
  });

  const [term, setTerm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formRef = useRef();

  const handleCheck = () => {
    setTerm(!term);
  };

  const register = async () => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirm: values.confirm,
      address: values.address,
      postal: values.postal,
      city: values.city,
      country: values.country,
      termsCheck: term,
    };
    console.log(user);
    try {
      validation(user);
      const response = await myFetch("/customer/register", "POST", user);
      if (response.status === 400) {
        setError("This email already exists");
      }
      if (response.status === 201) {
        const json = await response.json();
        setError("");
        setSuccess("Account has been created succesfuly.");
        formRef.current.reset();
        props.addToken(json.token);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <center>
          <h1>CREATE ACCOUNT</h1>
        </center>
        <br />
        <h5>Account details:</h5>
        <Form ref={formRef}>
          <Error error={error} />
          <Success success={success} />
          <Form.Group controlId="fullname">
            <Form.Control
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Full Name"
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Control
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group controlId="confirm-password">
            <Form.Control
              onChange={handleChange}
              name="confirm"
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Group>
          <h5>Shipping details:</h5>
          <Form.Group controlId="address">
            <Form.Control
              onChange={handleChange}
              name="address"
              type="text"
              placeholder="Shipping Address"
            />
          </Form.Group>

          <Form.Group controlId="postal">
            <Form.Control
              onChange={handleChange}
              name="postal"
              type="text"
              placeholder="Postal Code"
            />
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Control
              onChange={handleChange}
              name="city"
              type="text"
              placeholder="City"
            />
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Control
              onChange={handleChange}
              name="country"
              type="text"
              placeholder="Country"
            />
          </Form.Group>

          <Form.Group controlId="terms">
            <Form.Check
              type="checkbox"
              onChange={handleCheck}
              label="I read and agree with the terms and conditions."
            />
          </Form.Group>
          <Button
            className="btn-block btn-lg"
            variant="primary"
            type="button"
            onClick={register}
          >
            CREATE
          </Button>
          <span className="p-1"></span>
        </Form>
      </div>

      <div className="col-md-3"></div>
    </div>
  );
}

export default connect(null, { addToken })(Register);
