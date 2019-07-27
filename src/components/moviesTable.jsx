import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
  //no need to intialize as part of state b/c it doesnt change throughout the lifecyle of this component
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like like={movie.like} onClick={() => this.props.onLike(movie)} />
      )
    }
  ];

  deleteCol = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-sm btn-danger"
      >
        Delete
      </button>
    )
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user) this.columns.push(this.deleteCol);
  }

  render() {
    const { movies, sort, onSort } = this.props;

    return (
      <Table columns={this.columns} data={movies} sort={sort} onSort={onSort} />
    );
  }
}

export default MoviesTable;
