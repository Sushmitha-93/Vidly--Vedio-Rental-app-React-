import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Vidly
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/movies">
              Movies
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/customers">
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/rentals">
              Rentals
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/loginForm">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/registerForm">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
