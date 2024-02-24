import { Breadcrumb, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { post } from "../../utils/HTTPUtils";

const BookingList = ({navigate}) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        post('futsal/booking/release/list').then((res) => {
            setData(res?.data?.res)
        })
    }, [])

    const columns = [
        // {
        //   title: "Email",
        //   dataIndex: "email",
        //   key: "email",
        // },
        {
          title: "Rate",
          dataIndex: "rate",
          key: "rate",
        },
        {
          title: "Time",
          dataIndex: "timing",
          key: "timing",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
          },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (_, record) => (
            <Button onClick={() => {
                post(`futsal/booking/release/${record?._id}`).then((res) => {
                    post('futsal/booking/release/list').then((res) => {
                        setData(res?.data?.res)
                    })
                })
            }}>Release</Button>
          ),
        },
      ];

  return (
    <>
      <Breadcrumb className="text-right mb-5" style={{ cursor: "pointer" }}>
        <Breadcrumb.Item onClick={() => navigate("/dashboard")}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item>Booking</Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default BookingList;
