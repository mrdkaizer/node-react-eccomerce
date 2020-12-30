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
  CTextarea,
} from "@coreui/react";

import React, { useState } from "react";
import { connect } from "react-redux";

function Pages(props) {
  const [values, handleChange] = useForm({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    try {
      if (values.title === "") {
        return setError("Please provide a title first!");
      }
      const response = await myFetch(
        "/page",
        "POST",
        values,
        props.tokenProps.token
      );
      console.log(values);
      if (response.status === 201) {
        setError("");
        setSuccess("Page created!");
        return;
      }
      setError("Something went wrong");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <CCard className="container">
      <CCardHeader>
        Pages
        <small> Add</small>
      </CCardHeader>
      <CCardBody>
        <CForm
          action=""
          method="post"
          encType="multipart/form-data"
          className="form-horizontal"
        >
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">
                Title<span style={{ color: "red" }}>*</span>
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="title"
                placeholder="Page Name (ex. Terms of use)"
                onChange={handleChange}
                defaultValue={values.title}
              />
              <CFormText>The name of the page.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Content</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CTextarea
                id="text-input"
                name="content"
                rows="9"
                placeholder="You can use html tags to make your text look better. Fo instance, to make your text bold you can use <strong>My text</strong> and for a line break <br>."
                onChange={handleChange}
                defaultValue={values.content}
              />
              <CFormText>The content of the page in html format.</CFormText>
            </CCol>
          </CFormGroup>
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton type="submit" onClick={handleSubmit} size="sm" color="primary">
          <i className="fas fa-plus-circle"></i> Create
        </CButton>
      </CCardFooter>
      {error ? <Error error={error} /> : <Success success={success} />}
    </CCard>
  );
}
const mapStateToProps = (state) => ({
  tokenProps: state.adminToken,
});

export default connect(mapStateToProps, {})(Pages);
