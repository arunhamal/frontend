import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { post } from "../../utils/HTTPUtils";
// import "../../styles/login.css";
import Navbar from "./navbar";
import Footer from "./footer";

const ContactUs = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [CMessage, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <Navbar navigate={navigate} />
      <div>
        <div className="row justify-content-center">
          <div className="col-md-4 col-lg-4 col-xl-4">
            <h3 className="mt-5 text-center">Contact Us</h3>
            <div className="mb-3 mt-5">
              <label for="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                type="name"
                value={name}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Arun Hamal"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                type="email"
                value={email}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="futsal@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Message
              </label>
              <textarea
                type="message"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Message"
                rows={5}
                value={CMessage}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-danger"
              style={{
                width: "100%",
                border: "0.5px solid red",
                color: "white",
              }}
              onClick={() => {
                setLoading(true)
                if (email && name && CMessage) {
                  post("/auths/contact", {
                    email: email,
                    name: name,
                    message: CMessage
                  })
                    .then((res) => {
                      setLoading(false)
                      setEmail();
                      setName();
                      setMessage();
                    })
                    .catch((err) => {
                      setLoading(false)
                      setEmail();
                      setName();
                      setMessage();
                      if (err?.response?.status === 403) {
                        message.error(err?.response?.data?.message);
                      }
                    });
                } else {
                  message.error('Please Fill all below fields')
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};
export default ContactUs;
