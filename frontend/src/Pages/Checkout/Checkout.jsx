import { getFetch, myFetch } from "../../Utils/communication";
import { validation } from "../../Utils/accountValidation";
import { updateCart } from "../../actions/updateAction";
import { addToken } from "../../actions/addAction";
import { useForm } from "../../hooks/form-hook";
import { updateCustomer } from "../../Utils/updateCustomer";

import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import React, { useState, useRef } from "react";

function Checkout(props) {
  const [loggedin, setLoggedin] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [register, setRegister] = useState(false);
  const [term, setTerm] = useState(false);
  const formRef = useRef();
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

    //register first before making an order...
    if (!loggedin && register) {
      try {
        // const response = await register(user);
        //this.props.addToken(response.token);
        setLoggedin(true);
      } catch (e) {
        //this.showError(e);
        return;
      }
    }
    const stateCart = this.state.cart;
    let cart = [];
    let keys = Object.keys(stateCart);

    for (let i = 0; i < keys.length; i++) {
      if (!stateCart[keys[i]].available) {
        this.showError(
          "One or more items in your cart are not available right now."
        );
        return;
      }
      cart = cart.concat({
        link: stateCart[keys[i]].link,
        quantity: stateCart[keys[i]].quantity,
      });
    }

    if (this.state.loggedin) {
      // place the order as a user
      const response = await myFetch(
        "/order/user",
        "POST",
        {
          cart,
          shipping: this.state.shipping,
          total: this.state.total,
        },
        this.props.tokenProps.token
      );

      if (response.status === 201) {
        this.success();
      } else {
        this.showError("Something went wrong.. Try again later.");
        return;
      }
    } else {
      // place the order as quest
      const { name, email, address, postal, city, country } = user;
      if (name === "") {
        this.showError("You need to provide your full name.");
        return;
      }
      if (email === "") {
        this.showError("You need to provide your email.");
        return;
      }
      if (address === "") {
        this.showError("You need to provide your address.");
        return;
      }
      if (postal === "") {
        this.showError("You need to provide your postal code.");
        return;
      }
      if (city === "") {
        this.showError("You need to provide your city.");
        return;
      }
      if (country === "") {
        this.showError("You need to provide your country.");
        return;
      }

      const response = await myFetch("/order/", "POST", {
        name,
        email,
        address,
        postal,
        city,
        country,
        cart,
        shipping: this.state.shipping,
        total: this.state.total,
      });

      if (response.status === 201) {
        this.success();
      } else {
        this.showError("Something went wrong! Try another email.");
        return;
      }
    }
  };

  const handleRemember = () => {
    if (this.createAccount.current.className === "") {
      this.createAccount.current.className = "d-none";
      this.setState({ register: false });
    } else {
      this.createAccount.current.className = "";
      this.setState({ register: true });
    }
  };

  const handleCheck = () => {
    this.setState({ termsCheck: !this.state.termsCheck });
  };

  // async componentDidMount() {
  //   const cartProducts = this.props.cartProps;
  //   const keys = Object.keys(cartProducts);
  //   let total = 0;

  //   if (keys.length < 1) {
  //     window.location.href = "/cart";
  //     return;
  //   }

  //   for (let i = 0; i < keys.length; i++) {
  //     const link = cartProducts[keys[i]].link;
  //     const product = await getFetch(`/product/${link}`);

  //     // this product must have been delete. remove it from state.
  //     if (!product) {
  //       delete cartProducts[link];
  //       continue;
  //     }

  //     //update product just keep the quantity
  //     product.quantity = cartProducts[keys[i]].quantity;

  //     //update websites total
  //     total += product.quantity * product.price;

  //     cartProducts[link] = product;
  //   }

  //   //update shipping cost
  //   const { shippingCharge, shippingThreshold } = this.props.info;
  //   const shipping = shippingThreshold > total ? shippingCharge : 0;

  //   //update global and current state
  //   this.props.updateCart(cartProducts);
  //   this.setState({ cart: cartProducts, total, shipping });

  //   //try update login information:
  //   if (this.props.tokenProps.token) {
  //     try {
  //       const customer = await getFetch(
  //         "/customer",
  //         this.props.tokenProps.token
  //       );
  //       const user = await getFetch("/user", this.props.tokenProps.token);
  //       this.Email.current.value = user.email;
  //       this.FullName.current.value = user.name;
  //       this.Address.current.value = customer.address;
  //       this.Postal.current.value = customer.postal;
  //       this.City.current.value = customer.city;
  //       this.Country.current.value = customer.country;
  //       this.setState({ loggedin: true });
  //     } catch (e) {}
  //   }
  // }

  const updateCustomer = async () => {
    try {
      const customer = {
        address: this.Address.current.value,
        postal: this.Postal.current.value,
        city: this.City.current.value,
        country: this.Country.current.value,
      };
      await updateCustomer(customer, this.props.tokenProps.token);

      this.UpdateSuccess.current.className = "alert alert-success";
      this.UpdateSuccess.current.innerHTML =
        "Shipping information were updated!";
      setTimeout(() => {
        this.UpdateSuccess.current.className = "d-none";
      }, 2000);
    } catch (e) {
      this.showError(e);
    }
  };

  return (
    <section className="">
      <p className="alert alert-primary">Please check your details below: </p>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Form ref={formRef}>
              <Form.Group controlId="fullname">
                {loggedin ? (
                  <Form.Control
                    onChange={handleChange}
                    name="name"
                    type="text"
                    readOnly
                    placeholder="Full Name"
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
                  name="address"
                  type="text"
                  placeholder="Address"
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
              {loggedin ? (
                <div>
                  <button
                    onClick={updateCustomer}
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
                  onChange={handleRemember}
                  label="Remember me for future purchases"
                />
              )}
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
                  onChange={handleCheck}
                  label="I read and agree with the terms and conditions."
                />
              </Form.Group>
            </Form>
          </div>
          <div className="col-md-6">
            <div className="shoping__checkout">
              <h5>Order Total</h5>
              <ul>
                <li>
                  Subtotal{" "}
                  <span>
                    {props.info.currencySymbol} {total.toFixed(2)}
                  </span>
                </li>
                <li>
                  Shipping{" "}
                  <span>
                    {props.info.currencySymbol} {shipping}
                  </span>
                </li>
                <li>
                  Total{" "}
                  <span>
                    {props.info.currencySymbol} {(total + shipping).toFixed(2)}
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
