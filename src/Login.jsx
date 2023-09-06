import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { faPerson, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

export default function Login({ setIsLoggedin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "restauran@gmail.com" && password === "12345") {
      setIsLoggedin(true);
      navigate("/");
    } else {
      alert("Login gagal. Periksa email dan password Anda.");
    }
  };

  return (
    <section>
      <div
        className="container-fluid d-grid justify-content-center"
        style={{
          background: "#1856b4",
          height: "100%",
          padding: "4rem",
        }}
      >
        <div
          class="container-fluid h-100 card"
          style={{ width: "55rem", marginBottom: "8rem" }}
        >
          <div class="row h-100  ">
            <div
              class="col-sm-6 d-none d-sm-block  rounded"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1635230657218-5aaa3a7eb522?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <div class="col-sm-6 align-self-center">
              <div class="login-container " style={{ padding: "5rem" }}>
                <div className="text-center">
                  <FontAwesomeIcon
                    style={{ width: "4rem", height: "4rem" }}
                    className=""
                    icon={faUserCircle}
                  />
                  <h3 class="text-center fw-bold pt-2 ">Welcome Back</h3>
                  <p>Welcome Back! Please enter your details</p>
                </div>
                <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label ">
                      Email address
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Input Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label ">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Input Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-end mt-4">
                    <button
                      type="submit"
                      class="btn btn-primary w-100"
                      onClick={handleLogin}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
