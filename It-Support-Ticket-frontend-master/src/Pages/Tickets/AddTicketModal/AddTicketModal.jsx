import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { InputField } from "../../../Components/FormElements/InputField/InputField";
import {
  departmentOptions,
  modalStyle,
  statusOptions,
} from "../../../utils/constant";
import SelectBoxField from "../../../Components/FormElements/SelectBoxField/SelectBoxField";
import { useSelector } from "react-redux";
import { userState } from "../../../redux/auth/authSlice";

const AddTicketModal = ({
  open,
  handleChange,
  handleSubmit,
  handleStatusUpdate,
  ticketData,
  handleClose,
  isView,
  formError
}) => {
  const { user } = useSelector(userState);
  const [status, setStatus] = useState("In Progress");
  
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
          {user.role === "engineer" ? "Update Status" : " Add Ticket"}
        </Typography>
        {user.role === "engineer" ? (
          <div className="flex gap-2 items-center mb-5">
            <SelectBoxField
              label={"Status*"}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              name="status"
              options={statusOptions}
              // disabled={isView}
            />
          </div>
        ) : (
          <>
            <div className="flex gap-2 items-start mb-5">
              <InputField
                label={"Title*"}
                value={ticketData.title}
                name={"title"}
                onChange={handleChange}
                type={"text"}
                placeholder={"Enter Title"}
                disabled={isView}
                errorMessage={formError.title}
              />
              <InputField
                label={"Description"}
                value={ticketData.description}
                name={"description"}
                onChange={handleChange}
                type={"text"}
                placeholder={"Enter Description"}
                disabled={isView}
              />
            </div>
            <div className="flex gap-2 items-center mb-5">
              <SelectBoxField
                label={"Department*"}
                value={ticketData.department}
                onChange={handleChange}
                name="department"
                options={departmentOptions}
                disabled={isView}
                errorMessage={formError.department}
              />
            </div>
          </>
        )}
        {!isView && (
          <div className="flex justify-end gap-2 mt-5">
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                user.role === "engineer"
                  ? handleStatusUpdate(status)
                  : handleSubmit()
              }
            >
              Submit
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default AddTicketModal;
