import http from "./httpService";
//import config from "../config.json";
// or you can directly take apiURL using object destructuring and avoid using cofig. everywhere
// import {apiURL} from "../config.json";

export function getGenres() {
  return http.get("/genres"); //returns Promise object
}

//export all functions that were exported by fakeGenreService
