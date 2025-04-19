import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { InputField } from "../../../Components/FormElements/InputField/InputField";
import { modalStyle } from "../../../utils/constant";

const AddUserModal = ({
  open,
  handleChange,
  handleSubmit,
  userData,
  handleClose,
  isView,
  formError,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={() => modalStyle(800)}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "10px" }}
        >
          Add User
        </Typography>

        <div className="flex gap-2 items-start mb-5">
          <InputField
            label={"First Name"}
            value={userData.firstname}
            name={"firstname"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter First Name"}
            disabled={isView}
            errorMessage={formError.firstname}
          />
          <InputField
            label={"Last Name"}
            value={userData.lastname}
            name={"lastname"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Last Name"}
            disabled={isView}
            errorMessage={formError.lastname}
          />
        </div>

        <div className="flex gap-2 items-start mb-5">
          <InputField
            label={"Email"}
            value={userData.email}
            name={"email"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Email"}
            disabled={isView}
            errorMessage={formError.email}
          />
          {!isView && (
            <InputField
              label={"Password"}
              value={userData.password}
              name={"password"}
              onChange={handleChange}
              type={"password"}
              placeholder={"Enter Password"}
              disabled={isView}
              errorMessage={formError.password}
            />
          )}
        </div>

        {!isView && (
          <div className="flex justify-end gap-2 mt-5">
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default AddUserModal;
