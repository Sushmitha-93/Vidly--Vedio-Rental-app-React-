import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {}
  };

  //Schema for joi validation
  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .email({ minDomainAtoms: 2 })
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    //call to server
    console.log("Register form Submitted");
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h1 className="text-center">Register Form</h1>
          <form id="registerForm" onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name", true)}
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", false, "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
