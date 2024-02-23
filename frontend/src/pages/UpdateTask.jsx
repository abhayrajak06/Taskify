import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { catList } from "../utils/cartList";
import axios from "axios";
import { url } from "../utils/url";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UpdateTask = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { tId } = useParams();
  const user = localStorage.getItem("auth");

  useEffect(() => {
    if (!user) {
      // navigate("/login");
    }
  }, []);

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
    priority: "",
    status: "",
  });

  const getTaskData = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/todo/get-todo/${tId}`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      if (res?.data) {
        setTask(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskData();
  }, []);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, description, dueDate, category, priority, status } = task;
      const updatedTask = {
        title,
        description,
        dueDate,
        category,
        priority,
        status,
        user: auth?._id,
      };
      const res = await axios.put(
        `${url}/api/v1/todo/update/${tId}`,
        updatedTask,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data) {
        console.log(res?.data);
        toast.success("Task updated");
        navigate("/all-tasks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="container-fluid" style={{ minHeight: "65vh" }}>
        <div className="row">
          <div
            className="col-md-12"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                minWidth: "18rem",
                padding: "1rem",
                margin: "1rem 0",
                borderRadius: "0.5rem",
                backgroundColor: "#FBF6EE",
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
              }}
            >
              <h2 className="text-center mb-2">Update Task</h2>
              <div className="mb-3">
                <label htmlFor="exampleInputTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  required
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputTitle"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputDescription" className="form-label">
                  Description
                </label>
                <textarea
                  style={{ minHeight: "10rem" }}
                  type="text"
                  placeholder="Enter description"
                  required
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputDescription"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputdueDate" className="form-label">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div
                className="mb-3"
                style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
              >
                <label>
                  Category:
                  <select
                    value={task.category}
                    name="category"
                    onChange={handleChange}
                    required
                  >
                    {catList?.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Priority:
                  <select
                    value={task.priority}
                    name="priority"
                    onChange={handleChange}
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </label>
                <label>
                  Status:
                  <select
                    value={task.status}
                    name="status"
                    onChange={handleChange}
                    required
                  >
                    <option value="In_progress">In-progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateTask;
