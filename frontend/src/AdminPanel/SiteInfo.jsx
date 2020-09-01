import React, { Component } from "react";
import { connect } from "react-redux";
import { getFetch, myFetch } from "../Utils/communication";
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

class SiteInfo extends Component {
  constructor(props) {
    super(props);

    //bind
    this.handleSubmit = this.handleSubmit.bind(this);

    //ref
    this.SiteName = React.createRef();
    this.About = React.createRef();
    this.Phone = React.createRef();
    this.Email = React.createRef();
    this.ShippingCharge = React.createRef();
    this.ShippingThreshold = React.createRef();
    this.CurrencySymbol = React.createRef();
    this.Announcement = React.createRef();
    this.FacebookURL = React.createRef();
    this.YoutubeURL = React.createRef();
    this.InstagramURL = React.createRef();
    this.TwitterURL = React.createRef();
    this.Box = React.createRef();
  }
  showError(message) {
    this.Box.current.className = "alert alert-danger";
    this.Box.current.innerHTML = message;
  }

  showSuccess(message) {
    this.Box.current.className = "alert alert-success";
    this.Box.current.innerHTML = "<strong>Success! </strong>" + message;
    setTimeout(() => {
      this.Box.current.className = "d-none";
    }, 2000);
  }

  async componentDidMount() {
    console.log(this.props);
    const {
      sitename,
      about,
      phone,
      email,
      shippingCharge,
      shippingThreshold,
      currencySymbol,
      facebookURL,
      announcement,
      youtubeURL,
      instagramURL,
      twitterURL,
    } = await getFetch("/info");
    this.SiteName.current.value = sitename;
    this.About.current.value = about;
    this.Phone.current.value = phone;
    this.Email.current.value = email;
    this.ShippingCharge.current.value = shippingCharge;
    this.ShippingThreshold.current.value = shippingThreshold;
    this.CurrencySymbol.current.value = currencySymbol;
    this.Announcement.current.value = announcement;
    this.FacebookURL.current.value = facebookURL;
    this.YoutubeURL.current.value = youtubeURL;
    this.InstagramURL.current.value = instagramURL;
    this.TwitterURL.current.value = twitterURL;
  }

  async handleSubmit() {
    try {
      const info = {
        sitename: this.SiteName.current.value,
        about: this.About.current.value,
        phone: this.Phone.current.value,
        email: this.Email.current.value,
        shippingCharge: this.ShippingCharge.current.value,
        shippingThreshold: this.ShippingThreshold.current.value,
        currencySymbol: this.CurrencySymbol.current.value,
        announcement: this.Announcement.current.value,
        facebookURL: this.FacebookURL.current.value,
        youtubeURL: this.YoutubeURL.current.value,
        instagramURL: this.InstagramURL.current.value,
        twitterURL: this.TwitterURL.current.value,
      };

      const response = await myFetch("/info", "PATCH", info);
      if (response.status === 200) {
        return this.showSuccess("Site info were updated!");
      }
      this.showError("Something went wrong");
    } catch (e) {
      this.showError(e);
    }
  }

  render() {
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
                <CLabel htmlFor="text-input">Site Name</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Site Name (ex. MyShop)"
                  innerRef={this.SiteName}
                />
                <CFormText>
                  The name of the site, will appear in many places such a footer
                  and emails.
                </CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">About</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Site Slogan (ex. the Best Shop ever)"
                  innerRef={this.About}
                />
                <CFormText>A slogan for the company.</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Phone</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Phone Number (ex. +35799223311)"
                  innerRef={this.Phone}
                />
                <CFormText>Company's telephone number.</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Email</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Email (ex. info@example.com)"
                  innerRef={this.Email}
                />
                <CFormText>Company's email.</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Shipping Charge</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Shipping Charge (ex. 5)"
                  innerRef={this.ShippingCharge}
                />
                <CFormText>Shipping Charge</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Shipping Threshold</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Shipping Threshold (ex. 25)"
                  innerRef={this.ShippingThreshold}
                />
                <CFormText>
                  Purchase above this price will get free shipping.
                </CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Currency Symbol</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Currency Symbol (ex. €)"
                  innerRef={this.CurrencySymbol}
                />
                <CFormText>
                  This symbol will appear in all price tags.
                </CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Announcement</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Announcement (ex. Use code 20X19 to get 20% off!)"
                  innerRef={this.Announcement}
                />
                <CFormText>
                  This will appear at the top of every page.
                </CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Facebook URL</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Facebook URL (ex. http://facebook.com/myShop)"
                  innerRef={this.FacebookURL}
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
                  name="text-input"
                  placeholder="Youtube URL (ex. http://youtube.com/myShop)"
                  innerRef={this.YoutubeURL}
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
                  name="text-input"
                  placeholder="Instagram URL (ex. http://instagram.com/myShop)"
                  innerRef={this.InstagramURL}
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
                  name="text-input"
                  placeholder="Twitter URL (ex. http://twitter.com/myShop)"
                  innerRef={this.TwitterURL}
                />
                <CFormText>Your twitter page.</CFormText>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
        <div ref={this.Box} className="d-none"></div>
        <CCardFooter>
          <CButton
            type="submit"
            onClick={this.handleSubmit}
            size="sm"
            color="primary"
          >
            <CIcon name="cil-scrubber" /> Update
          </CButton>
        </CCardFooter>
      </CCard>
    );
  }
}
const mapStateToProps = (state) => ({
  tokenProps: state.adminToken,
});

export default connect(mapStateToProps, {})(SiteInfo);
