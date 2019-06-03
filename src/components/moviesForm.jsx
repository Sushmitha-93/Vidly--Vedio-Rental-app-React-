import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MoviesForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id; //gets the movieId of the id in URL
    if (movieId === "new") return;

    const movie = getMovie(movieId); //gets the movie object from the movieId retrived from URL
    if (!movie) return this.props.history.replace("/not-found");
    //console.log(movie);

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    //call to server
    saveMovie(this.state.data);
    this.props.history.push("/movies");
    console.log("Movie form Submitted");
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h1 className="text-center">Movies Form</h1>
          <form id="registerForm" onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title", true)}
            {this.renderSelect("genreId", "Genre", this.state.genres)}
            {this.renderInput("numberInStock", "Number in Stock")}
            {this.renderInput("dailyRentalRate", "Rate")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default MoviesForm;
