import "./Cart.css";
import { deleteProduct } from "../../actions/deleteAction";
import { updateCart } from "../../actions/updateAction";
import { Error } from "../../Components/Message";
import { useCart } from "../../hooks/cart-hook";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CommonLoading } from "react-loadingg";

function Cart() {
  const [stateCart] = useCart(0);
  const {
    total,
    setTotal,
    shipping,
    setShipping,
    shippingCharge,
    threshold,
    canOrder,
    load,
  } = stateCart;
  const [error, setError] = useState("");

  const { cartProps, infoProps } = useSelector((state) => ({
    cartProps: state.cartReducer,
    infoProps: state.infoReducer,
  }));
  const dispatch = useDispatch();

  const add = (link) => {
    const cart = cartProps;
    cart[link].quantity += 1;
    setTotal(total + cart[link].price);
    dispatch(updateCart(cart));
    setShipping(threshold > total + cart[link].price ? shippingCharge : 0);
  };

  const sub = (link) => {
    const cart = cartProps;
    if (cart[link].quantity > 1) {
      cart[link].quantity -= 1;
      setTotal(total - cart[link].price);
      dispatch(updateCart(cart));
      setShipping(threshold > total - cart[link].price ? shippingCharge : 0);
    }
  };

  const deleteItem = (item) => {
    dispatch(deleteProduct(item.link));
    setTotal(total - item.price * item.quantity);
    setShipping(threshold > total ? shippingCharge : 0);
  };

  return (
    <section className="">
      <div className="container">
        <Error error={error} />
        <div className="row">
          <div className="col-lg-12">
            {load === false ? (
              <CommonLoading />
            ) : (
              Object.values(cartProps).map((item) => {
                return (
                  <center key={item._id}>
                    <div className="row pb-5">
                      <div className="col-md-3">
                        <a href={`/product/${item.link}`}>
                          <img src={item.images[0].image} height="120" alt="" />
                        </a>

                        <h6>{item.name}</h6>
                      </div>
                      <div className="col-md-2">
                        <h5 style={{ textDecoration: "line-through" }}>
                          {item.pricePreDiscount
                            ? infoProps.currencySymbol +
                              " " +
                              item.pricePreDiscount +
                              " "
                            : ""}
                        </h5>
                        {infoProps.currencySymbol} {item.price}
                      </div>
                      <div className="col-md-3">
                        {item.available >= 1 ? (
                          <div className="cable-choose">
                            <div className="def-number-input number-input safari_only">
                              <center>
                                <button
                                  className="minus"
                                  onClick={() => {
                                    sub(item.link);
                                  }}
                                ></button>
                              </center>
                              <input
                                className="quantity"
                                name="quantity"
                                type="number"
                                value={cartProps[item.link].quantity}
                                readOnly
                              />
                              <center>
                                <button
                                  className="plus"
                                  onClick={() => {
                                    add(item.link);
                                  }}
                                ></button>
                              </center>
                            </div>
                          </div>
                        ) : (
                          <b>
                            {" "}
                            <p className="text-danger">SOLD OUT</p>
                          </b>
                        )}
                      </div>

                      <div className="col-md-2">
                        <span className="icon_close">
                          {infoProps.currencySymbol}{" "}
                          {(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                      <div className="col-md-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteItem(item);
                          }}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </center>
                );
              })
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="shoping__continue">
              <div className="shoping__discount">
                <h5>Discount Codes</h5>
                <form action="#">
                  <input type="text" placeholder="Enter your coupon code" />
                  <button type="button" className="site-btn">
                    APPLY COUPON
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="shoping__checkout">
              <h5>Cart Total</h5>
              <ul>
                <li>
                  Subtotal{" "}
                  <span>
                    {infoProps.currencySymbol} {total.toFixed(2)}
                  </span>
                </li>
                <li>
                  Shipping{" "}
                  <span>
                    {infoProps.currencySymbol} {shipping.toFixed(2)}
                  </span>
                </li>
                <li>
                  Total{" "}
                  <span>
                    {infoProps.currencySymbol} {(total + shipping).toFixed(2)}
                  </span>
                </li>
              </ul>
              <button
                onClick={() => {
                  if (Object.keys(cartProps).length === 0) {
                    setError("Your shopping cart is empty");
                    return;
                  }
                  if (!canOrder) {
                    setError(
                      "Sorry one or more products in your shopping cart are not available."
                    );
                    return;
                  }

                  window.location.href = "/checkout";
                }}
                className="primary-btn"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
