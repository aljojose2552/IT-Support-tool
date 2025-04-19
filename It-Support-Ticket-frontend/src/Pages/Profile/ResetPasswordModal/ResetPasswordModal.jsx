import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { modalStyle } from "../../../utils/constant";
import { InputField } from "../../../Components/FormElements/InputField/InputField";
import { userRequset } from "../../../apis/requestMethods";
import { validateResetPasswordForm } from "../../../utils/functions/formValidations";
import { useSnackbar } from "../../../context/SnackbarContext";

const emptyFields = {
  oldpassword: "",
  newpassword: "",
};
const ResetPasswordModal = ({ open, handleClose }) => {
  const { showSnackbar } = useSnackbar();
  const [formValues, setFormValues] = useState({
    ...emptyFields,
  });
  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const validationError = validateResetPasswordForm(formValues);

    if (Object.keys(validationError).length > 0) {
      setFormError(validationError);
      return;
    }
    try {
      const res = await userRequset.post("/auth/reset-password", formValues);
      if (res.data && res.data.success) {
        handleClose();
        setFormValues({
          ...emptyFields,
        });
        showSnackbar(res.data.message);
      }
    } catch (error) {
      console.log(error);
      showSnackbar(error?.response?.data?.message, "error");
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={() => modalStyle(400)}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "10px" }}
        >
          Reset Password
        </Typography>
        <div className="flex flex-col gap-5">
          <InputField
            label={"Old Password*"}
            value={formValues.oldpassword}
            name={"oldpassword"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Old Password"}
            errorMessage={formError.oldpassword}
          />
          <InputField
            label={"New Password*"}
            value={formValues.newpassword}
            name={"newpassword"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter New Password"}
            errorMessage={formError.newpassword}
          />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Reset
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ResetPasswordModal;
