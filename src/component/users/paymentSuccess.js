import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { clearLocalStorage, getLocalStorage } from "../../shared/Common";
import { post } from "../../utils/HTTPUtils";
import { Spin } from "antd";

const PaymentSuccess = () => {
  const [bookingId] = useState(getLocalStorage("booking-id"));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (bookingId) {
      setLoading(true);
      const formData = {
        user_id: getLocalStorage("user-id"),
        name: getLocalStorage("user-name"),
        email: getLocalStorage("user-email"),
        phone_no: getLocalStorage("user-phone-no"),
        timing: getLocalStorage("timing"),
        futsal_id: getLocalStorage("futsal_id"),
        booking_date: getLocalStorage("booking-date"),
        rate: getLocalStorage("booking-rate")
      };
      post(
        `/futsal/web/futsal/booking/${getLocalStorage("booking-id")}`,
        formData
      )
        .then(() => {
          clearLocalStorage("futsal_id");
          clearLocalStorage("timing");
          clearLocalStorage("booking-id");
          clearLocalStorage("booking-date");
          clearLocalStorage("futsal-book-list-id");
          clearLocalStorage("booking-rate");
          navigate("/");
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <Spin spinning={loading}>
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
          Your Payment Has Been Received{" "}
          <a href="http://localhost:3000/" class="alert-link">
            {" "}
            Click Here for Home Page
          </a>
          .
        </div>
      </div>
    </Spin>
  );
};

export default PaymentSuccess;
