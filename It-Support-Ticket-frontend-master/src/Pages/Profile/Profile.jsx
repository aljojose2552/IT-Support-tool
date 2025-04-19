import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import Avathar from "../../assets/Avathar/Avathar.jpeg";
import { useSelector } from "react-redux";
import { userState } from "../../redux/auth/authSlice";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { useState } from "react";
import ResetPasswordModal from "./ResetPasswordModal/ResetPasswordModal";
import UpdateProfileModal from "./UpdateProfileModal/UpdateProfileModal";

const Profile = () => {
  const { user } = useSelector(userState);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [updateProfileModal, setUpdateProfileModal] = useState(false);

  return (
    <div className="w-full h-auto py-5 flex justify-between items-end">
      <div className="flex gap-5 items-start">
        <img
          src={Avathar}
          alt="Profile pic"
          className="w-[120px] h-[120px] rounded-md"
        />
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-semibold">
            {user.firstname} {user.lastname}
          </h4>
          {user.role === "engineer" && (
            <p className="flex gap-2 items-center">
              <IoBriefcaseOutline size={22} />
              {user.department}
            </p>
          )}
          {user.role === "engineer" && (
            <p className="flex gap-2 items-center">
              <LuPhone size={22} />
              {user.phone}
            </p>
          )}

          <p className="flex gap-2 items-center">
            <MdOutlineEmail size={22} />
            {user.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => setUpdateProfileModal(true)}
        >
          Edit Profile
        </Button>
        <Button
          variant="contained"
          startIcon={<LockResetIcon />}
          onClick={() => setResetModalOpen(true)}
        >
          Reset Password
        </Button>
      </div>
      <ResetPasswordModal
        handleClose={() => setResetModalOpen(false)}
        open={resetModalOpen}
      />
      <UpdateProfileModal
        handleClose={() => setUpdateProfileModal(false)}
        open={updateProfileModal}
        // fetchData={}
      />
    </div>
  );
};

export default Profile;
