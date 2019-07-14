import React from "react";
import Form from "./common/form";

import Joi from "joi-browser";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  //Schema for joi validation
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      await auth.login(this.state.data.username, this.state.data.password);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        //400 is for client error
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h1 className="text-center">Login Form</h1>
          <form id="loginForm" onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username", true)}
            {this.renderInput("password", "Password", false, "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
