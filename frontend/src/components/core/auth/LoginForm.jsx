import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = () => {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = FormData;
  return (
    <form
      onClick={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label>
        <p className="wb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address<sup className="text-pink-200">*</sup>
        </p>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleOnChange}
          required
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px]  text-richblack-5"
        />
      </label>
      <label className="relative">
        <p className="wb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          password<sup className="text-pink-200">*</sup>
        </p>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={handleOnChange}
          required
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 pr-12 p-[12px]  text-richblack-5"
        />

        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
      </label>
    </form>
  );
};

export default LoginForm;
