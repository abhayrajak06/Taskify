import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="d-flex align-items-center justify-content-center vh-100 flex-column">
        <h1 className="fw-bold display-1">404</h1>
        <h2 className="m-2">Page Not Found!</h2>
        <button
          onClick={goBack}
          className="btn btn-primary btn-lg mt-1"
          style={{ borderRadius: "0.6rem" }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
