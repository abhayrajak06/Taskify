import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [auth, setAuth] = useAuth();

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    setIsNavOpen(false);
  };
  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div style={{ position: "sticky", top: "0", zIndex: "23", opacity: "0.9" }}>
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
            onClick={handleNavToggle}
            aria-expanded={isNavOpen ? "true" : "false"}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {auth ? (
                <>
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link  nav-btn"
                      aria-current="page"
                      to={"/all-tasks"}
                      onClick={closeNav}
                    >
                      Your tasks
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link nav-btn"
                      to={"/all-categories"}
                      onClick={closeNav}
                    >
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
                        <NavLink
                          className="dropdown-item"
                          to={"/my-profile"}
                          onClick={closeNav}
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={"/login"}
                          onClick={handleLogout}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <ul className="d-flex navbar-nav flex-row">
                    <li className="nav-item">
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
                        onClick={closeNav}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
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
                        onClick={closeNav}
                      >
                        Register
                      </NavLink>
                    </li>
                  </ul>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
