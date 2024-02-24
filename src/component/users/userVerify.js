import { message } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetch } from "../../utils/HTTPUtils";

const UserVerify = ({ navigate }) => {
  const { id } = useParams();
  useEffect(() => {
    fetch(`/auths/verify/${id}`)
      .then(() => {
        message.success("Your email has been verified");
        navigate("/login");
      })
      .catch((err) => console.log("::::::::::::::", err));
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div class="alert alert-success" role="alert">
        Please wait your email is verifying
      </div>
    </div>
  );
};

export default UserVerify;
