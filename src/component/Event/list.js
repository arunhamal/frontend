import { Breadcrumb, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { post } from "../../utils/HTTPUtils";
import { getLocalStorage } from "../../shared/Common";

const EventList = ({ navigate }) => {
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
      render: (_, record) => (
        <Button onClick={() => navigate(`/edit/${record?._id}/event`)}>
          Edit
        </Button>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await post("/event/list");
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
        <Button
          className="mb-3 float-end"
          onClick={() => navigate("/add/event")}
        >
          Add Event
        </Button>
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default EventList;
