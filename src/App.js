import React from "react";
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import MoviesForm from "./components/moviesForm";
import LoginForm from "./components/loginForm";

function App() {
  return (
    <React-Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/loginForm" component={LoginForm} />
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

export default App;
