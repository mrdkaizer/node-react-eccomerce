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

import { getFetch, myFetch } from "../Utils/communication";

class CategoriesEdit extends React.Component {
  constructor(props) {
    super(props);

    this.handleLoad = this.handleLoad.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    //ref
    this.Link = React.createRef();
    this.Name = React.createRef();
    this.About = React.createRef();
    this.Box = React.createRef();
    this.Form = React.createRef();
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

  async handleLoad() {
    try {
      if (this.Link.current.value === "") {
        return this.showError("Please provide a correct link first!");
      }
      const c = await getFetch(`/category/${this.Link.current.value}`);
      if (!c) {
        return this.showError("This is not a valid link!");
      }
      this.Name.current.value = c.name;
      if (c.about) {
        this.About.current.value = c.about;
      }
    } catch (e) {
      return this.showError(e);
    }
  }

  async handleDelete() {
    try {
      if (this.Link.current.value === "") {
        return this.showError("Please provide a correct link first!");
      }
      const c = await myFetch(`/category/${this.Link.current.value}`, "DELETE");
      this.Form.current.reset();
      if (c.status === 200) {
        return this.showSuccess("Category has been delete");
      }
      this.showError("Categoy could not be deleted.");
    } catch (e) {
      this.showError(e);
    }
  }

  async handleEdit() {
    try {
      if (this.Link.current.value === "") {
        return this.showError("Please provide a correct link first!");
      }
      const name = this.Name.current.value;
      const about = this.About.current.value;
      const res = await myFetch(
        `/category/${this.Link.current.value}`,
        "PATCH",
        { name, about }
      );
      if (res.status === 404) {
        return this.showError("Please provide a correct link!");
      }
      if (res.status === 200) {
        return this.showSuccess("Category has been updated!");
      }
      this.showError("Something went wrong!");
    } catch (e) {
      this.showError(e);
    }
  }

  render() {
    return (
      <CCard className="container">
        <CCardHeader>
          Categories
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
                <CLabel htmlFor="text-input">Category Link</CLabel>
              </CCol>

              <CCol xs="12" md="9">
                <CInput
                  innerRef={this.Link}
                  id="text-input"
                  name="text-input"
                  placeholder="Category Link (ex. herbal)"
                />
                <CButton
                  type="button"
                  onClick={this.handleLoad}
                  size="sm"
                  color="secondary"
                >
                  <CIcon name="cil-ban" /> Load Category
                </CButton>
                <CFormText>The link of the category.</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Category Name</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  innerRef={this.Name}
                  id="text-input"
                  name="text-input"
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
            type="button"
            onClick={this.handleEdit}
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
            <CIcon name="cil-ban" /> Delete Category
          </CButton>
        </CCardFooter>
        <div ref={this.Box} className="d-none"></div>
      </CCard>
    );
  }
}

export default CategoriesEdit;
