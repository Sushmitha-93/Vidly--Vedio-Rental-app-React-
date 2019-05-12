import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
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
      </ul>
    </nav>
  );
};

export default NavBar;
