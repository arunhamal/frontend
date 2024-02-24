import React, { useEffect, useState } from "react";
import { Badge, Popconfirm, message } from "antd";
import { toast } from "react-toastify";
import { WechatOutlined } from "@ant-design/icons";

import { fetch, post } from "../../utils/HTTPUtils";
import { getLocalStorage } from "../../shared/Common";

import Navbar from "./navbar";
import ChallengeAcceptModal from "./challengeAcceptModal";
import Footer from "./footer";

const Challenge = ({ navigate }) => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [challengeAcceptList, setChallengeAcceptList] = useState([]);
  useEffect(() => {
    post("/web/user", { user_id: getLocalStorage("user-id") }).then((res) => {
      if (res?.status === 200) {
        setUsers(res?.data?.res);
      }
    }).catch(err => console.log("err::::::::", err))
  }, []);

  useEffect(() => {
    fetch(`/challenge/${getLocalStorage("user-id")}/count`).then((res) => {
      if (res?.status === 200) {
        setCount(res?.data?.res);
      }
    }).catch(err => console.log("err::::::::", err))
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <h1>Challenge Your Opponent</h1>
          <Badge count={count}>
            <WechatOutlined
              style={{ cursor: "pointer", fontSize: "30px" }}
              className="float-right text-danger"
              onClick={() => {
                if (getLocalStorage("admin-loggedin") === "false") {
                  if (count > 0) {
                    setIsModalOpen(true)
                    fetch(`/challenge/${getLocalStorage("user-id")}/list`).then((res) => {
                      if (res?.status === 200) {
                        setChallengeAcceptList(res?.data?.res)
                      }
                    })
                  } else {
                    message.error('You donot have any challenges')
                  }

                } else {
                  message.error("Please Login For Challenges.")
                }
              }}
            />
          </Badge>
        </div>
        <hr />
        <div className="card-wrapper mt-3">
          {users.map((item) => (
            <div className="card">
              <img
                className="booking-card-img"
                src="https://www.trinity.edu.np/assets/backend/uploads/Gallery/ECA/2019/futsal/IMG_9452.jpg"
              />
              <br />
              <strong className="ms-2">{item?.name}</strong>
              <p className="ms-2">{item?.address}</p>
              <Popconfirm
                title="Are you sure you want to challenge?"
                onConfirm={() => {
                  if (getLocalStorage("admin-loggedin") === "false") {
                    post("/challenge", {
                      id: item?._id,
                      from: getLocalStorage("user-id"),
                      from_name: getLocalStorage("user-name"),
                      from_email: getLocalStorage("user-email"),
                      from_phone_no: getLocalStorage("user-phone-no"),
                      to: item?._id,
                    }).then((res) => {
                      if (res?.status === 200) {
                        message.success('Challenged Successfully.')
                      }
                    })
                  } else {
                    toast("Please login to challenge");
                  }
                }}
                okText="Yes"
                cancelText="No"
              >
                <button className="card-book-btn mb-3">Challenge</button>
              </Popconfirm>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
      <ChallengeAcceptModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        challengeAcceptList={challengeAcceptList}
      />
    </>
  );
};

export default Challenge;
