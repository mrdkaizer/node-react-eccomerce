import React from "react";
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
import CIcon from "@coreui/icons-react";

import { myFetch } from "../Utils/communication";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.Name = React.createRef();
    this.About = React.createRef();

    this.Box = React.createRef();

    this.handleSumbit = this.handleSumbit.bind(this);
  }
  async handleSumbit() {
    try {
      const name = this.Name.current.value;
      const about = this.About.current.value;
      if (name === "") {
        return this.showError("Please provide a name!");
      }
      const res = await myFetch("/category", "POST", { name, about });
      if (res.status === 201) {
        return this.showSuccess("Category created!");
      }
      this.showError("Something went wrong.");
    } catch (e) {
      this.showError(e);
    }
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

  render() {
    return (
      <CCard className="container">
        <CCardHeader>
          Categories
          <small> add</small>
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
                <CLabel htmlFor="text-input">Category Name</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  innerRef={this.Name}
                  placeholder="Category Name (ex. Herbal)"
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
                  innerRef={this.About}
                  id="text-input"
                  name="text-input"
                  placeholder="About (ex. Herbal food is good for you)"
                />
                <CFormText>Describe the category.</CFormText>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton
            type="submit"
            onClick={this.handleSumbit}
            size="sm"
            color="primary"
          >
            <CIcon name="cil-scrubber" /> Create
          </CButton>
        </CCardFooter>
        <div ref={this.Box} className="d-none"></div>
      </CCard>
    );
  }
}

export default Categories;
