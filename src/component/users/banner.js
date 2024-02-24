import React from "react";

import "../../styles/banner.css";

const Banner = ({navigate}) => {
  return (
    <div className="banner-wrapper mt-5">
      <div className="banner-content-wrapper">
        <h5 className="text-center mt-5">
          <img
            className="banner-flag"
            src="https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Nepal.png"
          />
          Nepal First Online Futsal Booking Platform
        </h5>
        <h2 className="text-center mt-4">Complete Futsal</h2>
        <h2 className="text-center">Booking Solution</h2>
        <div className="d-flex justify-content-center mt-5">
          {/* <div style={{ position: "relative" }}>
            <input
              type="text"
              className="banner-location"
              id="inputWithSuffix"
              name="inputWithSuffix"
              placeholder="Pepsicola, Kathmandu, Nepal"
              style={{ paddingRight: "30px" }}
            />
            <svg
              style={{
                position: "absolute",
                right: "10px",
                top: "60%",
                transform: "translateY(-50%)",
              }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000000"
                d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
              />
            </svg>
          </div> */}
          <button className="banner-booking-button" onClick={() => navigate('/futsal/list')}>Book Now</button>
        </div>
      </div>
      <div>
        <img
          className="banner-img"
          src="https://www.trinity.edu.np/assets/backend/uploads/Gallery/ECA/2019/futsal/IMG_9452.jpg"
        />
      </div>
    </div>
  );
};

export default Banner;
