import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Rate, Space, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import Navbar from "./navbar";
import { fetch, post } from "../../utils/HTTPUtils";
import FutsalDetailOverview from "./futsalDetailOverview";
import BookingModal from "./bookingModal";
import { getLocalStorage, setLocalStorage } from "../../shared/Common";
import TextArea from "antd/es/input/TextArea";

const FutsalDetail = () => {
  const { id: futsalId } = useParams();
  const [form] = Form.useForm();
  const [futsalDetail, setFutsalDetail] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [futsalBookData, setFutsalBookTime] = useState([]);
  const [futsalBookingList, setFutsalBookingList] = useState([]);
  const [bookingDate, setBookingDate] = useState(moment().format("YYYY-MM-DD"));
  // const [futsalBookListId, setFutsalBookListId] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(3.5);
  const [ratingModal, setRatingModal] = useState(false);
  const [ratingRemarks, setRatingRemarks] = useState([]);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
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
  useEffect(() => {
    fetch(`/futsal/web/${futsalId}`).then((res) => {
      setFutsalDetail(res?.data?.res?.[0]);
    });
  }, [futsalId]);

  useEffect(() => {
    post("/futsal/web/futsal/rate/count", { futsal_id: futsalId }).then((res) => {
      if (res?.status === 200) {
        setValue(res?.data?.rate);
        setRatingRemarks(res?.data?.res);
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="full-wrapper">
        <div className="futsal-detail-wrapper mt-5">
          <img
            className="futsal-detail-img"
            src={`http://localhost:8000/images/${futsalDetail?.futsal_img}`}
          />
        </div>
        <div className="d-flex justify-content-between mt-4 futsal-title">
          <div>
            <strong className="mt-5">{futsalDetail?.name}</strong>
            <p className="mt-1">{futsalDetail?.address}</p>
          </div>
          <Space>
            <Rate
              tooltips={desc}
              onChange={(value) => {
                setRatingModal(true);
                setValue(value);
              }}
              value={value}
            />
          </Space>
          <div>
            <button
              className="card-book-btn"
              onClick={() => {
                setSelectedRow([]);
                if (getLocalStorage("admin-loggedin") === "false") {
                  showModal();
                  fetch(
                    `/futsal/web/futsal/booking/${futsalDetail?.futsal_id}/${moment().format(
                      "YYYY-MM-DD"
                    )}`
                  ).then((res) => {
                    setFutsalBookingList(res?.data?.res);
                  });
                } else {
                  message.error("Please Login to Book Futsal");
                }
              }}
            >
              Book Now
            </button>
          </div>
        </div>
        <div>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="overview-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Overview
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="photos-tab"
                data-bs-toggle="tab"
                data-bs-target="#Remarks"
                type="button"
                role="tab"
                aria-controls="Remarks"
                aria-selected="false"
              >
                Remarks
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="map-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Map
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <FutsalDetailOverview futsalDetail={futsalDetail} />
            <div
              className="tab-pane fade"
              id="Remarks"
              role="tabpanel"
              aria-labelledby="photos-tab"
            >
              {ratingRemarks?.map((item) => (
                <div
                  style={{
                    backgroundColor: "#f1f1f1",
                    width: "300px",
                    height: "auto",
                    marginTop: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <div>
                    <Rate
                      tooltips={desc}
                      disabled={true}
                      value={value}
                      style={{ margin: "10px 10px" }}
                    />
                  </div>
                  <div style={{ margin: "10px 10px" }}><strong>Remarks:</strong> {item?.remarks || '-'}</div>
                </div>
              ))}
            </div>
            {futsalDetail?.futsal_map && (
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="map-tab"
            >
              <iframe
                src={futsalDetail?.futsal_map}
                width="600"
                height="450"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            )}
          </div>
        </div>
      </div>
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
        // setFutsalBookListId={setFutsalBookListId}
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
                return_url: "http://localhost:3000/payment/success",
                website_url: "http://localhost:3000/",
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
                    setLocalStorage("booking-rate", selectedRow?.[0]?.rate)
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
      <Modal
        title={<h2 className="mb-4">Rate Futsal</h2>}
        open={ratingModal}
        onOk={() => {
          const formData = {
            futsal_id: futsalId,
            name: futsalDetail?.name,
            rate: value,
            remarks: form.getFieldValue("remarks"),
          };
          if (form.getFieldValue("remarks")) {
            post("/futsal/web/futsal/rate", formData)
              .then((res) => {
                if (res?.status === 200) {
                  message.success("Futsal Rated Successfully.");
                  setRatingModal(false);
                }
                setRatingModal(false);
              })
              .catch((err) => setRatingModal(false));
          } else {
            message.error("Remarks is Required");
          }
        }}
        onCancel={() => setRatingModal(false)}
        // confirmLoading={loading}
      >
        <Form form={form}>
          <Form.Item name={"remarks"} label="Remarks">
            <TextArea></TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FutsalDetail;
