import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { url } from "../utils/url";
import { useAuth } from "../context/Auth";
import { MdDeleteForever } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { FaBucket } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const CategoryTask = () => {
  const { cName } = useParams();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const user = localStorage.getItem("auth");
  const [tasks, setTasks] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getAllTasks();
    }
  }, []);

  const getAllTasks = async () => {
    try {
      setLoader(true);
      const res = await axios.get(`${url}/api/v1/todo/all-todos/${auth?._id}`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      if (res?.data) {
        setTasks(res.data);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const handleDeleteTask = async (tId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (confirmDelete) {
        const res = await axios.delete(`${url}/api/v1/todo/delete/${tId}`, {
          headers: {
            Authorization: auth?.token,
          },
        });
        if (res?.data) {
          toast.success("Task deleted");
          getAllTasks();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const catTask = tasks.filter((task) => task.category === cName);

  return (
    <div className="">
      <Navbar />
      {loader ? (
        <Loader />
      ) : (
        <div className="container mt-2" style={{ minHeight: "68vh" }}>
          <div className="row justify-content-center">
            <div className="col-md-10 d-flex flex-wrap gap-3 justify-content-center">
              {catTask.length > 0 ? (
                catTask.map((t) => (
                  <div className="card-container" key={t?._id}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/update-task/${t._id}`}
                    >
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{t.title}</h5>
                          <p className="card-text">
                            {t.description.substring(0, 50)}...
                          </p>
                        </div>
                        <div className="">
                          <button
                            className="w-50 custom-button"
                            style={{ float: "right", borderRadius: "0.6rem" }}
                          >
                            {t.category}
                          </button>
                        </div>
                      </div>
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteTask(t._id)}
                    >
                      <MdDeleteForever size={25} />
                    </button>
                  </div>
                ))
              ) : (
                <div
                  className="empty-state d-flex flex-column align-items-center justify-content-center"
                  style={{ minHeight: "65vh", color: "GrayText" }}
                >
                  <FaBucket size={100} />
                  <p>You have an empty bucket! Time to fill it up.</p>
                </div>
              )}
            </div>
          </div>
          <div
            className="b"
            style={{
              position: "fixed",
              right: "3rem",
              bottom: "10rem",
              backgroundColor: "#7FC7D9",
              borderRadius: "0.6rem",
            }}
          >
            <Link
              to={"/create-task"}
              style={{ fontWeight: "bold", color: "black" }}
            >
              <IoAddOutline size={50} />
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CategoryTask;
