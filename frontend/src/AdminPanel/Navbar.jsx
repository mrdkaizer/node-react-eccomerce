import React from "react";
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

class Navigation extends React.Component {
  state = {
    categories: [],
    user: {},
  };

  async componentDidMount() {
    try {
      if (this.props.tokenProps.token) {
        const user = await getFetch("/user", this.props.tokenProps.token);
        this.setState({ user });
      }
    } catch (e) {}

    const data = await getFetch("/category");
    this.setState({ categories: data });
  }
  async componentDidUpdate() {
    try {
      if (this.props.tokenProps.token && !this.state.user.name) {
        console.log("fetching");
        const user = await getFetch("/user", this.props.tokenProps.token);
        this.setState({ user });
      }
    } catch (e) {}
  }

  render() {
    return (
      <Navbar className="navbar navbar-light" expand="lg">
        <Navbar.Brand href="/">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav mr-auto">
            <NavDropdown title="Configuration" id="basic-nav-dropdown">
              <NavItem name="Site Info" path="/admin/info" />
              <NavDropdown title="Products" id="basic-nav-dropdown">
                <NavDropdown.Item href="/admin/products/add">
                  Add Product
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin/products/edit">
                  Edit Product
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item href="/admin/categories/add">
                  Add Category
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin/categories/edit">
                  Edit Category
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Pages" id="basic-nav-dropdown">
                <NavDropdown.Item href="/admin/pages/add">
                  Add Page
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin/pages/edit">
                  Edit Page
                </NavDropdown.Item>
              </NavDropdown>
            </NavDropdown>
            <NavItem name="Manage Orders" path="/admin/orders" />
            <NavItem name="Logout" path="/admin/logout" />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => ({
  cartProps: state.cartReducer,
  tokenProps: state.tokenReducer,
  info: state.infoReducer,
});
export default connect(mapStateToProps, { getNumbers })(Navigation);
