import Login from "./AdminPanel/Login";
import Footer from "./Components/Footer";
import Products from "./AdminPanel/Products";
import Categories from "./AdminPanel/Categories";
import Orders from "./AdminPanel/Orders";
import ProductEdit from "./AdminPanel/ProductEdit";
import Navbar from "./AdminPanel/Navbar";
import CategoriesEdit from "./AdminPanel/CategoriesEdit";
import Pages from "./AdminPanel/Pages";
import PagesEdit from "./AdminPanel/PagesEdit";

import store from "./store.js";
import { storeState } from "./localStorage.js";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import SiteInfo from "./AdminPanel/SiteInfo";
import NotFound from "./Components/NotFound";

store.subscribe(() => {
  storeState(store.getState());
});

class AdminPanel extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <img src="/logo.png" alt="logo" id="company-logo"></img>
        <Navbar />
        <div className="conatiner">
          <Router>
            <Switch>
              <Route exact path="/admin/" component={Login} />
              <Route path="/admin/login" component={Login} />
              <Route path="/admin/pages/add" component={Pages} />
              <Route path="/admin/pages/edit" component={PagesEdit} />
              <Route path="/admin/products/add" component={Products} />
              <Route path="/admin/products/edit" component={ProductEdit} />
              <Route path="/admin/categories/add" component={Categories} />
              <Route path="/admin/categories/edit" component={CategoriesEdit} />
              <Route path="/admin/orders/" component={Orders} />
              <Route path="/admin/info" component={SiteInfo} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Router>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default AdminPanel;
