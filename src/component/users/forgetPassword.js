import React, { useState } from "react";

import { post } from "../../utils/HTTPUtils";
import { message } from "antd";

const ForgetPassword = ({ navigate }) => {
  const [email, setEmail] = useState();
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-4 col-lg-4 col-xl-4">
          <h1 className="text-center">Logo</h1>
          <h3 className="mt-5 text-center">Reset Password</h3>
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
              post("/auths/web/forget-password", { email: email }).then(() => {
                message.success("Reset link send to your email")
              })
            }}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
