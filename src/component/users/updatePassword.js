import React, { useState } from "react";
import { post } from "../../utils/HTTPUtils";
import { message } from "antd";
import { useParams } from "react-router-dom";

const UpdatePassword = ({ navigate }) => {
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const { id } = useParams();
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-4 col-lg-4 col-xl-4">
          <h1 className="text-center">Logo</h1>
          <h3 className="mt-5 text-center">Reset Password</h3>
          <div className="mb-3 mt-5">
            <label for="exampleFormControlInput1" className="form-label">
              New Password
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 mt-2">
            <label for="exampleFormControlInput1" className="form-label">
              Confirm Password
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              if (!newPassword) {
                message.error("New Password field is required");
              } else if (!confirmPassword) {
                message.error("Confirm Password field is required");
              } else {
                if (newPassword === confirmPassword) {
                  post("/auths/web/update-password", {
                    new_password: newPassword,
                    verification_key: id,
                  })
                    .then((res) => {
                      console.log("🚀 ~ .then ~ res:", res);
                      if (res?.data?.success === false) {
                        message.error(res?.data?.message);
                      }
                      if (res?.data?.success) {
                        message.success(res?.data?.message);
                        navigate("/login");
                      }
                    })
                    .catch((err) => {
                      if (err?.response?.status === 403) {
                        message.error(err?.response?.data?.message);
                      }
                      console.log("::::::::::::::::", err);
                    });
                } else {
                  message.error("Both Password must be same");
                }
              }
            }}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
