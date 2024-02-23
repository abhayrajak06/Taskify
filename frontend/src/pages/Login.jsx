import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../utils/url";
import toast from "react-hot-toast";
import { useAuth } from "../context/Auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const email = userDetails.email;
      const password = userDetails.password;
      const res = await axios.post(`${url}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res?.data) {
        localStorage.setItem("auth", JSON.stringify(res?.data));
        setAuth(res?.data);
        toast.success("Login Successfully");
        navigate("/all-tasks");
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <div className="">
      <Navbar />
      {loader ? (
        <Loader />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "70vh" }}
        >
          <div
            className=""
            style={{
              backgroundColor: "#1F2544",
              padding: "1.6rem",
              borderRadius: "1rem",
            }}
          >
            <h2 className="text-center mb-2" style={{ color: "whitesmoke" }}>
              Login
            </h2>
            <form onSubmit={handleLogin} className="">
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label"
                  style={{ color: "whitesmoke" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label"
                  style={{ color: "whitesmoke" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
              <h6 className="mt-2" style={{ color: "whitesmoke" }}>
                Don't have any account yet?{" "}
                <Link to={"/register"}>Register</Link>
              </h6>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Login;
