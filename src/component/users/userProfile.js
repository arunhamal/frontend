import React, { useEffect, useState } from "react";
import { Input } from "antd";

import Navbar from "./navbar";
import { getLocalStorage } from "../../shared/Common";
import { post } from "../../utils/HTTPUtils";
import UserBooking from "./userBooking";
import logo from "../../futsal.png";
const UserProfile = ({ navigate }) => {
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [smsModalOpen, setSMSModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [futsalData, setFutsalData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNo] = useState();

  const handleOk = () => {
    setIsModalOpen(false);
    setFutsalData({});
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFutsalData({});
  };

  useEffect(() => {
    post("/auths/web/profile", {
      id: getLocalStorage("user-id"),
    })
      .then((res) => {
        if (res?.status === 200) {
          setUserData(res?.data?.data);
        }
      })
      .catch((err) => console.log("::::::::::::::::", err));
  }, []);
  return (
    <>
      <Navbar navigate={navigate} />
      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-8 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0" style={{ width: "60vw" }}>
                <div
                  className="col-md-4  text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <img
                    src={logo}
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "80px" }}
                  />
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between mb-2">
                      <h6>User Information</h6>
                      {editMode ? (
                        <button
                          onClick={() => {
                            const formData = {
                              name: name,
                              email: email,
                              phone_no: phoneNo,
                            };
                            post(
                              `/auths/web/${getLocalStorage("user-id")}/update`,
                              formData
                            ).then((res) => {
                              setEditMode(false);
                              post("/auths/web/profile", {
                                id: getLocalStorage("user-id"),
                              })
                                .then((res) => {
                                  if (res?.status === 200) {
                                    setUserData(res?.data?.data);
                                  }
                                })
                                .catch((err) =>
                                  console.log("::::::::::::::::", err)
                                );
                            });
                          }}
                          className="btn btn-primary"
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditMode(true);
                            setName(userData?.name);
                            setEmail(userData?.email);
                            setPhoneNo(userData?.phone_no);
                          }}
                          className="btn btn-warning"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Name</h6>
                        {editMode ? (
                          <Input
                            placeholder="Name"
                            onChange={(value) => setName(value.target.value)}
                            defaultValue={userData?.name}
                          />
                        ) : (
                          <p className="text-muted">{userData?.name}</p>
                        )}
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        {editMode ? (
                          <Input
                            placeholder="Email"
                            onChange={(val) => setEmail(val.target.value)}
                            defaultValue={userData?.email}
                          />
                        ) : (
                          <p className="text-muted">{userData?.email}</p>
                        )}
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        {editMode ? (
                          <Input
                            placeholder="phone"
                            onChange={(val) => {
                              setPhoneNo(val.target.value);
                            }}
                            defaultValue={userData?.phone_no}
                          />
                        ) : (
                          <p className="text-muted">{userData?.phone_no}</p>
                        )}
                      </div>
                    </div>
                    <hr />
                    <button
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                      }}
                      className="btn btn-danger"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        post(
                          `/futsal/web/futsal/show/booking/${getLocalStorage(
                            "user-id"
                          )}`,
                          {}
                        ).then((res) => {
                          setBookingData(res?.data?.res);
                        });
                      }}
                      className="btn btn-danger float-end"
                    >
                      My Bookings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UserBooking
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        bookingData={bookingData}
        setBookingData={setBookingData}
        smsModalOpen={smsModalOpen}
        setSMSModalOpen={setSMSModalOpen}
        futsalData={futsalData}
        setFutsalData={setFutsalData}
      />
    </>
  );
};

export default UserProfile;
