import React from "react";
import { useNavigate,Link } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div
      className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
      data-wow-delay="0.1s"
    >
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            <h4 className="section-title ff-secondary text-start text-primary fw-normal ms-3 mb-4 text-white">
              FutsalPro
            </h4>
            <a className="btn btn-link text-white" onClick={() => navigate('/futsal/list')}>Booking</a>
            <a className="btn btn-link text-white" onClick={() => navigate('/challenge')}>Challenges</a>
            <a className="btn btn-link text-white" onClick={() => navigate('/event/list')}>Event</a>
            <a className="btn btn-link text-white" onClick={() => navigate('/contact-us')}>Contact</a>
            <a className="btn btn-link text-white" onClick={() => navigate('/terms-condition')}>Terms & Condition</a>
          </div>
          <div className="col-lg-4 col-md-6">
            <h4 className="section-title ff-secondary text-start text-primary fw-normal ms-3 mb-4 text-white">
              Contact
            </h4>
            <p className="mb-2 text-start">
              <i className="fa fa-map-marker-alt me-3"></i> Kamal Pokhari, Kathmandu
            </p>
            <p className="mb-2 text-start">
              <i className="fa fa-phone-alt me-3"></i>9877676767
            </p>
            <p className="mb-2 text-start">
              <i className="fa fa-envelope me-3"></i>futsalpro@gmail.com
            </p>
          </div>

          <div className="col-lg-4 col-md-6">
            <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4 text-white">
              Opening
            </h4>
            <h5 className="text-light fw-normal text-start">
              Wednesday - Monday
            </h5>
            <p className="text-start">16:00 - 20:00</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-12 text-center mb-3">
              &copy; <Link to= "/login" className="border-bottom text-white">FutsalPro</Link>, All
              Right Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
