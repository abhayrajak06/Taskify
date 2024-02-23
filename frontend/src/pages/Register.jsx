import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../utils/url";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const changeHandler = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const name = userDetails.name;
      const email = userDetails.email;
      const password = userDetails.password;
      const res = await axios.post(`${url}/api/v1/auth/register`, {
        name,
        email,
        password,
      });
      if (res?.data) {
        toast.success("Register Successfully");
        navigate("/login");
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
              padding: "2.2rem",
              borderRadius: "1rem",
            }}
          >
            <h2 className="text-center mb-2" style={{ color: "whitesmoke" }}>
              Register
            </h2>
            <form className="" onSubmit={handleRegister}>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputName"
                  className="form-label"
                  style={{ color: "whitesmoke" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={changeHandler}
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter your name"
                  required
                />
              </div>
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
                  onChange={changeHandler}
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
                  onChange={changeHandler}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
              <h6 className="mt-2" style={{ color: "whitesmoke" }}>
                Already have an accout ? <Link to={"/login"}>Login</Link>
              </h6>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Register;
