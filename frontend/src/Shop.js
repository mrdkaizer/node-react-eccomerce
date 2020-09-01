import Shop from "./Pages/Shop/Shop";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Navbar from "./Components/Navbar";
import Blog from "./Pages/Blog/Page";
import Product from "./Pages/Products/Product";
import Cart from "./Pages/Cart/Cart";
import NotFound from "./Components/NotFound";
import Checkout from "./Pages/Checkout/Checkout";
import Logout from "./Pages/Logout/Logout";
import Success from "./Pages/Success/Success";
import Footer from "./Components/Footer";
import CartIcon from "./Components/cartIcon";
import Orders from "./Pages/Orders/Orders";
import myOrders from "./Pages/myOrders/myOrders";
import changeDetails from "./Pages/changeDetails/changeDetails";
import Announcement from "./Components/Announcement";
import Counter from "./Components/Counter";
import Reset from "./Pages/Reset/Reset";

import store from "./store.js";
import { storeState } from "./localStorage.js";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";

import { Provider } from "react-redux";

store.subscribe(() => {
  storeState(store.getState());
});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <img src="/logo.png" alt="logo" id="company-logo"></img>
        <div className="pt-3">
          <CartIcon />
          <hr></hr>
          <Navbar />
          <Announcement />
          <div className="container">
            <Router>
              <Switch>
                <Route exact path="/" component={Shop} />
                <Route exact path="/counter" component={Counter} />
                <Route exact path="/shop" component={Shop} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/page/:id" component={Blog} />
                <Route path="/shop/:id" component={Shop} />
                <Route path="/product/:id" component={Product} />
                <Route path="/cart" component={Cart} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/logout" component={Logout} />
                <Route path="/success" component={Success} />
                <Route path="/orders/:id" component={Orders} />
                <Route path="/user/edit" component={changeDetails} />
                <Route path="/user/orders" component={myOrders} />
                <Route path="/reset" component={Reset} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Router>
          </div>
        </div>
        <Footer />
      </Provider>
    );
  }
}

export default App;
