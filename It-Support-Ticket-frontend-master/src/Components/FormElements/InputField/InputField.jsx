import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const InputField = ({
  label,
  value,
  name,
  onChange,
  type,
  isLogin,
  placeholder,
  disabled,
  errorMessage,
  ...rest
}) => {
  // const [isShow, setIsShow] = useState<boolean>(true)
  const [passwordType, setpasswordType] = useState(type);
  const handleShowPassword = () => {
    if (passwordType === "password") {
      setpasswordType("text");
    } else {
      setpasswordType("password");
    }
  };
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor="" className="">
            {label}
          </label>
        )}
        <div
          className={`flex gap-2 bg-gray-100 w-full h-[40px] items-center rounded-md px-2 py-1 ${errorMessage && "border border-red-500"}`}
        >
          <input
            className="outline-none w-full text-sm bg-gray-100"
            type={type === "password" ? passwordType : type}
            name={name}
            id=""
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
          />
          {type == "password" && (
            <div className="cursor-pointer" onClick={handleShowPassword}>
              {passwordType === "password" ? (
                <AiFillEye size={22} />
              ) : (
                <AiFillEyeInvisible size={22} />
              )}
            </div>
          )}
        </div>
        {errorMessage && (
          <p className="text-[12px] text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};
