import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Table, message } from "antd";

import { fetch, post } from "../../utils/HTTPUtils";

const AdminUserList = ({ navigate }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    post("/web/user/list").then((res) => {
      console.log("🚀 ~ post ~ res:", res);
      setData(res?.data?.res);
    });
  }, []);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone_no",
      key: "phone_no",
    },
    {
      title: "Category",
      dataIndex: "is_owner",
      key: "is_owner",
      render: (text, record) => <span>{text ? "Admin" : "User"}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <button className="btn btn-danger" onClick={() => {
          fetch(`/web/user/delete/${record?._id}`).then((res) => {
            message.success('User Deleted Successfully')
            post("/web/user/list").then((res) => {
              setData(res?.data?.res);
            });
          }).catch((err) => message.error('Something went wrong'))
        }}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb className="text-right mb-5" style={{ cursor: "pointer" }}>
        <Breadcrumb.Item onClick={() => navigate("/dashboard")}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item>User List</Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default AdminUserList;
