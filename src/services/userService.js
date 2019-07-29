// For Register form - Signing up new user
import http from "./httpService";
import { apiURL } from "../config.json";

export function register(user) {
  // returns a Promise object
  return http.post(apiURL + "/users", {
    email: user.email,
    password: user.password,
    name: user.name
  });
}
export default {
  register
};
