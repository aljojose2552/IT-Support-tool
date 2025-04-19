import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { modalStyle } from "../../utils/constant";

const DeleteModal = ({ open, handleClose, handleSubmit, label }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={() => modalStyle(400)}>
        <Typography variant="h6" sx={{textAlign:"center"}}>
          Are you sure want to delete this {label}
        </Typography>
        <div className="flex justify-end gap-2 mt-5">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleSubmit}>
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
