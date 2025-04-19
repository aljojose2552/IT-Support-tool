import React from "react";
import SideMenu from "../../Components/SideMenu/SideMenu";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full h-screen">
      <SideMenu />
      <div className=" ml-[280px] pt-4 mr-4 rounded-lg">
        <Navbar />
        <div className=" pt-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
