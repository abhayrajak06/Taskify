import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { catList } from "../utils/cartList";
import axios from "axios";
import { url } from "../utils/url";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreateTask = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const user = localStorage.getItem("auth");
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: tomorrow.toISOString().substr(0, 10),
    category: "Personal",
    priority: "Medium",
    status: "In_progress",
  });
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const title = task.title;
      const description = task.description;
      const dueDate = task.dueDate;
      const category = task.category;
      const priority = task.priority;
      const status = task.status;
      const user = auth?._id;
      const res = await axios.post(
        `${url}/api/v1/todo/create`,
        { title, description, dueDate, category, priority, status, user },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data) {
        toast.success("Task created");
        navigate("/all-tasks");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
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
              <h2 className="text-center mb-2">Create Task</h2>
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
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateTask;
