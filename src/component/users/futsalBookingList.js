import React, { useEffect, useState } from "react";
import { Button, Modal, message } from "antd";
import { toast } from "react-toastify";

import { fetch, post } from "../../utils/HTTPUtils";
import { getLocalStorage, setLocalStorage } from "../../shared/Common";

import Navbar from "./navbar";
import BookingModal from "./bookingModal";
import moment from "moment";
import Footer from "./footer";

const FutsalBookingList = ({ navigate }) => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [futsalDetail, setFutsalDetail] = useState({});
  const [futsalBookingList, setFutsalBookingList] = useState();
  const [futsalBookData, setFutsalBookTime] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [loading, setLoading] = useState(false);
  const [bookingDate, setBookingDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    post("/futsal/web/list/all", { user_id: getLocalStorage("user-id") }).then(
      (res) => {
        if (res?.status === 200) {
          setUsers(res?.data?.res);
        }
      }
    );
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (selectedRow.length > 0) {
      setIsPaymentModalOpen(true);
    } else {
      message.error("Please select atleast 1 time for booking");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    window.location.reload();
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <h1>Book Futsal</h1>
        </div>
        <hr />
        <div className="card-wrapper mt-3">
          {users.map((item) => (
            <div className="card">
              <img
                className="booking-card-img"
                // src="https://www.trinity.edu.np/assets/backend/uploads/Gallery/ECA/2019/futsal/IMG_9452.jpg"
                src={`https://thefutsalpro-backend.onrender.com/images/${item?.futsal_img}`}
              />
              <br />
              <strong className="ms-2">{item?.name}</strong>
              <p className="ms-2">{item?.address}</p>
              <button
                className="card-book-btn mb-3"
                onClick={() => {
                  setSelectedRow([]);
                  setFutsalDetail(item);
                  if (getLocalStorage("admin-loggedin") === "false") {
                    showModal();
                    fetch(
                      `/futsal/web/futsal/booking/${
                        item?.futsal_id
                      }/${moment().format("YYYY-MM-DD")}`
                    ).then((res) => {
                      setFutsalBookingList(res?.data?.res);
                    });
                  } else {
                    toast("Please Login to Book Futsal");
                  }
                }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <BookingModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        futsalDetail={futsalDetail}
        setFutsalBookTime={setFutsalBookTime}
        futsalBookingList={futsalBookingList}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        setFutsalBookingList={setFutsalBookingList}
        loading={loading}
        setBookingDate={setBookingDate}
      />
      <Modal
        title={<h2>Select Payment Method</h2>}
        open={isPaymentModalOpen}
        onOk={() => {}}
        onCancel={() => setIsPaymentModalOpen(false)}
        confirmLoading={loading}
      >
        <div style={{ marginTop: "20px" }}>
          <Button
            style={{ backgroundColor: "#5d2e8e", color: "#ffff" }}
            onClick={() => {
              const txnPayload = {
                return_url: "https://thefutsalpro-backend.onrender.com/payment/success",
                website_url: "https://thefutsalpro-backend.onrender.com",
                amount: selectedRow?.[0]?.rate * 100,
                purchase_order_id: "test12",
                purchase_order_name: "test",
                customer_info: {
                  name: getLocalStorage("user-name"),
                  email: getLocalStorage("user-email"),
                  phone: getLocalStorage("user-phone-no"),
                },
              };
              post("/transaction", txnPayload)
                .then((res) => {
                  if (res?.data?.success) {
                    window.location.href = res?.data?.data?.payment_url;
                    setLocalStorage("futsal_id", selectedRow?.[0]?.futsal_id);
                    setLocalStorage("timing", selectedRow?.[0]?.timing);
                    setLocalStorage("booking-id", selectedRow?.[0]?._id);
                    setLocalStorage("booking-date", bookingDate);
                  }
                })
                .catch((err) => console.log("errrrr:::::::::::", err));
            }}
          >
            Pay With Khalti
          </Button>
          <Button
            style={{ marginLeft: "5px" }}
            onClick={() => {
              setLocalStorage("futsal_id", selectedRow?.[0]?.futsal_id);
              setLocalStorage("timing", selectedRow?.[0]?.timing);
              setLocalStorage("booking-id", selectedRow?.[0]?._id);
              setLocalStorage("booking-date", bookingDate);
              navigate("/payment/success");
            }}
          >
            Pay With Cash
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FutsalBookingList;
