import { Button, Modal, Popconfirm } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { getLocalStorage } from "../../shared/Common";
import { post } from "../../utils/HTTPUtils";

const ChallengeAcceptModal = (props) => {
  const { isModalOpen, handleOk, handleCancel, challengeAcceptList } = props;
  const [acceptBtnLoading, setAcceptBtnLoading] = useState(false);
  return (
    <Modal
      title={<h2>Accept Challenge</h2>}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={'80%'}
    >
        <h1/>
      <div className="card-wrapper mt-3">
        {challengeAcceptList.map((item) => (
          <div className="card">
            <img
              className="booking-card-img"
              src="https://www.trinity.edu.np/assets/backend/uploads/Gallery/ECA/2019/futsal/IMG_9452.jpg"
            />
            <br />
            <strong className="ms-2">{item?.from_name}</strong>
            <p className="ms-2">{item?.from_email}</p>
            <Popconfirm
              title="Are you sure you want to accept challenge?"
              onConfirm={() => {
                setAcceptBtnLoading(true)
                if (getLocalStorage("user-id")) {
                  post("/challenge/accept", {
                    id: item?._id
                  }).then((res) => {
                    window.location.reload();
                    setAcceptBtnLoading(false)
                  }).catch(() => {
                    setAcceptBtnLoading(false)
                  }).finally(() => {
                    setAcceptBtnLoading(false)
                  })
                } else {
                  toast("Please login to accept challenge");
                }
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button loading={acceptBtnLoading} className="card-book-btn mb-3">Accept</Button>
            </Popconfirm>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ChallengeAcceptModal;
