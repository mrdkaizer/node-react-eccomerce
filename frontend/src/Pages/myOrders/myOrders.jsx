import { getFetch } from "../../Utils/communication";
import { Error } from "../../Components/Message";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BoxLoading } from "react-loadingg";

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (props.tokenProps.token) {
          const myOrders = await getFetch("/order", props.tokenProps.token);
          setOrders(myOrders);
          setLoading(false);
        } else {
          window.location.href = "/login";
        }
      } catch (e) {
        window.location.href = "/logout";
      }
    }
    fetchData();
  }, [props.tokenProps.token]);

  return loading ? (
    <div>
      <BoxLoading />
      <div className="p-5"></div>
      <div className="p-5"></div>
    </div>
  ) : orders.length === 0 ? (
    <Error error="You have no orders associated with your account yet." />
  ) : (
    <div className="table-responsive">
      <h2>Orders:</h2>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Shipping ({props.info.currencySymbol}) </th>
            <th scope="col">Total ({props.info.currencySymbol}) </th>
            <th scope="col">Track Orders</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(orders).map((order) => {
            return (
              <tr>
                <td>{order.date.substring(0, order.date.indexOf("T"))}</td>
                <td> {order.shipping}</td>
                <td>{order.total}</td>
                <td>
                  <button
                    onClick={() => {
                      window.location.href = `/orders/${order.id}`;
                    }}
                    className="btn btn-primary"
                  >
                    TRACK
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
const mapStateToProps = (state) => ({
  tokenProps: state.tokenReducer,
  info: state.infoReducer,
});
export default connect(mapStateToProps, {})(Orders);
