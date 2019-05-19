import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    //console.log(result);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;

    // const errors = {};
    // const { data } = this.state;

    // if (data.username.trim() === "")
    //   errors.username = "Username is required";
    // if (data.password.trim() === "")
    //   errors.password = "Password is required";

    // return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = currentTarget => {
    const obj = { [currentTarget.id]: currentTarget.value };
    const schema = { [currentTarget.id]: this.schema[currentTarget.id] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;

    // if (currentTarget.id === "username")
    //   if (currentTarget.value.trim() === "") return "Username is required";
    // if (currentTarget.id === "password")
    //   if (currentTarget.value.trim() === "") return "Password is required";
  };

  handleChange = e => {
    // to clean up the code, you can use object destucturing for e -{currentTarget:input} and then use input in place of e.currentTarget
    const { errors } = this.state;
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.id] = errorMessage;
    else delete errors[e.currentTarget.id];

    const data = { ...this.state.data };
    data[e.currentTarget.id] = e.currentTarget.value; //to handle multiple inputs use []
    this.setState({ data });
  };

  handleSubmit = e => {
    e.preventDefault();
    // const username = this.username.current.value;
    // console.log(username);

    const errors = this.validate();
    this.setState({ errors: errors || {} }); // errors object should never be null. If errors is truthy, errors is used to setState otherwise its {} an empty object
    if (errors) return;

    this.doSubmit();
  };

  renderLabel = label => {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {/* For disabling button on errors */}
        {label}
      </button>
    );
  };

  renderInput = (id, label, autoFocus, type) => {
    return (
      <Input
        id={id}
        label={label}
        value={this.state.data[id]}
        onChange={this.handleChange}
        error={this.state.errors[id]}
        autoFocus={autoFocus}
        type={type}
      />
    );
  };
}

export default Form;
