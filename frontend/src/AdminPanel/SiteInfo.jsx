import { useForm } from "../hooks/form-hook";
import { getFetch, myFetch } from "../Utils/communication";
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

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
function SiteInfo(props) {
  const [values, handleChange, setValue] = useForm({
    sitename: "",
    about: "",
    phone: "",
    email: "",
    shippingCharge: "",
    shippingThreshold: "",
    currencySymbol: "",
    announcement: "",
    facebookURL: "",
    youtubeURL: "",
    instagramURL: "",
    twitterURL: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.tokenProps.token) {
          const i = await getFetch("/info");
          setValue({ ...i });
        }
      } catch (e) {
        //setLoggedin(false);
      }
    };
    fetchData();
  }, [props.tokenProps.token, setValue]);

  const handleSubmit = async () => {
    try {
      const response = await myFetch(
        "/info",
        "PATCH",
        values,
        props.tokenProps.token
      );
      console.log(values);
      if (response.status === 200) {
        setError("");
        setSuccess("Site info were updated!");
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
        Site Info
        <small> Edit</small>
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
                Site Name<span style={{ color: "red" }}>*</span>
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="sitename"
                placeholder="Site Name (ex. MyShop)"
                onChange={handleChange}
                defaultValue={values.sitename}
              />
              <CFormText>
                The name of the site, will appear in many places such a footer
                and emails.
              </CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">
                About<span style={{ color: "red" }}>*</span>
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="about"
                placeholder="Site Slogan (ex. the Best Shop ever)"
                onChange={handleChange}
                defaultValue={values.about}
              />
              <CFormText>A slogan for the company.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">
                Phone<span style={{ color: "red" }}>*</span>
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="phone"
                placeholder="Phone Number (ex. +35799223311)"
                onChange={handleChange}
                defaultValue={values.phone}
              />
              <CFormText>Company's telephone number.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">
                Email<span style={{ color: "red" }}>*</span>
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="email"
                onChange={handleChange}
                defaultValue={values.email}
                placeholder="Email (ex. info@example.com)"
              />
              <CFormText>Company's email.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">
                Shipping Charge<span style={{ color: "red" }}>*</span>
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="shippingCharge"
                onChange={handleChange}
                defaultValue={values.shippingCharge}
                placeholder="Shipping Charge (ex. 5)"
              />
              <CFormText>Shipping Charge</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">
                Shipping Threshold<span style={{ color: "red" }}>*</span>
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="shippingThreshold"
                onChange={handleChange}
                defaultValue={values.shippingThreshold}
                placeholder="Shipping Threshold (ex. 25)"
              />
              <CFormText>
                Purchase above this price will get free shipping.
              </CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">
                Currency Symbol<span style={{ color: "red" }}>*</span>
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="currencySymbol"
                placeholder="Currency Symbol (ex. €)"
                onChange={handleChange}
                defaultValue={values.currencySymbol}
              />
              <CFormText>This symbol will appear in all price tags.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Announcement</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="announcement"
                onChange={handleChange}
                defaultValue={values.announcement}
                placeholder="Announcement (ex. Use code 20X19 to get 20% off!)"
              />
              <CFormText>This will appear at the top of every page.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Facebook URL</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="facebookURL"
                onChange={handleChange}
                defaultValue={values.facebookURL}
                placeholder="Facebook URL (ex. http://facebook.com/myShop)"
              />
              <CFormText>Your facebook page.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Youtube URL</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="youtubeURL"
                onChange={handleChange}
                defaultValue={values.youtubeURL}
                placeholder="Youtube URL (ex. http://youtube.com/myShop)"
              />
              <CFormText>Your youtube channel.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Instagram URL</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="instagramURL"
                onChange={handleChange}
                defaultValue={values.instagramURL}
                placeholder="Instagram URL (ex. http://instagram.com/myShop)"
              />
              <CFormText>Your instagram page.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Twitter URL</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                onChange={handleChange}
                defaultValue={values.twitterURL}
                name="twitterURL"
                placeholder="Twitter URL (ex. http://twitter.com/myShop)"
              />
              <CFormText>Your twitter page.</CFormText>
            </CCol>
          </CFormGroup>
          {error ? <Error error={error} /> : <Success success={success} />}
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton type="submit" onClick={handleSubmit} size="sm" color="primary">
          <i className="fas fa-edit"></i> Edit
        </CButton>
      </CCardFooter>
    </CCard>
  );
}
const mapStateToProps = (state) => ({
  tokenProps: state.adminToken,
});

export default connect(mapStateToProps, {})(SiteInfo);
