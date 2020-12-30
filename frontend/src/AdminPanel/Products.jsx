import React, {  useState } from "react";
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
  CTextarea,
  CInput,
  CInputCheckbox,
  CInputRadio,
  CLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

function Products(props) {
  const [images, setImages] = useState();

  const fileUpload = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = () => {
    console.log(images);
  };

  return (
    <CCard className="container">
      <CCardHeader>
        Products
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
              <CLabel htmlFor="text-input">Product Name</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Product Name (ex. CALIFORNIA GOLD NUTRITION MCT OIL (946 ML))"
              />
              <CFormText>The name of the product.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Price</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                type="Number"
                name="text-input"
                placeholder="Product Price (ex. 27.95)"
              />
              <CFormText>The price of the product.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Discount</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                type="Number"
                name="text-input"
                placeholder="Discount (ex. 20.00) which means 20% off"
              />
              <CFormText>The price of the product.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="textarea-input">Product Description</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CTextarea
                name="textarea-input"
                id="textarea-input"
                rows="9"
                placeholder="Comment... You can use html tags to make your text look better. Fo instance, to make your text bold you can use <strong>My text</strong>."
              />
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel>Categories</CLabel>
            </CCol>
            <CCol md="9">
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox1"
                  name="checkbox1"
                  value="option1"
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label"
                  htmlFor="checkbox1"
                >
                  Option 1
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox2"
                  name="checkbox2"
                  value="option2"
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label"
                  htmlFor="checkbox2"
                >
                  Option 2
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox3"
                  name="checkbox3"
                  value="option3"
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label"
                  htmlFor="checkbox3"
                >
                  Option 3
                </CLabel>
              </CFormGroup>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel>Availability</CLabel>
            </CCol>
            <CCol md="9">
              <CFormGroup variant="checkbox">
                <CInputRadio
                  className="form-check-input"
                  id="radio1"
                  name="radios"
                  value="option1"
                />
                <CLabel variant="checkbox" htmlFor="radio1">
                  Available
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox">
                <CInputRadio
                  className="form-check-input"
                  id="radio2"
                  name="radios"
                  value="option2"
                />
                <CLabel variant="checkbox" htmlFor="radio2">
                  Sold Out
                </CLabel>
              </CFormGroup>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel>Images</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <input onChange={fileUpload} type="file" id="file" multiple />
            </CCol>
          </CFormGroup>
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton type="submit" onClick={handleSubmit} size="sm" color="primary">
          <CIcon name="cil-scrubber" /> Submit
        </CButton>
        <CButton type="reset" size="sm" color="danger">
          <CIcon name="cil-ban" /> Reset
        </CButton>
      </CCardFooter>
    </CCard>
  );
}

export default Products;
