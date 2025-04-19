import React, { useState } from "react";
import Avathar from "../../assets/Avathar/Avathar.jpeg";
import { IoIosArrowDown } from "react-icons/io";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, userState } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../context/SnackbarContext";

const Navbar = () => {
  const { user } = useSelector(userState);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // set the anchor element
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning ";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon ";
    } else {
      return "Good Evening";
    }
  };

  const handleClose = () => {
    setAnchorEl(null); // close menu
  };

  const handleNavigate = () => {
    navigate("/profile");
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    showSnackbar("Logout Successfull");
  };

  return (
    <div className="w-[calc(100vw-300px)] h-[70px] bg-gray-100 rounded-md sticky top-4 border border-1 flex justify-between items-center px-4 py-1">
      <div className="flex flex-col">
        <h4 className="font-semibold text-xl">
          {" "}
          Hello {user?.firstname} {user?.lastname}...
        </h4>
        <p className="font-light text-[12px]">{getGreeting()} !</p>
      </div>
      <div
        className="w-[200px] h-full border border-1 bg-white rounded-xl flex gap-2 items-center px-2 p-1 text-sm cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={Avathar}
          alt="avathar"
          className="w-[50px] h-[50px] rounded-full object-contain "
        />
        <div className="flex flex-col flex-1">
          <p className="font-semibold">{user?.firstname}</p>
          <p className="font-light text-[12px] capitalize">{user?.role}</p>
        </div>
        <IoIosArrowDown size={25} />
      </div>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {user.role !== "admin" && (
          <MenuItem onClick={handleNavigate} sx={{ width: 200 }}>
            Profile
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout} sx={{ width: 200 }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
