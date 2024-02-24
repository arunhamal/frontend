import { Button, Col, Form, InputNumber, Modal, Row, Table, message } from "antd";
import React, { useState } from "react";
import { fetch, post } from "../../utils/HTTPUtils";
import { getLocalStorage } from "../../shared/Common";
import moment from "moment";

const UserBooking = (props) => {
  const {
    isModalOpen,
    handleCancel,
    handleOk,
    bookingData,
    setBookingData,
    smsModalOpen,
    setSMSModalOpen,
    futsalData,
    setFutsalData,
  } = props;

  const [smsLoading, setSMSLoading] = useState(false);

  let formItemLayout = {
    labelCol: { xs: 24, sm: 24, md: 10, lg: 8, xl: 8 },
    wrapperCol: { xs: 24, sm: 24, md: 14, lg: 16, xl: 16 },
    labelAlign: "left",
  };

  const columns = [
    {
      title: "Timing",
      dataIndex: "timing",
    },
    {
      title: "Booking Date",
      dataIndex: "booking_date",
    },
    {
      title: "Action",
      render: (text, record) => {
        return (
          <div>
            <button
              className="btn btn-danger"
              onClick={() => {
                post("/futsal/web/futsal/cancel/booking", { ...record }).then(
                  () => {
                    post(
                      `/futsal/web/futsal/show/booking/${getLocalStorage(
                        "user-id"
                      )}`,
                      {}
                    ).then((res) => {
                      setBookingData(res?.data?.res);
                    });
                  }
                );
              }}
            >
              Cancel
            </button>
            {moment().add(1, "days").format("YYYY-MM-DD") ===
              record?.booking_date && (
              <button
                className="btn btn-primary ms-3"
                onClick={() => {
                  setSMSModalOpen(true);
                  setFutsalData(record);
                }}
              >
                Notify
              </button>
            )}
          </div>
        );
      },
    },
  ];
  const tableProps = {
    rowKey: "_id",
    columns: columns,
    dataSource: bookingData,
    pagination: false,
  };

  const onFinish = ({ phone_1, phone_2, phone_3, phone_4, phone_5 }) => {
    setSMSLoading(true);
    fetch(`futsal/web/${futsalData?.futsal_id}`)
      .then((res) => {
        const payload = {
          token: "v2_uwlHg5lGT1ggUPwDpfdeMQbBtEL.QbSc",
          from: "Demo",
          to: `${phone_1}, ${phone_2}, ${phone_3}, ${phone_4}, ${phone_5}`,
          text: `Futsal Booking Detail
Futsal Name: ${res?.data?.res?.[0]?.name}
Booking Date: ${futsalData?.booking_date}
Booking Time: ${futsalData?.timing}
Booked By: ${futsalData?.name}
`,
        };
        if (res?.status === 200) {
          post("/auths/web/send-sms", { payload })
            .then((res) => {
              setSMSLoading(false);
              setSMSModalOpen(false);
              message.success('SMS Send Successfully')
            })
            .catch((err) => {
              setSMSLoading(false);
              setSMSModalOpen(false);
            });
        }
      })
      .catch((err) => console.log(":::::::::::::::::::", err));
  };

  return (
    <>
      <Modal
        title={<h2>My Bookings</h2>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table {...tableProps} />
      </Modal>
      <Modal
        title={<h2 className="mb-3">Send SMS</h2>}
        open={smsModalOpen}
        onOk={() => {
          setSMSModalOpen(false);
          setFutsalData({});
        }}
        onCancel={() => {
          setSMSModalOpen(false);
          setFutsalData({});
        }}
        confirmLoading={smsLoading}
      >
        <Form onFinish={onFinish}>
          <Row>
            <Col xs={24} md={24} lg={20} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Phone 1"
                name={"phone_1"}
                rules={[{ required: true, message: "Required" }]}
              >
                <InputNumber
                  controls={false}
                  placeholder="Phone 1"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={20} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Phone 2"
                name={"phone_2"}
                // rules={[{ required: true, message: "Required" }]}
              >
                <InputNumber
                  controls={false}
                  placeholder="Phone 2"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={20} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Phone 3"
                name={"phone_3"}
                // rules={[{ required: true, message: "Required" }]}
              >
                <InputNumber
                  controls={false}
                  placeholder="Phone 3"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={20} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Phone 4"
                name={"phone_4"}
                // rules={[{ required: true, message: "Required" }]}
              >
                <InputNumber
                  controls={false}
                  placeholder="Phone 4"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={20} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Phone 5"
                name={"phone_5"}
                // rules={[{ required: true, message: "Required" }]}
              >
                <InputNumber
                  controls={false}
                  placeholder="Phone 5"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Button loading={smsLoading} htmlType="submit">
            Send SMS
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UserBooking;
