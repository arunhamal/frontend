import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

const TermsPage = ({navigate}) => {
  return (
    <>
      <Navbar navigate={navigate} />
      <div className="container">
        <h1>TheFutsalPro Terms & Policy</h1>
        <h2>1. Introduction</h2>
        <p>
          Welcome to TheFutsalPro! These Terms and Policy govern your use of our
          website and services. By accessing or using our website, you agree to
          comply with these terms. Please read them carefully.
        </p>

        <h2>2. Ownership and Operation</h2>
        <p>
          TheFutsalPro is owned and operated by TheFutsalPro, headquartered in
          Kathmandu, Nepal. Our website serves as the primary interface for
          users to access our services.
        </p>

        <h2>3. Booking Services</h2>
        <p>
          Users can book futsal arenas through our platform by selecting a
          calendar date to view availability. Available arenas are highlighted
          in green, and users can proceed to register for a booking by providing
          necessary information.
        </p>

        <h2>4. Payment Options</h2>
        <p>
          Upon confirming a booking, users have the flexibility to choose
          between online payment via Khalti or cash payment at the venue. We
          ensure a secure payment process for online transactions.
        </p>

        <h2>5. Opponent Challenge System</h2>
        <p>
          Our platform facilitates friendly competition by allowing users to
          issue challenges or search for opponents. Users can specify suitable
          times for matches and leave contact information for coordination.
        </p>

        <h2>6. Event Management</h2>
        <p>
          TheFutsalPro hosts various events and tournaments, providing detailed
          information and registration forms for interested teams. Our event
          system enables seamless participation and coordination.
        </p>

        <h2>7. User Responsibilities</h2>
        <p>
          While using our website and services, users are expected to adhere to
          our terms and policies, respect other users, and comply with facility
          rules and regulations. We prioritize a safe and enjoyable experience
          for all.
        </p>

        <h2>8. Privacy and Data Protection</h2>
        <p>
          We are committed to protecting the privacy of our users and handling
          personal data responsibly. Our Privacy Policy outlines how we collect,
          use, and safeguard user information. By using our platform, you
          consent to the collection and use of your data as described in our
          Privacy Policy.
        </p>

        <h2>9. Modifications and Updates</h2>
        <p>
          We reserve the right to update or modify these terms and policies as
          needed to reflect changes in our services or legal requirements. Any
          revisions will be effective immediately upon posting on our website.
          Continued use of our website constitutes acceptance of the updated
          terms and policies.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions or concerns about these terms and policies,
          please contact us at{" "}
          <a href="mailto:contact@thefutsalpro.com">contact@thefutsalpro.com</a>
          .
        </p>

        <p>Thank you for choosing TheFutsalPro. Let's play!</p>
      </div>
      <Footer navigate={navigate}/>
    </>
  );
};

export default TermsPage;
