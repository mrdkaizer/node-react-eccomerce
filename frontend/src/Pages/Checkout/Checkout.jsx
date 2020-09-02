import { getFetch, myFetch } from "../../Utils/communication";
import { validation } from "../../Utils/accountValidation";
import { updateCart } from "../../actions/updateAction";
import { addToken } from "../../actions/addAction";
import { useForm } from "../../hooks/form-hook";
import { useCart } from "../../hooks/cart-hook";
import { Error, Success } from "../../Components/Message";
import { updateCustomer } from "../../Utils/updateCustomer";

import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";

function Checkout(props) {
  const [cart] = useCart(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [register, setRegister] = useState(false);
  const [term, setTerm] = useState(false);
  const formRef = useRef();
  const [values, handleChange, setValue] = useForm({
    name: "",
    email: "",
    password: "",
    confirm: "",
    address: "",
    postal: "",
    city: "",
    country: "",
  });

  const successOrder = () => {
    props.updateCart({});
    window.location.href = "/success";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.tokenProps.token) {
          const c = await getFetch("/customer/", props.tokenProps.token);
          const u = await getFetch("/user/", props.tokenProps.token);
          setValue({ ...c, ...u });
          setLoggedin(true);
        }
      } catch (e) {
        setLoggedin(false);
      }
    };
    fetchData();
  }, [props.tokenProps.token, setValue]);

  const handleOrder = async () => {
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
    let token;
    //register first before making an order...
    if (!loggedin && register) {
      try {
        validation(user);
        const response = await myFetch("/customer/register", "POST", user);
        if (response.status === 400) {
          return setError("This email already exists");
        }
        if (response.status === 201) {
          const json = await response.json();
          formRef.current.reset();
          props.addToken(json.token);
          token = json.token;
        }
        setLoggedin(true);
      } catch (e) {
        return setError(e.message);
      }
    }

    const stateCart = props.cartProps;
    let myCart = [];
    let keys = Object.keys(stateCart);

    if (keys.length === 0) {
      return setError("Your shopping cart is empty");
    }

    for (let i = 0; i < keys.length; i++) {
      if (!stateCart[keys[i]].available) {
        return setError(
          "One or more items in your cart are not available right now."
        );
      }
      myCart = myCart.concat({
        link: stateCart[keys[i]].link,
        quantity: stateCart[keys[i]].quantity,
      });
    }

    if (loggedin || register) {
      // place the order as a user
      const response = await myFetch(
        "/order/user",
        "POST",
        {
          cart: myCart,
          shipping: cart.shipping,
          total: cart.total,
        },
        props.tokenProps.token ? props.tokenProps.token : token
      );

      if (response.status === 201) {
        successOrder();
      } else {
        return setError("Something went wrong.. Try again later.");
      }
    } else {
      // place the order as quest
      const { name, email, address, postal, city, country } = user;
      if (
        name === "" ||
        email === "" ||
        address === "" ||
        postal === "" ||
        city === "" ||
        country === ""
      ) {
        return setError("All fields are required");
      }
      const response = await myFetch("/order/", "POST", {
        name,
        email,
        address,
        postal,
        city,
        country,
        cart: myCart,
        shipping: cart.shipping,
        total: cart.total,
      });

      if (response.status === 201) {
        successOrder();
      } else {
        setError("Something went wrong! Try another email.");
      }
    }
  };

  const updateDetails = async () => {
    try {
      const customer = {
        address: values.address,
        postal: values.postal,
        city: values.city,
        country: values.country,
      };
      await updateCustomer(customer, props.tokenProps.token);
      setError("");
      setSuccess("Account has been updated!");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="">
      <p className="alert alert-primary">Please check your details below: </p>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {error ? <Error error={error} /> : <Success success={success} />}

            <Form ref={formRef}>
              <Form.Group controlId="fullname">
                {loggedin ? (
                  <Form.Control
                    onChange={handleChange}
                    name="name"
                    type="text"
                    defaultValue={values.name}
                    placeholder="Full Name"
                    readOnly
                  />
                ) : (
                  <Form.Control
                    onChange={handleChange}
                    name="name"
                    type="text"
                    placeholder="Full Name"
                  />
                )}
              </Form.Group>
              <Form.Group controlId="email">
                {loggedin ? (
                  <Form.Control
                    onChange={handleChange}
                    defaultValue={values.email}
                    name="email"
                    type="text"
                    readOnly
                    placeholder="Email"
                  />
                ) : (
                  <Form.Control
                    onChange={handleChange}
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                )}
              </Form.Group>
              <h5>Shpping Details: </h5>
              <Form.Group controlId="address">
                <Form.Control
                  onChange={handleChange}
                  defaultValue={values.address}
                  name="address"
                  type="text"
                  placeholder="Address"
                />
              </Form.Group>
              <Form.Group controlId="postal">
                <Form.Control
                  onChange={handleChange}
                  defaultValue={values.postal}
                  name="postal"
                  type="text"
                  placeholder="Postal Code"
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Control
                  onChange={handleChange}
                  defaultValue={values.city}
                  name="city"
                  type="text"
                  placeholder="City"
                />
              </Form.Group>
              <Form.Group controlId="country">
                <Form.Control
                  onChange={handleChange}
                  defaultValue={values.country}
                  name="country"
                  type="text"
                  placeholder="Country"
                />
              </Form.Group>
              {loggedin ? (
                <div>
                  <button
                    onClick={updateDetails}
                    className="btn btn-block btn-lg btn-primary"
                    type="button"
                  >
                    UPDATE DETAILS
                  </button>
                  <div className="p-2"></div>
                </div>
              ) : (
                <Form.Check
                  type="checkbox"
                  onChange={() => {
                    setRegister(!register);
                  }}
                  label="Remember me for future purchases"
                />
              )}
              {register && (
                <div>
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
                  <Form.Group controlId="terms">
                    <Form.Check
                      type="checkbox"
                      onChange={() => setTerm(!term)}
                      label="I read and agree with the terms and conditions."
                    />
                  </Form.Group>
                </div>
              )}
            </Form>
          </div>
          <div className="col-md-6">
            <div className="shoping__checkout">
              <h5>Order Total</h5>
              <ul>
                <li>
                  Subtotal{" "}
                  <span>
                    {props.info.currencySymbol} {cart.total.toFixed(2)}
                  </span>
                </li>
                <li>
                  Shipping{" "}
                  <span>
                    {props.info.currencySymbol} {cart.shipping}
                  </span>
                </li>
                <li>
                  Total{" "}
                  <span>
                    {props.info.currencySymbol}{" "}
                    {(cart.total + cart.shipping).toFixed(2)}
                  </span>
                </li>
              </ul>

              <button onClick={handleOrder} className="primary-btn">
                PLACE ORDER
              </button>
              <br />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  cartProps: state.cartReducer,
  info: state.infoReducer,
  tokenProps: state.tokenReducer,
});

export default connect(mapStateToProps, { updateCart, addToken })(Checkout);
