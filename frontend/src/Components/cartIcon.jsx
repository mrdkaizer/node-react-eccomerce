import React from "react";
import { connect } from "react-redux";

function CartIcon(props) {
  return (
    <form className="clearfix">
      <i
        key={props.cartProps}
        id="cart-from"
        style={{ cursor: "pointer" }}
        className="pr-4 float-right fas fa-shopping-cart"
        onClick={() => {
          window.location.replace("/cart");
        }}
      >
        {" "}
        {props.cartProps}
      </i>
    </form>
  );
}
const mapStateToProps = (state) => ({
  cartProps: Object.keys(state.cartReducer).length,
});

export default connect(mapStateToProps, {})(CartIcon);
