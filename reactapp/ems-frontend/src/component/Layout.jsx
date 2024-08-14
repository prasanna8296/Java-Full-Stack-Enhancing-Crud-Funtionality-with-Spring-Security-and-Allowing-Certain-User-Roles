import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
// import FooterComponent from "./FooterComponent";

const Layout = () => {
  return (
    <>
      <HeaderComponent />
      <div className="container">
        <Outlet />
      </div>
      {/* <FooterComponent /> */}
    </>
  );
};

export default Layout;
