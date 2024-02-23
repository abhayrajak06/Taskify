import React from "react";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="position-relative">
        <span className="position-absolute top-50 start-50 translate-middle text-primary fw-bold">
          A
        </span>
        <div
          className="rounded-circle border border-primary border-4 animate-spin"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
