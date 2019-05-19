import React, { Component } from "react";
import Input from "./common/input";

import Joi from "joi-browser";

class LoginForm extends Component {
  //creating ref object
  // username = React.createRef();

  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, options);
    console.log(result);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;

    // const errors = {};
    // const { account } = this.state;

    // if (account.username.trim() === "")
    //   errors.username = "Username is required";
    // if (account.password.trim() === "")
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

    const account = { ...this.state.account };
    account[e.currentTarget.id] = e.currentTarget.value; //to handle multiple inputs use []
    this.setState({ account });
  };

  handleSubmit = e => {
    e.preventDefault();
    // const username = this.username.current.value;
    // console.log(username);

    const errors = this.validate();
    this.setState({ errors: errors || {} }); // errors object should never be null. If errors is truthy, errors is used to setState otherwise its {} an empty object
    if (errors) return;

    //call to server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h1 className="text-center">Login Form</h1>
          <form id="loginForm" onSubmit={this.handleSubmit}>
            <Input
              id="username"
              label="Username"
              value={this.state.account.username}
              onChange={this.handleChange}
              error={this.state.errors.username}
              autoFocus={true}
            />
            <Input
              id="password"
              label="Password"
              value={this.state.account.password}
              onChange={this.handleChange}
              error={this.state.errors.password}
              type="password"
            />
            <button className="btn btn-primary" disabled={this.validate()}>
              {/* For disabling button on errors */}
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
