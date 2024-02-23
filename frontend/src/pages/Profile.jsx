import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../utils/url";
import toast from "react-hot-toast";
import { useAuth } from "../context/Auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const user = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const getUserInfo = async () => {
    try {
      setLoader(true);
      if (user?._id && user?.token) {
        const res = await axios.get(
          `${url}/api/v1/user/my-details/${user?._id}`,
          {
            headers: {
              Authorization: user?.token,
            },
          }
        );
        setName(res?.data?.name);
        setEmail(res?.data?.email);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [user?._id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await axios.put(
        `${url}/api/v1/user/update-details/${user?._id}`,
        {
          name: name,
          password: password,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        },
        { withCredentials: true }
      );
      if (res?.data) {
        const updatedUser = { ...user, name: name };
        localStorage.setItem("auth", JSON.stringify(updatedUser));
        setAuth(updatedUser);
        toast.success("Profile updated successfully");
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
              Profile
            </h2>
            <form className="" onSubmit={handleUpdate}>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter your name"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                  required
                  disabled
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
