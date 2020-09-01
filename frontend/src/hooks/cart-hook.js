import { useState } from "react";

export const useCart = (initialValue) => {
  const [cart, setCart] = useState(initialValue);

  return [
    cart,
    (e) => {
      setCart({ ...values, [e.target.name]: e.target.value });
    },
  ];
};
