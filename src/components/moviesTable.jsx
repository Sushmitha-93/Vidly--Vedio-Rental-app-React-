import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  //no need to intialize as part of state b/c it doesnt change throughout the lifecyle of this component
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like like={movie.like} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, sort, onSort } = this.props;

    return (
      <Table columns={this.columns} data={movies} sort={sort} onSort={onSort} />
    );
  }
}

export default MoviesTable;
