import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { modalStyle } from "../../../utils/constant";
import { userRequset } from "../../../apis/requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, userState } from "../../../redux/auth/authSlice";
import { InputField } from "../../../Components/FormElements/InputField/InputField";
import { profileUserFormValidation } from "../../../utils/functions/formValidations";
import { useSnackbar } from "../../../context/SnackbarContext";
const emptyValues = {
  firstname: "",
  lastname: "",
  phone: "",
};

const UpdateProfileModal = ({ open, handleClose }) => {
  const { user } = useSelector(userState);
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    phone: user?.phone,
  });
  const [formError, setFormError] = useState({});

  const handleSubmit = async () => {
    const validationError = profileUserFormValidation(formValues);

    if (Object.keys(validationError).length > 0) {
      setFormError(validationError);
      return;
    }
    try {
      const res = await userRequset.post("/auth/update-profile", formValues);
      if (res.data && res.data.success) {
        dispatch(updateProfile(res.data.user));
        handleClose();
        setFormValues({ ...emptyValues });
        showSnackbar(res.data.message);
      }
    } catch (error) {
      console.log(error);
      showSnackbar(error?.response?.data?.message, "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
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
            label={"First Name*"}
            value={formValues.firstname}
            name={"firstname"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter First Name"}
            errorMessage={formError.firstname}
          />
          <InputField
            label={"Last Name*"}
            value={formValues.lastname}
            name={"lastname"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Last Name"}
            errorMessage={formError.lastname}
          />
          {user.role === "engineer" && (
            <InputField
              label={"Phone*"}
              value={formValues.phone}
              name={"phone"}
              onChange={handleChange}
              type={"number"}
              placeholder={"Enter Phone"}
              errorMessage={formError.phone}
            />
          )}
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default UpdateProfileModal;
