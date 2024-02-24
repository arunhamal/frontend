import React from "react";
import Navbar from "./navbar";
import Banner from "./banner";
import FutsalList from "./futsallist";
import Footer from "./footer";

const HomePage = (props) => {
  return (
    <>
      <Navbar />
      <Banner {...props} />
      <FutsalList {...props} />
      <Footer/>
    </>
  );
};

export default HomePage;
