import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import Login from './component/login'
import Signup from "./component/signup";
import Dashboard from "./component/dashboard";
import FutsalList from "./component/Futsal/list";
import AddFutsal from "./component/Futsal/add";
import HomePage from "./component/users/homepage";
import FutsalDetail from "./component/users/futsaldetail";
import BookingList from "./component/Booking/list";
import Challenge from "./component/users/challenge";
import FutsalBookingList from "./component/users/futsalBookingList";
import EventList from "./component/Event/list";
import AddEvent from "./component/Event/add";
import EventUserList from "./component/users/event";
import EventRegisterForm from "./component/users/eventRegister";
import ForgetPassword from "./component/users/forgetPassword";

import AdminPrivateRoute from "./shared/AdminPrivateRoute";
import UserPrivateRoute from './shared/UserPrivateRoute';
import PaymentSuccess from "./component/users/paymentSuccess";
import ContactUs from "./component/users/contactUs";
import EventRegister from "./component/EventRegister/list";
import EventRegisterDetail from "./component/EventRegister/eventRegisterDetail";
import UserProfile from "./component/users/userProfile";
import UserVerify from "./component/users/userVerify";
import AdminUserList from "./component/AdminUsers/list";
import { getLocalStorage } from "./shared/Common";
import UpdatePassword from "./component/users/updatePassword";
import TermsPage from "./component/users/termsPage";
function App() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Routes>
        {/* user routes */}
        <Route path="/" element={<HomePage navigate={navigate}/>} />
        <Route path="/booking/:id" element={<FutsalDetail navigate={navigate}/> }/>
        <Route path="/challenge" element={<Challenge navigate={navigate}/>} />
        <Route path="/futsal/list" element={<FutsalBookingList navigate={navigate}/>} />
        <Route path="/event/list" element={<EventUserList navigate={navigate}/>} />
        <Route path="/payment/success" element={<PaymentSuccess navigate={navigate}/>} />
        <Route path="/event/register" element={<EventRegisterForm navigate={navigate}/>} />
        <Route path="/contact-us" element={<ContactUs navigate={navigate}/>} />
        <Route path="/user/profile" element={<UserProfile navigate={navigate}/>} />
        <Route path="/verify/:id" element={<UserVerify navigate={navigate}/>} />
        <Route path="/forget-password" element={<ForgetPassword navigate={navigate}/>} />
        <Route path="/forget-password/verify/:id" element={<UpdatePassword navigate={navigate}/>} />
        <Route path="/terms-condition" element={<TermsPage navigate={navigate}/>}/>


        {/* admin routes */}
        <Route exact path="/dashboard" element={<AdminPrivateRoute><Dashboard /></AdminPrivateRoute>}/>
        <Route path="/futsal" element={<AdminPrivateRoute><FutsalList navigate={navigate}/> </AdminPrivateRoute>}/>
        <Route path="/add/futsal" element={<AdminPrivateRoute><AddFutsal navigate={navigate}/></AdminPrivateRoute>}/>
        <Route path="/edit/:id/futsal" element={<AdminPrivateRoute><AddFutsal navigate={navigate}/></AdminPrivateRoute>} />

        <Route path="/event" element={<AdminPrivateRoute><EventList navigate={navigate}/></AdminPrivateRoute>}/>
        <Route path="/add/event" element={<AdminPrivateRoute><AddEvent navigate={navigate}/></AdminPrivateRoute>} />
        <Route path="/edit/:id/event" element={<AdminPrivateRoute><AddEvent navigate={navigate}/></AdminPrivateRoute>}/>

        <Route path="/booking" element={<AdminPrivateRoute> <BookingList navigate={navigate}/> </AdminPrivateRoute>}/>
        <Route path="/register/event" element={<AdminPrivateRoute> <EventRegister navigate={navigate}/> </AdminPrivateRoute>}/>
        <Route path="/register/event/:id" element={<AdminPrivateRoute> <EventRegisterDetail navigate={navigate}/> </AdminPrivateRoute>}/>
        {getLocalStorage('super-admin') === "true" && (<Route path="/user/list" element={<AdminPrivateRoute> <AdminUserList navigate={navigate}/> </AdminPrivateRoute>}/>)}

        {/* auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
