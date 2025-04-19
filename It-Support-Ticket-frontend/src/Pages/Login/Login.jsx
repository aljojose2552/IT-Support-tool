import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../Components/FormElements/InputField/InputField";
import { publicRequest } from "../../apis/requestMethods";
import AuthImage from "../../assets/images/AuthImage.png";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/auth/authSlice";
import { loginFormValidation } from "../../utils/functions/formValidations";
import { useSnackbar } from "../../context/SnackbarContext";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const validationError = loginFormValidation(user);
    if (Object.keys(validationError).length > 0) {
      setFormError(validationError);
      return;
    }
    try {
      const response = await publicRequest.post("/auth/login", user);
      console.log(response);

      if (response.data.success) {
        dispatch(
          loginSuccess({ user: response.data.user, token: response.data.token })
        );
        showSnackbar("Login Successfully");

        navigate("/");
      } else {
      }
    } catch (error) {
      showSnackbar(error?.response?.data?.message, "error");
      // console.log();
    }
  };

  return (
    <div className="w-full h-screen flex gap-10 items-center bg-blue-100 p-5 ">
      <div className="flex-1 flex justify-center ">
        <div className="w-[65%] h-[80vh] rounded-2xl overflow-hidden">
          <img
            src={AuthImage}
            alt="Login Image"
            className="w-full h-full object-cover "
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="w-[500px] h-auto p-7 bg-white rounded-lg shadow-md">
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold">Login Here</h1>
          </div>

          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <InputField
              name={"email"}
              onChange={handleChange}
              value={user.email}
              type={"text"}
              placeholder={"Enter Email"}
              errorMessage={formError.email}
            />
            <InputField
              name={"password"}
              onChange={handleChange}
              value={user.password}
              type={"password"}
              placeholder={"Enter Password"}
              errorMessage={formError.password}
            />
            <button className="mt-5 bg-blue-600 w-full h-[35px] text-white rounded-md">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
