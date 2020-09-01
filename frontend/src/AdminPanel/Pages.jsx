import React from "react";
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
import CIcon from "@coreui/icons-react";

import { myFetch } from "../Utils/communication";

class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.Name = React.createRef();
    this.Content = React.createRef();

    this.Box = React.createRef();

    this.handleSumbit = this.handleSumbit.bind(this);
  }
  async handleSumbit() {
    try {
      const title = this.Name.current.value;
      const content = this.Content.current.value;
      if (title === "") {
        return this.showError("Please provide a name!");
      }
      const res = await myFetch("/page", "POST", { title, content });
      if (res.status === 201) {
        return this.showSuccess("Page created!");
      }
      this.showError("Something went wrong!");
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
          Pages
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
                <CLabel htmlFor="text-input">Page Name</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  innerRef={this.Name}
                  placeholder="Page Name (ex. Terms of use)"
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
                  innerRef={this.Content}
                  name="textarea-input"
                  id="textarea-input"
                  rows="9"
                  placeholder="You can use html tags to make your text look better. Fo instance, to make your text bold you can use <strong>My text</strong> and for a line break <br>."
                />
                <CFormText>The content of the page in html format.</CFormText>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton
            type="button"
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

export default Pages;
