import React from "react";

const Input = props => {
  const { id, label, value, error, autoFocus, type, onChange } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        // ref={this.username}
        value={value}
        onChange={onChange}
        id={id}
        type={type}
        className="form-control"
        autoComplete="off"
        autoFocus={autoFocus}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
