import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { getFetch, myFetch } from "../../Utils/communication";
import { deleteToken } from "../../actions/deleteAction";
import { updateCustomer } from "../../Utils/updateCustomer";

class changeDetails extends Component {
  constructor(props) {
    super(props);
    this.Address = React.createRef();
    this.Postal = React.createRef();
    this.City = React.createRef();
    this.Country = React.createRef();
    this.Box = React.createRef();
    this.UpdateSuccess = React.createRef();
    this.Password = React.createRef();
    this.ConfirmPassword = React.createRef();

    this.updateCustomer = this.updateCustomer.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  state = {
    customer: {},
    user: {},
    loggedin: false,
  };

  async componentDidMount() {
    try {
      if (this.props.tokenProps.token) {
        const customer = await getFetch(
          "/customer",
          this.props.tokenProps.token
        );
        const user = await getFetch("/user", this.props.tokenProps.token);

        this.Address.current.value = customer.address;
        this.Postal.current.value = customer.postal;
        this.City.current.value = customer.city;
        this.Country.current.value = customer.country;

        this.setState({ user, customer, loggedin: true });
      } else {
        window.location.href = "/login";
      }
    } catch (e) {
      window.location.href = "/logout";
    }
  }
  //show error
  showError(message) {
    this.Box.current.className = "alert alert-danger";
    this.Box.current.innerHTML = message;
  }
  //show success
  showSuccess(message) {
    this.Box.current.className = "alert alert-success";
    this.Box.current.innerHTML = message;
    setTimeout(() => {
      this.Box.current.className = "d-none";
    }, 2000);
  }

  updateCustomer = async function () {
    try {
      const customer = {
        address: this.Address.current.value,
        postal: this.Postal.current.value,
        city: this.City.current.value,
        country: this.Country.current.value,
      };
      await updateCustomer(customer, this.props.tokenProps.token);

      this.showSuccess("Shipping information were updated!");
    } catch (e) {
      this.showError(e);
    }
  };

  updateUser = async function () {
    try {
      const user = {
        password: this.Password.current.value,
        confirmPassword: this.ConfirmPassword.current.value,
      };
      if (user.password !== user.confirmPassword) {
        return this.showError("Password and Confrim Password do not match!");
      }
      if (user.password.length < 7) {
        return this.showError(
          "Your password must be atleast 7 characters long."
        );
      }
      const response = await myFetch(
        "/user",
        "PATCH",
        user,
        this.props.tokenProps.token
      );
      if (response.status !== 200) {
        return this.showError(
          "Your password must be atleast 7 characters long."
        );
      }
      this.showSuccess("Password updated!");
    } catch (e) {
      this.showError(e);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Form ref={this.Form}>
              <h5>Shipping details:</h5>
              <Form.Group controlId="address">
                <Form.Control
                  ref={this.Address}
                  type="text"
                  placeholder="Shipping Address"
                />
              </Form.Group>

              <Form.Group controlId="postal">
                <Form.Control
                  ref={this.Postal}
                  type="text"
                  placeholder="Postal Code"
                />
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Control ref={this.City} type="text" placeholder="City" />
              </Form.Group>

              <Form.Group controlId="country">
                <Form.Control
                  ref={this.Country}
                  type="text"
                  placeholder="Country"
                />
              </Form.Group>

              <Button
                className="btn-block btn-lg"
                variant="primary"
                type="button"
                onClick={this.updateCustomer}
              >
                UPDATE
              </Button>
              <span className="p-1"></span>
            </Form>
          </div>
          <div className="col-md-6">
            <h5>Account details:</h5>
            <Form ref={this.Form}>
              <Form.Group controlId="password">
                <Form.Control
                  ref={this.Password}
                  type="password"
                  placeholder="New Password"
                />
              </Form.Group>
              <Form.Group controlId="confirm-password">
                <Form.Control
                  ref={this.ConfirmPassword}
                  type="password"
                  placeholder="Confirm New Password"
                />
              </Form.Group>
              <Button
                className="btn-block btn-lg"
                variant="primary"
                type="button"
                onClick={this.updateUser}
              >
                UPDATE
              </Button>
              <span className="p-1"></span>
            </Form>
          </div>
        </div>
        <div ref={this.Box} className="d-none"></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  tokenProps: state.tokenReducer,
  info: state.infoReducer,
});
export default connect(mapStateToProps, { deleteToken })(changeDetails);
