import Axios from "axios";
import { toast } from "react-toastify";
import logService from "./logService";
//import auth from "./authService";

//1) To set headers in all kind of requests - like get,posts,put... because we have used "common". It can be specified as get,post too
//2)  Axios.defaults.headers.common["x-auth-token"] = auth.getJwt();
/* 3) Above code line causes us to import authService, and authService has already imported httpService,
causing Bi-Directional dependency between them (that's bad). So, using setJwt() instead to avoid importing 
authService (Line 29) */

Axios.defaults.baseURL = process.env.REACT_APP_API_URL; // This will change according to the environment build

Axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    console.log("Logging the error: ", error);
    //Calling sentry log function defined in logService
    logService.log(error);
    //Displays a tost noitification
    toast.error("Unexpected error occured!");
  }

  return Promise.reject(error);
});

//Set method to avoid bi-directional dependency with the authService
function setJwt(jwt) {
  Axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete,
  setJwt
};
