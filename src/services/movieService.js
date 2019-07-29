import http from "./httpService";
import { apiURL } from "../config.json";

export function getMovies() {
  return http.get(apiURL + "/movies"); //returns Promise object
}

export function deleteMovie(movieId) {
  return http.delete(apiURL + "/movies/" + movieId); //returns Promise object
}

export function getMovie(movieId) {
  return http.get(apiURL + "/movies/" + movieId); //returns Promise object
}

export function saveMovie(movie) {
  console.log(movie);
  if (movie._id) {
    return http.put(apiURL + "/movies/" + movie._id, {
      title: movie.title,
      genreId: movie.genreId,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    });
  } else {
    console.log("doing post");
    return http.post(apiURL + "/movies", movie); //returns Promise object
  }
}
