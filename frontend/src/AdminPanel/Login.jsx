import React from "react";
import { connect } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { myFetch } from "../Utils/communication";
import { addTokenAdmin } from "../actions/addAction";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.Email = React.createRef();
    this.Password = React.createRef();
    this.Box = React.createRef();
  }

  showError(message) {
    this.Box.current.className = "alert alert-danger";
    this.Box.current.innerHTML = message;
    setTimeout(() => {
      this.Box.current.className = "d-none";
    }, 2000);
  }

  showSuccess(message) {
    this.Box.current.className = "alert alert-success";
    this.Box.current.innerHTML = "<strong>Success! </strong>" + message;
    setTimeout(() => {
      this.Box.current.className = "d-none";
    }, 2000);
  }

  handleLogin = async () => {
    const data = {
      email: this.Email.current.value,
      password: this.Password.current.value,
    };
    try {
      const response = await myFetch("/admin/login", "POST", data);
      const { token } = await response.json();
      this.props.addTokenAdmin(token);
    } catch (e) {
      this.showError("Username or password is incorrect!");
    }
  };

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Admin Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <div ref={this.Box} className="d-none"></div>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          innerRef={this.Email}
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          innerRef={this.Password}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      <button
                        type="button"
                        onClick={this.handleLogin}
                        className="btn btn-primary"
                      >
                        Login
                      </button>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  tokenProps: state.adminToken,
});

export default connect(mapStateToProps, { addTokenAdmin })(Login);
