import React, { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

import menu from "../shared/MenuRoutes";
import logo from "../futsal.png";

const { Header, Sider, Content } = Layout;

const Dashboard = ({ component }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Layout style={{ minHeight: "100vh", maxHeight: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <img
          style={{ width: "100%", height: "65px" }}
          src={logo}
          alt="FutsalPro"
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location?.pathname]}
          items={menu}
          onClick={(e) => {
            navigate(e.key);
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <button
            className="btn btn-danger float-end mt-3 me-3"
            onClick={() => {
              navigate("/login");
              localStorage.clear();
            }}
          >
            Logout
          </button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {component}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
