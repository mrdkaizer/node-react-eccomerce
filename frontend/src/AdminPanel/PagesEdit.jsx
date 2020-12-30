import { myFetch, getFetch } from "../Utils/communication";
import { useForm } from "../hooks/form-hook";
import { Error, Success } from "../Components/Message";

import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CTextarea,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
} from "@coreui/react";
import { connect } from "react-redux";

function PagesEdit(props) {
  const [values, handleChange, setValue] = useForm({
    link: "",
    title: "",
    content: "",
  });
  const [error, setError] = useState("");
  const [success] = useState("");

  const [errorBot, setErrorBot] = useState("");
  const [successBot, setSuccessBot] = useState("");

  const handleDelete = async () => {
    try {
      if (values.link === "") {
        return setErrorBot("Please provide a correct link first!");
      }
      const res = await myFetch(
        `/page/${values.link}`,
        "DELETE",
        values,
        props.tokenProps.token
      );
      if (res.status === 200) {
        setErrorBot("");
        setError("");
        return setSuccessBot("Page has been deleted!");
      }
      setErrorBot("Something went wrong!");
    } catch (e) {
      setErrorBot(e.message);
    }
  };

  const handleSumbit = async () => {
    try {
      if (values.link === "") {
        return setErrorBot("Please provide a correct link first!");
      }
      if (values.title === "") {
        return setErrorBot("Please provide a name!");
      }
      const res = await myFetch(
        `/page/${values.link}`,
        "PATCH",
        values,
        props.tokenProps.token
      );
      if (res.status === 200) {
        setErrorBot("");
        setError("");
        return setSuccessBot("Page has been updated!");
      }
      setErrorBot("Something went wrong!");
    } catch (e) {
      setErrorBot(e.message);
    }
  };

  const handleLoad = async () => {
    try {
      if (values.link === "") {
        return setError("Please provide a correct link first!");
      }
      const c = await getFetch(`/page/${values.link}`);
      if (!c) {
        return setError("This is not a valid link!");
      }
      setValue({ ...c });
      setError("");
      setErrorBot("");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <CCard className="container">
      <CCardHeader>
        Pages
        <small> edit</small>
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
              <CLabel htmlFor="text-input">Page Link</CLabel>
            </CCol>

            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="link"
                onChange={handleChange}
                placeholder="Page Link (ex. about-us)"
              />
              <CButton
                type="button"
                onClick={handleLoad}
                size="sm"
                color="secondary"
              >
                <i className="fas fa-download"></i> Load Page
              </CButton>
              <CFormText>The link of the page.</CFormText>
            </CCol>
          </CFormGroup>
          {error ? <Error error={error} /> : <Success success={success} />}
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
                defaultValue={values.title}
                onChange={handleChange}
                placeholder="Page Name (ex. Terms of use)"
              />
              <CFormText>The name of the page.</CFormText>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              Content<span style={{ color: "red" }}>*</span>
            </CCol>
            <CCol xs="12" md="9">
              <CTextarea
                defaultValue={values.content}
                onChange={handleChange}
                name="content"
                id="textarea-input"
                rows="9"
                placeholder="You can use html tags to make your text look better. Fo instance, to make your text bold you can use <strong>My text</strong> and for a line break <br>."
              />
              <CFormText>The content of the page in html format.</CFormText>
            </CCol>
          </CFormGroup>
          {errorBot ? (
            <Error error={errorBot} />
          ) : (
            <Success success={successBot} />
          )}
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton type="button" onClick={handleSumbit} size="sm" color="primary">
          <i className="fas fa-edit"></i> Edit
        </CButton>
        <CButton type="button" onClick={handleDelete} size="sm" color="danger">
          <i className="fas fa-trash-alt"></i> Delete Page
        </CButton>
      </CCardFooter>
    </CCard>
  );
}

const mapStateToProps = (state) => ({
  tokenProps: state.adminToken,
});

export default connect(mapStateToProps, {})(PagesEdit);
