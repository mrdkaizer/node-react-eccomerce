import React, { useState } from "react";

function Counter(props) {
  const [value, setValue] = useState(props.initValue);

  const add = () => {
    setValue(value + 1);
  };

  const sub = () => {
    console.log(props);
    if (value > 1) {
      setValue(value - 1);
    }
    props.onChange(value);
  };

  return (
    <div className="cable-choose">
      <div className="def-number-input number-input safari_only">
        <center>
          <button className="minus" onClick={sub}></button>
        </center>
        <input
          className="quantity"
          name="quantity"
          type="number"
          value={value}
          readOnly
        />
        <center>
          <button className="plus" onClick={add}></button>
        </center>
      </div>
    </div>
  );
}

export default Counter;
