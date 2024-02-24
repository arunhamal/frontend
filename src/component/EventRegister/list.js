import { Breadcrumb, Button, Table } from "antd";
import React, { useEffect, useState } from "react";

import { post } from "../../utils/HTTPUtils";

const EventRegister = ({ navigate }) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Event Name",
      dataIndex: "event_name",
      key: "event_name",
    },
    {
      title: "Futsal Name",
      dataIndex: "futsal_name",
      key: "futsal_name",
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Phone No",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (text) => text?.split("T")?.[0],
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) => text?.split("T")?.[0],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => {
            navigate(`/register/event/${record?._id}`);
          }}
        >
          Detail
        </Button>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await post("/event/register/list");
        if (res?.status === 200) {
          setData(res?.data?.res);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [setData]);
  return (
    <>
      <Breadcrumb className="text-right mb-5" style={{ cursor: "pointer" }}>
        <Breadcrumb.Item onClick={() => navigate("/dashboard")}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item>Event</Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default EventRegister;
