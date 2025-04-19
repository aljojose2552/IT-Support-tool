import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import SelectBoxField from "../../../Components/FormElements/SelectBoxField/SelectBoxField";
import { InputField } from "../../../Components/FormElements/InputField/InputField";
import axios from "axios";
import { userRequset } from "../../../apis/requestMethods";
import { departmentOptions, modalStyle } from "../../../utils/constant";

const AddEngineerModal = ({
  open,
  handleChange,
  handleSubmit,
  engineerData,
  handleClose,
  isView,
  formError,
}) => {
  // console.log(isView);

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
          Add Engineer
        </Typography>

        <div className="flex gap-2 items-start mb-5">
          <InputField
            label={"First Name*"}
            value={engineerData.firstname}
            name={"firstname"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter First Name"}
            disabled={isView}
            errorMessage={formError.firstname}
          />
          <InputField
            label={"Last Name*"}
            value={engineerData.lastname}
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
            label={"Phone Number*"}
            value={engineerData.phone}
            name={"phone"}
            onChange={handleChange}
            type={"number"}
            placeholder={"Enter Phone Number"}
            disabled={isView}
            errorMessage={formError.phone}
          />
          <SelectBoxField
            label={"Department*"}
            value={engineerData.department}
            onChange={handleChange}
            name="department"
            options={departmentOptions}
            disabled={isView}
            errorMessage={formError.department}
          />
        </div>

        <div className="flex gap-2 items-start mb-5">
          <InputField
            label={"Email*"}
            value={engineerData.email}
            name={"email"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Email"}
            disabled={isView}
            errorMessage={formError.email}
          />
          {!isView && (
            <InputField
              label={"Password*"}
              value={engineerData.password}
              name={"password"}
              onChange={handleChange}
              type={"password"}
              placeholder={"Enter Password"}
              disabled={isView}
              errorMessage={formError.password}
            />
          )}
        </div>
        <div className="flex gap-2 items-start mb-5">
          <InputField
            label={"Designation*"}
            value={engineerData.designation}
            name={"designation"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Designation "}
            disabled={isView}
            errorMessage={formError.designation}
          />
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

export default AddEngineerModal;
