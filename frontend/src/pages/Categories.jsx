import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { catList } from "../utils/cartList";
import axios from "axios";
import { url } from "../utils/url";
import { useAuth } from "../context/Auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const Categories = () => {
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

  return (
    <div className="">
      <Navbar />
      {loader ? (
        <Loader />
      ) : (
        <div className="container-fluid" style={{ minHeight: "62vh" }}>
          <div className="row">
            <div className="col-md-12">
              <h4 className="text-center mt-2">All Categories</h4>
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "2rem",
                  padding: "2rem",
                  flexWrap: "wrap",
                }}
              >
                {catList?.map((cat) => (
                  <Link
                    key={cat.id}
                    style={{
                      textDecoration: "none",
                      padding: "1rem",
                      backgroundColor: "orange",
                      color: "black",
                      fontWeight: "bold",
                      minWidth: "16rem",
                      borderRadius: "0.2rem",
                      textAlign: "center",
                    }}
                    to={`/categories/${cat.name}`}
                  >
                    {cat.name} (
                    {tasks.filter((task) => task.category === cat.name).length})
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Categories;
