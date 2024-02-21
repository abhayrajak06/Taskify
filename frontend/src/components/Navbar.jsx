import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  const token = true;
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            style={{ fontWeight: "bold" }}
            to={"/"}
          >
            Taskify
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {token ? (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link  nav-btn"
                    aria-current="page"
                    to={"/all-todos"}
                  >
                    Your tasks
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link nav-btn" to={"/all-categories"}>
                    All Categories
                  </NavLink>
                </li>
                <li className="nav-item dropdown nav-btn">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    username
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to={"/my-profile"}>
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to={"/logout"}>
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex flex-row ">
                  <li className="nav-item ">
                    <NavLink
                      className={"nav-link"}
                      style={{
                        textDecoration: "none",
                        backgroundColor: "#070F2B",
                        fontWeight: "bold",
                        padding: "0.6rem",
                        margin: "0.6rem",
                        borderRadius: "0.4rem",
                        color: "whitesmoke",
                        width: "5rem",
                        textAlign: "center",
                      }}
                      to={"/login"}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <NavLink
                      className={"nav-link"}
                      style={{
                        textDecoration: "none",
                        backgroundColor: "#070F2B",
                        fontWeight: "bold",
                        padding: "0.6rem",
                        margin: "0.6rem",
                        borderRadius: "0.4rem",
                        color: "whitesmoke",
                        width: "5rem",
                        textAlign: "center",
                      }}
                      to={"/register"}
                    >
                      Register
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
