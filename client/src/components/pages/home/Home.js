import React from "react";
import Login from "../../Auth/Login";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-image">
        <div className="home-image-container">
          <img
            src="https://quickbooks.intuit.com/oidam/intuit/sbseg/en_us/Blog/Illustration/5bd3805355baa2fe0a68f98ad0d4e0d8.png"
            alt="Finance"
          />
        </div>
        <div className="home-welcome">
          <h1>Finance Tracker</h1>
          <h3>Manage your money wisely</h3>
        </div>
      </div>
      <div className="home-log">
        <Login/>
      </div>
    </div>
  );
};

export default Home;
