import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class MoviesForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", rate: "" },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    rate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  doSubmit = () => {
    //call to server
    console.log("Movie form Submitted");
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h1 className="text-center">Movies Form</h1>
          <form id="registerForm" onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title", true)}
            <div class="form-group">
              <label for="genre">Genre</label>
              <select class="form-control" id="genre">
                <option />
                <option>Action</option>
                <option>Comedy</option>
                <option>Thriller</option>
              </select>
            </div>
            {this.renderInput("numberInStock", "Number in Stock")}
            {this.renderInput("rate", "Rate")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default MoviesForm;
