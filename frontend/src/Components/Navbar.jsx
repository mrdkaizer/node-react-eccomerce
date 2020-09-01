import React, { useState, useEffect } from "react";
import { getFetch } from "../Utils/communication";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { getNumbers } from "../actions/getAction";

const NavItem = (props) => {
  const pageURI = window.location.pathname + window.location.search;
  let liStyle =
    props.path === decodeURIComponent(pageURI)
      ? { textDecoration: "underline" }
      : { color: "" };

  if (decodeURIComponent(pageURI) === "/register" && props.path === "/login") {
    liStyle = { textDecoration: "underline" };
  }

  if (decodeURIComponent(pageURI) === "/" && props.path === "/shop") {
    liStyle = { textDecoration: "underline" };
  }

  const aClassName = props.disabled ? "nav-link disabled" : "nav-link";
  return (
    <li style={liStyle}>
      <a href={props.path} className={aClassName}>
        {props.name}
        {props.path === pageURI ? (
          <span className="sr-only">(current)</span>
        ) : (
          ""
        )}
      </a>
    </li>
  );
};

function Navigation(props) {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.tokenProps.token) {
          const user = await getFetch("/user", props.tokenProps.token);
          setUser(user);
        }
      } catch (e) {}
      const catg = await getFetch("/category");
      setCategories(catg);
    };
    fetchData();
  }, [props.tokenProps.token]);

  return (
    <Navbar className="navbar navbar-light" expand="lg">
      <Navbar.Brand href="/">{props.info.sitename}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar-nav mr-auto">
          <NavItem name="Home" path="/shop" />
          {categories.map((answer) => {
            return (
              <NavItem
                key={answer.link}
                name={answer.name}
                path={"/shop/" + answer.link}
              />
            );
          })}
        </Nav>
        <Nav className="navbar-nav mr-auto"></Nav>
        <Nav className="navbar-nav mr-auto">
          {user.name ? (
            <NavDropdown title={user.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="/user/orders">Orders</NavDropdown.Item>
              <NavDropdown.Item href="/user/edit">
                Change Details
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <ul className="navbar-nav">
              <NavItem name="Account" path="/login" />
            </ul>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
const mapStateToProps = (state) => ({
  cartProps: state.cartReducer,
  tokenProps: state.tokenReducer,
  info: state.infoReducer,
});
export default connect(mapStateToProps, { getNumbers })(Navigation);
