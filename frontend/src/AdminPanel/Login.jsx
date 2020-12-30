import { myFetch } from "../Utils/communication";
import { addTokenAdmin } from "../actions/addAction";
import { useInput } from "../hooks/input-hook";
import { Error } from "../Components/Message";

import React, { useState } from "react";
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

function Login(props) {
  const { value: emailValue, bind: emailBind, reset: emailReset } = useInput(
    ""
  );
  const { value: passValue, bind: passBind, reset: passReset } = useInput("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const data = {
      email: emailValue,
      password: passValue,
    };
    try {
      const response = await myFetch("/admin/login", "POST", data);
      const { token } = await response.json();
      props.addTokenAdmin(token);
      emailReset();
      window.location.replace("/admin/home");
    } catch (e) {
      setError("Username or password is incorrect!");
    }
    passReset();
  };

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
                    <Error error={error} />
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <li className="fas fa-user"></li>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        {...emailBind}
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <li className="fas fa-key"></li>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        {...passBind}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <button
                      type="button"
                      onClick={handleLogin}
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
const mapStateToProps = (state) => ({
  tokenProps: state.adminToken,
});

export default connect(mapStateToProps, { addTokenAdmin })(Login);
