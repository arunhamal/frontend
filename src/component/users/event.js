import React, { useEffect, useState } from "react";
import { Popconfirm, message } from "antd";

import { post } from "../../utils/HTTPUtils";
import { getLocalStorage } from "../../shared/Common";

import Navbar from "./navbar";
import Footer from "./footer";

const EventUserList = ({ navigate }) => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    post("/event/web/list", { user_id: getLocalStorage("user-id") }).then(
      (res) => {
        if (res?.status === 200) {
          setEvent(res?.data?.res);
        }
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <h1>Event</h1>
        </div>
        <hr />
        <div className="card-wrapper mt-3">
          {event.length > 0 ? (
            event.map((item) => (
              <div className="card">
                <img
                  className="booking-card-img"
                  src={`https://thefutsalpro-backend.onrender.com/images/${item?.event_img}`}
                />
                <br />
                <strong className="ms-2">{item?.event_name}</strong>
                <p className="ms-2">{item?.futsal_name}</p>
                {/* <Popconfirm title="Are you sure you want register?" onConfirm={() => {
                if (getLocalStorage('admin-loggedin') === 'false') {
                post('/event/web/register', {
                  event_name: item?.event_name,
                  event_id: item?._id,
                  start_date: item?.start_date,
                  end_date: item?.end_date,
                  futsal_name: item?.futsal_name,
                  user_name: getLocalStorage('user-name'),
                  user_id: getLocalStorage('user-id'),
                  phone_number: getLocalStorage('user-phone-no'),
                  email: getLocalStorage('user-email'),
                }).then((res) => {
                  message.success('Successfully Registered for Event')
                }).catch(err => {
                  if (err?.response?.status === 403) {
                    message.error(err?.response?.data?.message)
                  }
                  console.log("err:::::::::::",err)
                })
              } else {
                message.error("Please Login to Register")
              }
              }}>
              <button className="card-book-btn mb-3">Register</button>
              </Popconfirm> */}
                <button
                  className="card-book-btn mb-3"
                  onClick={() => {
                    if (getLocalStorage('admin-loggedin') === 'false') {
                    navigate("/event/register", {
                      state: {
                        event_id: item?._id,
                        event_name: item?.event_name,
                        start_date: item?.start_date,
                        end_date: item?.end_date,
                        futsal_name: item?.futsal_name,
                        futsal_id: item?.futsal_id
                      },
                    })
                  } else {
                    message.error('Please Login to Register Event')
                  }
                  }}
                >
                  Register
                </button>
              </div>
            ))
          ) : (
            <div>
              {" "}
              <h1>No Event</h1>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default EventUserList;
