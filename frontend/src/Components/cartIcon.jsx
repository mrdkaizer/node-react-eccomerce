import React from "react";
import { connect } from "react-redux";

function CartIcon(props) {
  return (
    <form className="clearfix">
      <a href="/cart">
        <span
          key={props.cartProps}
          id="cart-from"
          className="pr-4 float-right fas fa-shopping-cart"
        >
          {" "}
          {props.cartProps}
        </span>
      </a>
    </form>
  );
}
const mapStateToProps = (state) => ({
  cartProps: Object.keys(state.cartReducer).length,
});

export default connect(mapStateToProps, {})(CartIcon);
