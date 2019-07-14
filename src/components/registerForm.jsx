import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import userService from "../services/userService";
import auth from "../services/authService";

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

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data); //  Register api sends a new JWT in its header as "x-auth-token"
      console.log("API Response promise object: ", response);

      auth.loginWithJWT(response.headers["x-auth-token"]);
      //this.props.history.push("/");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        //Client error
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;
        this.setState({ errors });
      }
    }
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
