import {
    DashboardOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { getLocalStorage } from './Common';

const menu=[
    {
        key: "/dashboard",
        icon: <DashboardOutlined />,
        label: "Dashboard",
        path: '/dashboard'
      },
    {
      key: "/futsal",
      icon: <UserOutlined />,
      label: "Futsal",
      path: '/futsal'
    },
    {
      key: "/booking",
      icon: <UserOutlined />,
      label: "Booking",
      path: '/booking'
    },
    {
      key: "/event",
      icon: <UserOutlined />,
      label: "Event",
      path: '/event'
    },
    {
      key: "/register/event",
      icon: <UserOutlined />,
      label: "Register Event",
      path: '/register/event'
    },
    getLocalStorage('super-admin') === "true" && {
      key: "/user/list",
      icon: <UserOutlined />,
      label: "Users",
      path: '/user/list'
    },
  ]

  export default menu