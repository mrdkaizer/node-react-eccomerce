import React, { useState, useEffect } from "react";
import { getFetch } from "../Utils/communication";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { getNumbers } from "../actions/getAction";

const NavItem = (props) => {
  const pageURI = window.location.pathname + window.location.search;
  let liStyle =
    props.path === decodeURIComponent(pageURI)
      ? { backgroundColor: "lightgrey" }
      : { color: "" };

  const aClassName = props.disabled ? "nav-link disabled" : "nav-link";
  return (
    <li style={liStyle}>
      <a href={props.path} className={aClassName}>
        <i className={props.img}></i> {props.name}
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
          <NavItem img="fas fa-home" path="/" name="Home" href="/"></NavItem>

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

        {user.name ? (
          <Nav className="navbar-nav mr-right">
            <NavDropdown
              title={
                <span>
                  <li className="fas fa-user-circle"> </li> {user.name}
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/user/orders">
                <i className="fas fa-shopping-basket"></i> Orders
              </NavDropdown.Item>
              <NavDropdown.Item href="/user/edit">
                <i className="fas fa-user-edit"></i> Change Details
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">
                <i className="fas fa-sign-out-alt"></i> Logout
              </NavDropdown.Item>
            </NavDropdown>
            <NavItem
              img="fas fa-sign-out-alt"
              path="/logout"
              name="Logout"
            ></NavItem>
          </Nav>
        ) : (
          <Nav className="navbar-nav mr-right">
            <NavItem img="fas fa-sign-in-alt" name="Login" path="/login" />
            <NavItem
              img="far fa-user"
              path="/register"
              name="Register"
            ></NavItem>
          </Nav>
        )}
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
