import React, { useState } from "react";
import "./Navbar.css";
import Logo from "../../logo.svg";
import  { AiOutlineMenu } from 'react-icons/ai';
//import { FaBars } from 'react-icons/fa';
import { motion } from "framer-motion";

const Sidebar = () => {

  const SidebarData = [
    {
      heading: "Home"
    },
    {
      heading: "Transactions"
    },
    {
      heading: "Profile"
    }
  ];
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <AiOutlineMenu />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          Expens<span>e</span> Tracker
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <span>{item.heading}</span>
              <span>{index}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem">
          <AiOutlineMenu />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;