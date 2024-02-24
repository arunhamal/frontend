import React, { useEffect } from "react";
import { DatePicker, Form, Modal, Select, Table, Tag } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";

import { day } from "../../constant";
import { fetch } from "../../utils/HTTPUtils";
import dayjs from "dayjs";

const BookingModal = (props) => {
  const {
    isModalOpen,
    handleOk,
    handleCancel,
    futsalDetail,
    setFutsalBookTime,
    futsalBookingList,
    selectedRow,
    setSelectedRow,
    setFutsalBookingList,
    loading,
    setBookingDate,
    // setFutsalBookListId,
  } = props;
  const formItemProps = {
    wrapperCol: { xs: 24 },
    labelCol: { xs: 24 },
    labelAlign: "left",
    className: "mb-md-3 mb-1",
  };
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    setFutsalBookTime(selectedRow);
  }, [selectedRow]);

  useEffect(() => {
    form.setFieldsValue({ day: "Sunday" });
  }, []);

  const columns = [
    {
      title: "Timing",
      dataIndex: "timing",
    },
    {
      title: "Rate",
      dataIndex: "rate",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return (
          <a>
            {!record?.status || record?.status === "Available" ? (
              <Tag color="green">Available</Tag>
            ) : (
              <Tag color="red">Booked</Tag>
            )}
          </a>
        );
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRow(selectedRows);
  };
  const rowSelection = {
    selectedRow,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled:
        selectedRow?.length > 0
          ? record.timing !== selectedRow?.[0]?.timing
          : false || record?.status === "Booked",
    }),
  };

  const tableProps = {
    rowKey: "_id",
    rowSelection: rowSelection,
    columns: columns,
    dataSource: futsalBookingList,
    pagination: false,
  };
  return (
    <Modal
      title={<h2>{futsalDetail?.name}</h2>}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <Form form={form}>
        {/* <Form.Item
          {...formItemProps}
          name={"day"}
          label={<strong>Select Day</strong>}
        >
          <Select
            placeholder="Select Day"
            showSearch
            allowClear
            options={day}
            onSelect={(value) =>{
              if (value) {
                fetch(`/futsal/web/futsal/booking/${id|| futsalDetail?._id}/${value}`).then((res) => {
                  setFutsalBookingList(res?.data?.res)
                })
              }
            }
            }
          />
        </Form.Item> */}
        <Form.Item
          {...formItemProps}
          name={"booking_date"}
          label={<strong>Booking Date</strong>}
        >
          <DatePicker
            disabledDate={(current) => {
              let customDate = moment().format("YYYY-MM-DD");
              return current && current < moment(customDate, "YYYY-MM-DD")
            }}
            onChange={(value, dateString) => {
              setBookingDate(dateString);
              if (dateString) {
                fetch(
                  `/futsal/web/futsal/booking/${futsalDetail?.futsal_id}/${dateString}`
                ).then((res) => {
                  setFutsalBookingList(res?.data?.res);
                });
              }
            }}
          />
        </Form.Item>
      </Form>
      <hr />
      <h5>Time Slots:</h5>
      <Table {...tableProps} />
    </Modal>
  );
};

export default BookingModal;
