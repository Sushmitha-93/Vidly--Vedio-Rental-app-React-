import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiURL } from "../config.json";

const tokenKey = "JWT token";

http.setJwt(getJwt()); // Calling set method of httpService to avoid Bi-Directional dependency

export async function login(email, password) {
  const { data: jwt } = await http.post(apiURL + "/auth", { email, password }); // returns Promise object with JWT in data
  console.log(jwt);

  localStorage.setItem(tokenKey, jwt); //storing JWT returned in localStorage of Browser

  //this.props.history.push("/");
  window.location = "/"; // because we want the page to refresh again for JWT token to get picked up in nav bar
}

export function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt); //Storing JWM token in local storage of browser
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey); // 1) Get JWT from local storage of Browser
    const user = jwtDecode(jwt); //2) Decode JWT using decode function of jwt-decode library
    console.log(user);
    return user;
  } catch (ex) {
    return null;
  } // if jwtDecode() fails - JWT token will be null in the start, because it will be set only on login/sign up
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

//Exporting default object - having login(),logout(),....
// so in other files, we need to import this object and then call these functions like auth.login(), auth.logout()
export default {
  login,
  loginWithJWT,
  logout,
  getCurrentUser,
  getJwt
};
