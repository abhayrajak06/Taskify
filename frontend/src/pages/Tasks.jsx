import React, { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useAuth } from "../context/Auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../utils/url";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import { FaBucket } from "react-icons/fa6";

const Tasks = () => {
  const [auth, setAuth] = useAuth();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("auth");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getAllTasks();
    }
  }, []);

  const getAllTasks = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/todo/all-todos/${auth?._id}`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      if (res?.data) {
        setTasks(res.data);
      }
    } catch (error) {
      console.log(error);
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

  return (
    <div className="container mt-2" style={{ minHeight: "68vh" }}>
      <div className="row">
        <div className="col-md-10 d-flex flex-wrap gap-3 justify-content-center">
          {tasks.length > 0 ? (
            tasks?.map((t) => (
              <div className="card-container" key={t?._id}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/update-task/${t._id}`}
                >
                  <div
                    className="card"
                    style={{ width: "14rem", height: "10rem" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{t.title}</h5>
                      <p className="card-text">
                        {t.description.substring(0, 50)}...
                      </p>
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
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "65vh" }}
            >
              <FaBucket />
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
  );
};

export default Tasks;
