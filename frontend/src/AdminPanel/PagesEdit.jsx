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

import { myFetch, getFetch } from "../Utils/communication";

class PagesEdit extends React.Component {
  constructor(props) {
    super(props);
    this.Name = React.createRef();
    this.Content = React.createRef();
    this.Link = React.createRef();
    this.Form = React.createRef();

    this.Box = React.createRef();

    this.handleSumbit = this.handleSumbit.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete() {
    try {
      if (this.Link.current.value === "") {
        return this.showError("Please provide a correct link first!");
      }
      const c = await myFetch(`/page/${this.Link.current.value}`, "DELETE");
      this.Form.current.reset();
      if (c.status === 200) {
        return this.showSuccess("Page has been delete");
      }
      this.showError("Page could not be deleted.");
    } catch (e) {
      this.showError(e);
    }
  }

  async handleSumbit() {
    try {
      if (this.Link.current.value === "") {
        return this.showError("Please provide a correct link first!");
      }
      const title = this.Name.current.value;
      const content = this.Content.current.value;
      if (title === "") {
        return this.showError("Please provide a name!");
      }
      const res = await myFetch(`/page/${this.Link.current.value}`, "PATCH", {
        title,
        content,
      });
      if (res.status === 200) {
        return this.showSuccess("Page has been updated!");
      }
      this.showError("Something went wrong!");
    } catch (e) {
      this.showError(e);
    }
  }

  async handleLoad() {
    try {
      if (this.Link.current.value === "") {
        return this.showError("Please provide a correct link first!");
      }
      const c = await getFetch(`/page/${this.Link.current.value}`);
      if (!c) {
        return this.showError("This is not a valid link!");
      }
      this.Name.current.value = c.title;
      if (c.content) {
        this.Content.current.value = c.content;
      }
    } catch (e) {
      return this.showError(e);
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
          <small> edit</small>
        </CCardHeader>
        <CCardBody>
          <CForm
            innerRef={this.Form}
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
                  innerRef={this.Link}
                  id="text-input"
                  name="text-input"
                  placeholder="Page Link (ex. about-us)"
                />
                <CButton
                  type="button"
                  onClick={this.handleLoad}
                  size="sm"
                  color="secondary"
                >
                  <CIcon name="cil-ban" /> Load Page
                </CButton>
                <CFormText>The link of the page.</CFormText>
              </CCol>
            </CFormGroup>

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
            <CIcon name="cil-scrubber" /> Edit
          </CButton>
          <CButton
            type="button"
            onClick={this.handleDelete}
            size="sm"
            color="danger"
          >
            <CIcon name="cil-scrubber" /> Delete Page
          </CButton>
        </CCardFooter>
        <div ref={this.Box} className="d-none"></div>
      </CCard>
    );
  }
}

export default PagesEdit;
