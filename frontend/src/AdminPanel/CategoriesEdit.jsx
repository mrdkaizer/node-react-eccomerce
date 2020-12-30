import { useForm } from "../hooks/form-hook";
import { Error, Success } from "../Components/Message";
import { getFetch, myFetch } from "../Utils/communication";



import React, { useState, useEffect } from "react";
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
import { Button, ButtonGroup } from 'reactstrap';
import { connect } from "react-redux";

function CategoriesEdit(props) {
  const [values, handleChange, setValues] = useForm({
    link: "",
    name: "",
    about: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getFetch('/category')
        setCategories(categories)
        // if (props.tokenProps.token) {
        //   const i = await getFetch("/info");
        //   setValue({ ...i });
        // }

      } catch (e) {
        //setLoggedin(false);
      }
    };
    fetchData();
  }, []);

  // const handleLoad = async () => {
  //   try {
  //     if (values.link === "") {
  //       return setError("Please provide a correct link first!");
  //     }
  //     const c = await getFetch(`/category/${values.link}`);
  //     if (!c) {
  //       return setError("This is not a valid link!");
  //     }
  //     setValues({ ...c });
  //   } catch (e) {
  //     return setError(e.message);
  //   }
  // };

  const handleDelete = async () => {
    try {
      if (values.link === "") {
        return setError("Please provide a correct link first!");
      }
      const c = await myFetch(
        `/category/${values.link}`,
        "DELETE",
        {},
        props.tokenProps.token
      );
      if (c.status === 200) {
        return setSuccess("Category has been delete");
      }
      setError("Categoy could not be deleted.");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEdit = async () => {
    try {
      if (values.link === "") {
        return setError("Please provide a correct link first!");
      }
      const res = await myFetch(
        `/category/${values.link}`,
        "PATCH",
        values,
        props.tokenProps.token
      );
      if (res.status === 404) {
        return setError("Please provide a correct link!");
      }
      if (res.status === 200) {
        return setSuccess("Category has been updated!");
      }
      setError("Something went wrong!");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <CCard className="container">
      <CCardHeader>
        Categories
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
              <CLabel htmlFor="text-input">
                Choose Category <span style={{ color: "red" }}>*</span>
              </CLabel>
            </CCol>

            <CCol xs="12" md="9">
            <ButtonGroup>
            {categories.map((answer) => {
              return (

                <Button>{answer.name}</Button>
              
              );
            })}
            </ButtonGroup>
              <CFormText>Please select a category.</CFormText>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">
                Category Name<span style={{ color: "red" }}>*</span>
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                onChange={handleChange}
                defaultValue={values.name}
                name="name"
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
                id="text-input"
                onChange={handleChange}
                defaultValue={values.about}
                name="about"
                placeholder="About (ex. Herbal food is good for you)"
              />
              <CFormText>Describe the category.</CFormText>
            </CCol>
          </CFormGroup>
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton type="button" onClick={handleEdit} size="sm" color="primary">
          <i className="fas fa-edit"></i> Edit
        </CButton>
        <CButton type="button" onClick={handleDelete} size="sm" color="danger">
          <i className="fas fa-trash-alt"></i> Delete Category
        </CButton>
      </CCardFooter>
      {error ? <Error error={error} /> : <Success success={success} />}
    </CCard>
  );
}

const mapStateToProps = (state) => ({
  tokenProps: state.adminToken,
});

export default connect(mapStateToProps, {})(CategoriesEdit);
