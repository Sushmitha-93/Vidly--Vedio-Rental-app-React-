import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [], //getMovies() - do this in componentDidMount life-cycle hook
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sort: { column: "title", order: "asc" }
  };

  //Good practice to initailize arrays in componentDidMount
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    console.log(movie);
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    console.log("Handle Like");
    console.log(movie);
    const movies = [...this.state.movies];
    const index = movies.findIndex(m => m._id === movie._id);
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sort => {
    this.setState({ sort });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sort
    } = this.state;

    // FILTER
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    //SORT
    const sortedMovies = _.orderBy(filtered, [sort.column], [sort.order]);
    //console.log(sort.column + " " + sort.order);

    //PAGINATE
    const movies = paginate(sortedMovies, pageSize, currentPage);

    return { totalCount: filtered.length, movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      movies: allMovies,
      genres,
      pageSize,
      currentPage,
      selectedGenre,
      sort
    } = this.state;

    const { totalCount, movies } = this.getPagedData();

    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            itemList={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>

        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>

          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            sort={this.state.sort}
            onSort={this.handleSort}
          />

          <Pagination
            pageSize={pageSize} //try giving a string for pageSize, you wont get errors, but only 1 page shows up. In future, if this component is reused in any other part and a wrong type is given, it will be hard to find where is the bug. So we need to implement type check using propTypes library in React. Its a good practice to define it in every component.
            totalMoviesCount={totalCount}
            currentPage={currentPage}
            onClick={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
