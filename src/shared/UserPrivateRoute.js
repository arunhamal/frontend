import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { getLocalStorage, isAuthenticated } from "./Common";
import Dashboard from "../component/dashboard";

const UserPrivateRoute = ({element, children, path, ...rest}) => {
  return isAuthenticated() && getLocalStorage('admin-loggedin') === "false"  ? children : <Navigate to="/login" />
};

export default UserPrivateRoute;
