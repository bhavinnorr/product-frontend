import React from "react";
import { NavLink } from "react-router-dom";
import winLogo from "../../assets/win-logo.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        {" "}
        <span className="img">
          <img
            src={winLogo}
            alt=""
            width="35px"
            height="100%"
            className="img-fluid"
          />
        </span>{" "}
        Windows
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
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/app/products">
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/app/products">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/app/product-edit">
              ProductEdit
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/app/users">
              Invite
            </NavLink>
          </li>
          {/* <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <NavLink className="dropdown-item" href="#">Action</NavLink>
          <NavLink className="dropdown-item" href="#">Another action</NavLink>
          {/* <NavLink className="dropdown-divider"></NavLink> */}
          {/* <a className="dropdown-item" href="#">Something else here</a> */}
          {/* </div> */}
          {/* </li> */}
          <li className="nav-item">
            <a className="nav-link disabled" href="#">
              Disabled
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
