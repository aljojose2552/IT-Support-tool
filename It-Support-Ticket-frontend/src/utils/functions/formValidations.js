const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;

export const loginFormValidation = (user) => {
  const error = {};
  if (!user.email) {
    error.email = "Please fill Email";
  } else if (!emailRegex.test(user.email)) {
    error.email = "Please enter a valid email address";
  }

  if (!user.password) {
    error.password = "Please fill password";
  }

  return error;
};

export const addTicketForValidation = (data) => {
  const error = {};

  if (!data.title) {
    error.title = "Please fill Title";
  } else if (data.title.length < 3) {
    error.title = "Title atleast 3 characters";
  }

  if (!data.department) {
    error.department = "Please Select Department";
  }

  return error;
};

export const addUserFormValidation = (user) => {
  const error = {};
  if (!user.firstname?.trim()) {
    error.firstname = "Please enter First Name";
  }

  if (!user.lastname?.trim()) {
    error.lastname = "Please enter Last Name";
  }

  if (!user.email?.trim()) {
    error.email = "Please enter Email";
  } else if (!emailRegex.test(user.email)) {
    error.email = "Please enter a valid Email";
  }

  if (!user.password?.trim()) {
    error.password = "Please enter Password";
  } else if (user.password.length < 6) {
    error.password = "Password must be at least 6 characters";
  }

  return error;
};

export const profileUserFormValidation = (user) => {
  const error = {};
  if (!user.firstname?.trim()) {
    error.firstname = "Please enter First Name";
  }

  if (!user.lastname?.trim()) {
    error.lastname = "Please enter Last Name";
  }

  if (!user.phone?.trim()) {
    error.phone = "Please enter Phone Number";
  } else if (!phoneRegex.test(user.phone)) {
    error.phone = "Phone number must be 10 digits";
  }
  return error;
};

export const validateEngineerForm = (user) => {
  const error = {};
  if (!user.firstname?.trim()) {
    error.firstname = "Please enter First Name";
  }

  if (!user.lastname?.trim()) {
    error.lastname = "Please enter Last Name";
  }

  if (!user.phone?.trim()) {
    error.phone = "Please enter Phone Number";
  } else if (!phoneRegex.test(user.phone)) {
    error.phone = "Phone number must be 10 digits";
  }

  if (!user.department?.trim()) {
    error.department = "Please select a Department";
  }

  if (!user.email?.trim()) {
    error.email = "Please enter Email";
  } else if (!emailRegex.test(user.email)) {
    error.email = "Please enter a valid Email";
  }

  if (!user.password?.trim()) {
    error.password = "Please enter Password";
  } else if (user.password.length < 6) {
    error.password = "Password must be at least 6 characters";
  }

  if (!user.designation?.trim()) {
    error.designation = "Please enter Designation";
  }

  return error;
};

export const validateResetPasswordForm = (form) => {
  const errors = {};

  if (!form.oldpassword?.trim())
    errors.oldpassword = "Old password is required";
  if (!form.newpassword?.trim())
    errors.newpassword = "New password is required";

  return errors;
};
