import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { post } from "../utils/HTTPUtils";
import logo from '../futsal.png';

import "../styles/signup.css";

const Signup = () => {
  const [userName, setUserName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-4 col-lg-4 col-xl-4">
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <img style={{ width: "200px", height: "150px" }} src={logo} />
          </div>
          <h3 className="mt-2 mb-5 text-center">Create an account</h3>
          {/* {!isOwner && ( */}
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                type="input-text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Arun Hamal"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          {/* )} */}
          <div className="mb-3">
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
          <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Phone
              </label>
              <input
                type="input-text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="9856575758"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          <div className="row">
            <div className="col-md-6 col-lg-6 col-xl-6">
              <button
                type="button"
                className="btn"
                style={{
                  width: "100%",
                  border: `0.5px solid ${isOwner ? "black" : "red"}`,
                  backgroundColor: `${isOwner ? "white" : "red"}`,
                  color: `${isOwner ? "black" : "white"}`,
                }}
                onClick={() => setIsOwner(false)}
              >
                User
              </button>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <button
                type="button"
                className="btn ml-1"
                style={{
                  width: "100%",
                  border: `0.5px solid ${isOwner ? "red" : "black"}`,
                  backgroundColor: `${isOwner ? "red" : "white"}`,
                  color: `${isOwner ? "white" : "black"}`,
                }}
                onClick={() => setIsOwner(true)}
              >
                Futsal Owner
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn mt-5"
            style={{
              width: "100%",
              border: "0.5px solid red",
              backgroundColor: "red",
              color: "white",
            }}
            onClick={() => {
              post("/auths/signup", {
                name: userName,
                phone_no: phoneNumber,
                email: email,
                password: password,
                is_owner: isOwner,
              }).then((res) => {
                navigate("/login");
                message.success('User Register Successfull.')
              }).catch((err) => {
                if (err?.response?.status === 401 || err?.response?.status === 403) {
                  message.error(err?.response?.data?.message)
                }
              })
            }}
          >
            Sign up
          </button>
          <p className="text-center mt-4">
            Already a member?{" "}
            <span
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
