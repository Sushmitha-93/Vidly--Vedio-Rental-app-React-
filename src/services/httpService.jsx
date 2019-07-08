import Axios from "axios";
import { toast } from "react-toastify";
import logService from "./logService";

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

export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete
};
