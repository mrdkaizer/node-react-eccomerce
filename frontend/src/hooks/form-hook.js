import { useState, useCallback } from "react";

export const useForm = (initialValue) => {
  const [values, setValues] = useState(initialValue);
  return [
    values,
    (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
    useCallback((input) => {
      setValues(input);
    }, []),
  ];
};
