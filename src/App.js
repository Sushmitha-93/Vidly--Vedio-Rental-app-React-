import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import MoviesForm from "./components/moviesForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import { ToastContainer } from "react-toastify"; //React-Toastify
import "react-toastify/dist/ReactToastify.css"; //React-Toastify

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("JWT token"); // 1) Get JWT from local storage of Browser
      const user = jwtDecode(jwt); //2) Decode JWT using decode function of jwt-decode library
      console.log(user);
      this.setState({ user }); //creates a new state, to pass this as PROP to any component you want, so that that component has access to basic user information
    } catch (ex) {} // JWT token will be null in the start, because it will be set only on login/sign up
  }

  render() {
    return (
      <React-Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />{" "}
        {/* Passing user info to Navbar component */}
        <main className="container">
          <Switch>
            <Route path="/registerForm" component={RegisterForm} />
            <Route path="/loginForm" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/movies/:id" component={MoviesForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/movies" component={Movies} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React-Fragment>
    );
  }
}

export default App;
