import React from "react";

const Input = props => {
  //const { id, label, value, error, autoFocus, type, onChange } = props;
  const { id, label, error, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        /* Since we have same assighments as attributes, we can use "...rest" with spread operator 
            and then remove other parameters. This is equivalent to code that was there earlier.
            With this change, input component is simpler.. */
        // value={value}
        // onChange={onChange}
        // id={id}
        // type={type}
        // autoFocus={autoFocus}
        {...rest}
        className="form-control"
        autoComplete="off"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
