import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { post } from "../utils/HTTPUtils";
import { setLocalStorage } from "../shared/Common";
import logo from "../futsal.png";

import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-4 col-lg-4 col-xl-4">
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <img style={{ width: "200px", height: "150px" }} src={logo} />
          </div>
          <h3 className="mt-2 text-center">Login</h3>
          <div className="mb-3 mt-5">
            <label for="exampleFormControlInput1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="futsal@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label for="inputPassword5" className="form-label">
            Password
          </label>
          <div className="input-group mb-3">
            <input
              type={showPassword ? "input-text" : "password"}
              id="inputPassword5"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(showPassword ? false : true)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-slash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                </svg>
              )}
            </span>
          </div>
          <p
            className="text-end"
            style={{ marginBottom: "20px", cursor: "pointer" }}
            onClick={() => navigate("/forget-password")}
          >
            Forget your password?
          </p>
          <button
            type="button"
            className="btn"
            style={{
              width: "100%",
              border: "0.5px solid red",
              backgroundColor: "red",
              color: "white",
            }}
            onClick={() => {
              post("/auths/login", {
                email: email,
                password: password,
              })
                .then((res) => {
                  if (res?.status === 200) {
                    message.success(res?.data?.message);
                    if (res?.data?.challenge) {
                      message.success(res?.data?.challenge);
                    }
                    res?.data?._doc?.is_owner
                      ? navigate("/dashboard")
                      : navigate("/");
                    setLocalStorage(
                      "admin-loggedin",
                      res?.data?._doc?.is_owner
                    );
                    setLocalStorage("user-id", res?.data?._doc?._id);
                    setLocalStorage("user-email", res?.data?._doc?.email);
                    setLocalStorage("user-name", res?.data?._doc?.name);
                    setLocalStorage("user-phone-no", res?.data?._doc?.phone_no);
                    setLocalStorage("futsalPro-jwt", res?.data?.token);
                    setLocalStorage(
                      "super-admin",
                      res?.data?._doc?.super_admin
                    );
                    res?.data?._doc?.is_owner && window.location.reload();
                  }
                })
                .catch((err) => {
                  if (err?.response?.status === 403) {
                    message.error(err?.response?.data?.message);
                  }
                });
            }}
          >
            Login
          </button>
          <p className="text-center mt-4">
            Don't have an account yet?{" "}
            <span
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
