import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { getMovies } from "../services/fakeMovieService";
import { getMovies, deleteMovie } from "../services/movieService";
// import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import Search from "./search";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [], //getMovies() - do this in componentDidMount life-cycle hook
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sort: { column: "title", order: "asc" },
    search: ""
  };

  //Good practice to initailize arrays in componentDidMount
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    console.log(movie);
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === "404")
        toast.error("This movie is already deleted");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    console.log("Handle Like");
    console.log(movie);
    const movies = [...this.state.movies];
    const index = movies.findIndex(m => m._id === movie._id);
    movies[index].like = !movies[index].like; //it will add like property if not there
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    // console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1, search: "" });
  };

  handleSort = sort => {
    this.setState({ sort });
  };

  handleSearch = search => {
    //let search = e.currentTarget.value;  //put this in search component only to make code cleaner
    this.setState({ search, selectedGenre: null, currentPage: 1 });
    //console.log("Handle search ", e.currentTarget.value);
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sort,
      search
    } = this.state;

    // FILTER
    let filtered;
    if (search !== "")
      filtered = allMovies.filter(
        m => m.title.toLowerCase().search(search.toLowerCase()) >= 0
      );
    else
      filtered =
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
      // movies: allMovies,
      genres,
      pageSize,
      currentPage
      // selectedGenre,
      // sort
    } = this.state;

    const { totalCount, movies } = this.getPagedData();
    const { user } = this.props;

    //if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <div className="row justify-content-center">
        <div className="col-md-2">
          <ListGroup
            itemList={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>

        <div className="col-md-8">
          {user && (
            <React.Fragment>
              <Link to="/movies/new">
                <button className="btn btn-primary">New Movie</button>
              </Link>
              <br />
              <br />
            </React.Fragment>
          )}
          <p>Showing {totalCount} movies in the database.</p>

          <Search value={this.state.search} onChange={this.handleSearch} />

          <br />
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
