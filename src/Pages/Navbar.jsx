import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedin }) {
  const navigate = useNavigate();
  return (
    <header class="d-flex flex-wrap align-items-center justify-content-end justify-content-md-end py-3 mb-4 border-bottom">
      <div class="col-md-3 text-end">
        {!isLoggedin ? (
          <button type="button" class="btn btn-outline-primary me-2">
            Login
          </button>
        ) : (
          <button
            type="button"
            class="btn btn-outline-danger me-2"
            onClick={() => navigate("/login")}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
