import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import MyBalance from "../components/Home/MyBalance";
import ABM from "../components/Operations/ABM";
import Navbar from "../components/Navbar/Navbar"
import "./PrivateRoutes.css"

const Layout = () => {
    return (
      <>
        <div className="layout">
          <Navbar />
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </>
    );
  };

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/myaccount" element={<Layout />}>
          <Route index element={<MyBalance />} />
          <Route path="operations" element={<ABM />} />
        </Route>
      </Routes>
    </>
  );
};

export default PrivateRoutes;
