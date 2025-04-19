import React, { useReducer } from "react";
import { FaRegUser, FaUserCog } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineEngineering } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userState } from "../../redux/auth/authSlice";
import { IoTicketOutline } from "react-icons/io5";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(userState);
  
  const { pathname } = location;

  const adminRoutes = [
    {
      name: "Dashboard",
      url: "/",
      icon: <MdOutlineDashboard size={20} />,
    },
    {
      name: "Tickets",
      url: "/tickets",
      icon: <IoTicketOutline size={20} />,
    },
    {
      name: "Users",
      url: "/users",
      icon: <FaRegUser size={20} />,
    },
    {
      name: "Engineers",
      url: "/engineers",
      icon: <MdOutlineEngineering size={20} />,
    },
  ];

  const engineerRoutes = [
    {
      name: "Dashboard",
      url: "/",
      icon: <MdOutlineDashboard size={20} />,
    },
    {
      name: "Tickets",
      url: "/tickets",
      icon: <IoTicketOutline size={20} />,
    },
    {
      name: "Profile",
      url: "/profile",
      icon: <FaUserCog size={20} />,
    },
  ];
  const userRoutes = [
    {
      name: "Dashboard",
      url: "/",
      icon: <MdOutlineDashboard size={20} />,
    },
    {
      name: "Tickets",
      url: "/tickets",
      icon: <IoTicketOutline size={20} />,
    },
    {
      name: "Profile",
      url: "/profile",
      icon: <FaUserCog size={20} />,
    },
  ];

  const SideItems =
    user.role === "admin"
      ? adminRoutes
      : user.role === "engineer"
      ? engineerRoutes
      : userRoutes;

  const handleClick = (url) => {
    navigate(url);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-32px)] w-[250px] bg-gray-100 justify-start items-center m-4 rounded-lg p-4 fixed top-0 left-0 border border-1">
      <h1 className="font-bold font-lexend text-2xl mt-4 mb-3">It Ticket</h1>
      <div className="mt-4 font-medium">
        {SideItems.map((item, index) => (
          <div
            key={index}
            className={`w-full py-2.5 p-5 ${
              item.url == pathname
                ? "text-blue-500 border-l-4 border-l-blue-500 "
                : "bg-gray-100 border-l-4 border-l-gray-100"
            }   flex gap-2 items-center cursor-pointer `}
            onClick={() => handleClick(item.url)}
          >
            <p>{item.icon}</p>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
