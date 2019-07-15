import React, { Component } from "react";
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
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user }); //creates a new state & then set it, to pass this as PROP to any component you want, so that that component has access to basic user information
  }

  render() {
    const { user } = this.state;
    return (
      <React-Fragment>
        <ToastContainer />
        <NavBar user={user} /> {/* Passing user info to Navbar component */}
        <main className="container">
          <Switch>
            <Route path="/registerForm" component={RegisterForm} />
            <Route path="/loginForm" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component="MoviesForm" />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route
              path="/movies"
              render={props => (
                <Movies {...props} user={this.state.user} />
              )} /* to pass props to Movie component in Route- must make sure you pass default react props(History...) along with required props*/
            />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React-Fragment>
    );
  }
}

export default App;
