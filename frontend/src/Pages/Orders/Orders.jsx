import "./Orders.css";
import { getFetch } from "../../Utils/communication";
import NotFound from "../../Components/NotFound";

import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

function Orders(props) {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [notFound, setNotFound] = useState(true);
  const mountTimes = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      const {
        match: { params },
      } = props;

      const loadOrder = await getFetch(`/order/${params.id}`);

      if (!loadOrder) {
        return;
      }

      const createProducts = [];
      for (let i = 0; i < loadOrder.cart.length; i++) {
        createProducts[loadOrder.cart[i].product] = await getFetch(
          `/product/${loadOrder.cart[i].product}`
        );
      }
      setOrder(loadOrder);
      setProducts(createProducts);
      setNotFound(false);
    };

    // just load the first time of mounting
    if (mountTimes.current === 0) {
      mountTimes.current++;
      fetchData();
    }
  }, [props]);

  return notFound ? (
    <NotFound />
  ) : (
    <div className="">
      <article className="card">
        <header className="card-header"> Order Tracking </header>
        <div className="card-body">
          <h6>Order ID: {props.match.params.id}</h6>
          <article className="card">
            <div className="card-body row">
              <div className="col-md-3">
                {" "}
                <strong>Status:</strong> <br />
                {order.status === 0 ? "Order Confirmed" : ""}
                {order.status === 1 ? "Picked by the courier" : ""}
                {order.status === 2 ? "On the way" : ""}
                {order.status === 3 ? "Received" : ""}
              </div>
            </div>
          </article>
          <div className="track">
            <div className={order.status >= 0 ? "step active" : "step"}>
              <span className="icon">
                <i className="fa fa-check"></i>
              </span>
            </div>
            <div className={order.status >= 1 ? "step active" : "step"}>
              <span className="icon">
                <i className="fa fa-user"></i>
              </span>
            </div>
            <div className={order.status >= 2 ? "step active" : "step"}>
              <span className="icon">
                <i className="fa fa-truck"></i>
              </span>
            </div>
            <div className={order.status >= 3 ? "step active" : "step"}>
              <span className="icon">
                <i className="fa fa-box"></i>
              </span>
            </div>
          </div>
          <hr />
          <ul className="row">
            {Object.values(order.cart).map((answer) => {
              return (
                <li key={products[answer.product].link} className="col-md-4">
                  <figure className="itemside mb-3">
                    <div className="aside">
                      <img
                        src={
                          products[answer.product].images[0].image
                            ? products[answer.product].images[0].image
                            : ""
                        }
                        alt={products[answer.product].link}
                        className="img-sm border"
                      />
                    </div>
                    <figcaption className="info align-self-center">
                      <p className="title">
                        {products[answer.product].name
                          ? products[answer.product].name
                          : ""}
                      </p>
                      <span className="text-muted">
                        {props.info.currencySymbol} {answer.price} x{" "}
                        {answer.quantity}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
          <hr />
          Shipping: {props.info.currencySymbol} {order.shipping}
          <br />
          Total: {props.info.currencySymbol} {order.total}
        </div>
      </article>
    </div>
  );
}
const mapStateToProps = (state) => ({
  tokenProps: state.tokenReducer,
  info: state.infoReducer,
});
export default connect(mapStateToProps, {})(Orders);
