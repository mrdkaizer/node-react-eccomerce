import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFetch } from "../Utils/communication";
import { updateCart } from "../actions/updateAction";

export const useCart = (initialValue) => {
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [canOrder, setCanOrder] = useState(0);
  const [load, setLoad] = useState(true);

  const mountTimes = useRef(0);

  const { cartProps, infoProps } = useSelector((state) => ({
    cartProps: state.cartReducer,
    infoProps: state.infoReducer,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const keys = Object.keys(cartProps);
      let total = 0;
      let canOrder = true;
      for (let i = 0; i < keys.length; i++) {
        const link = cartProps[keys[i]].link;
        const product = await getFetch(`/product/${link}`);

        // this product must have been delete... remove it from state.
        if (!product) {
          delete cartProps[keys[i]];
          continue;
        }

        //update product information keep the quantity
        product.quantity = cartProps[keys[i]].quantity;
        if (product.available < 1) {
          canOrder = false;
        }

        //update total
        total += product.quantity * product.price;
        cartProps[link] = product;
      }

      //update shipping cost
      const { shippingCharge, shippingThreshold } = infoProps;
      const shipping = shippingThreshold > total ? shippingCharge : 0;

      dispatch(updateCart(cartProps));

      setTotal(total);
      setShipping(shipping);
      setThreshold(shippingThreshold);
      setShippingCharge(shippingCharge);
      setCanOrder(canOrder);
      setLoad((load) => true);
    };
    // just load the first time of mounting
    if (mountTimes.current === 0) {
      mountTimes.current++;
      fetchData();
    }
  }, [dispatch, infoProps, cartProps]);

  return [
    {
      total,
      setTotal,
      shipping,
      setShipping,
      threshold,
      canOrder,
      load,
      shippingCharge,
      cart: cartProps,
    },
  ];
};
