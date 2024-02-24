import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { getLocalStorage, isAuthenticated } from "./Common";
import Dashboard from "../component/dashboard";

const AdminPrivateRoute = ({element, children, path, ...rest}) => {
  const location = useLocation();
  return isAuthenticated() && getLocalStorage('admin-loggedin') === "true"  ? <Dashboard component={location?.pathname !== "/dashboard" ? children : ''}></Dashboard> : <Navigate to="/login" />
};

export default AdminPrivateRoute;
