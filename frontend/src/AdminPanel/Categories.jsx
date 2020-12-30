import { useForm } from "../hooks/form-hook";
import { myFetch } from "../Utils/communication";
import { Error, Success } from "../Components/Message";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
} from "@coreui/react";

import React, { useState } from "react";
import { connect } from "react-redux";

function Categories(props) {
  const [values, handleChange] = useForm({
    name: "",
    about: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    try {
      if (values.name === "") {
        return setError("Please provide a valid name.");
      }
      const response = await myFetch(
        "/category",
        "POST",
        values,
        props.tokenProps.token
      );
      if (response.status === 201) {
        setError("");
        return setSuccess("Category created!");
      }
      setError("Something went wrong");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <CCard className="container">
      <CCardHeader>
        Categories
        <small> Add</small>
      </CCardHeader>
      <CCardBody>
        <CForm
          method="post"
          encType="multipart/form-data"
          className="form-horizontal"
        >
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">
                Category Name<span style={{ color: "red" }}>*</span>
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="name"
                placeholder="Category Name (ex. Herbal)"
                onChange={handleChange}
                defaultValue={values.name}
              />
              <CFormText>The name of the category.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">About</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="about"
                placeholder="About (ex. Herbal food is good for you)"
                onChange={handleChange}
                defaultValue={values.about}
              />
              <CFormText>The content of the page in html format.</CFormText>
            </CCol>
          </CFormGroup>
          {error ? <Error error={error} /> : <Success success={success} />}
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton type="submit" onClick={handleSubmit} size="sm" color="primary">
          <i className="fas fa-plus-circle"></i> Create
        </CButton>
      </CCardFooter>
    </CCard>
  );
}
const mapStateToProps = (state) => ({
  tokenProps: state.adminToken,
});

export default connect(mapStateToProps, {})(Categories);
