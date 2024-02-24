import { Breadcrumb, Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";

import { post } from "../../utils/HTTPUtils";
import { getLocalStorage } from "../../shared/Common";

const FutsalList = ({ navigate }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await post("/futsal");
      if (res?.status === 200) {
        setData(res?.data?.res);
      }
    } catch (error) {
      console.error("Error fetching futsal data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button onClick={() => navigate(`/edit/${record?._id}/futsal`)}>
            Edit
          </Button>
          {getLocalStorage("super-admin") === "true" && (
            <Button
              style={{ backgroundColor: "red", color: "#ffff" }}
              className="ms-2"
              onClick={() =>
                post("/futsal/delete", { id: record?._id })
                  .then((res) => {
                    message.success("Futsal Deleted Successfully");
                    fetchData();
                  })
                  .catch((err) => {
                    console.log(":::::::::::::::", err);
                  })
              }
            >
              Delete
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <Breadcrumb className="text-right mb-5" style={{ cursor: "pointer" }}>
        <Breadcrumb.Item onClick={() => navigate("/dashboard")}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item>Futsal</Breadcrumb.Item>
      </Breadcrumb>
      {getLocalStorage("super-admin") === "true" && (
        <Button
          className="mb-3 float-end"
          onClick={() => navigate("/add/futsal")}
        >
          Add Futsal
        </Button>
      )}
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default FutsalList;
