import React, { useEffect, useState } from "react";

import { post } from "../../utils/HTTPUtils";
import "../../styles/futsallist.css";

const FutsalList = ({ navigate }) => {
  const [futsalList, setFutsalList] = useState([]);
  useEffect(() => {
    post("/futsal/web/list/home").then((res) => {
      setFutsalList(res?.data?.res);
    });
  }, []);
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h1>Popular Futsal</h1>
        <button
          className="view-all-btn"
          onClick={() => navigate("/futsal/list")}
        >
          View All
        </button>
      </div>
      <div className="card-wrapper">
        {futsalList.map((item) => (
          <div className="card">
            <img
              className="booking-card-img"
              src={`https://thefutsalpro-backend.onrender.com/images/${item?.futsal_img}`}
            />
            <br />
            <strong className="ms-2">{item?.name}</strong>
            <p className="ms-2">{item?.address}</p>

            <button
              className="card-book-btn mb-3"
              onClick={() => navigate(`/booking/${item?._id}`)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FutsalList;
