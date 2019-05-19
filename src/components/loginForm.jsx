import React, { Component } from "react";
import Input from "./common/input";

import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  //creating ref object
  // username = React.createRef();

  state = {
    data: { username: "", password: "" },
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

  doSubmit = () => {
    //call to server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h1 className="text-center">Login Form</h1>
          <form id="loginForm" onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username", true)}
            {this.renderInput("password", "Password", false, "password")}
            {this.renderLabel("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
