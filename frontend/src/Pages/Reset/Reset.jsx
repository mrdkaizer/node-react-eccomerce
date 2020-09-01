import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { myFetch } from "../../Utils/communication";

class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.Email = React.createRef();
    this.Box = React.createRef();
  }

  showError = (message) => {
    this.Box.current.className = "alert alert-danger";
    this.Box.current.innerHTML = message;
  };

  showSuccess = (message) => {
    this.Box.current.className = "alert alert-success";
    this.Box.current.innerHTML = "<strong>Success! </strong>" + message;
  };

  reset = async () => {
    try {
      const email = this.Email.current.value;
      if (!email) {
        return this.showError("Please enter your email");
      }
      await myFetch("/user/reset", "POST", { email });
      this.showSuccess("Please check your email.");
    } catch (e) {
      this.showError("Something went wrong");
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div ref={this.Box} className="d-none"></div>
          <h5>RESET PASSWORD</h5>
          <Form>
            <Form.Group controlId="email">
              <Form.Control
                ref={this.Email}
                type="email"
                placeholder="Email Address"
              />
            </Form.Group>
            <Button
              className="btn"
              variant="primary"
              type="button"
              onClick={this.reset}
            >
              RESET
            </Button>
          </Form>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  info: state.infoReducer,
});
export default connect(mapStateToProps, {})(Reset);
