import http from "./httpService";
import { apiURL } from "../config.json";

export function loginUser(email, password) {
  return http.post(apiURL + "/auth", { email, password }); // returns Promise object with JWT in data
}
