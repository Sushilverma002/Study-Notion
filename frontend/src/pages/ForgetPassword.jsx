import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/core/HomePage/Button";
import { Link } from "react-router-dom";
const ForgetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);

  return (
    <div>
      {loading ? (
        <div> Loading.....</div>
      ) : (
        <div>
          <h1>{!emailSent ? "Reset your Password." : "Check your Email"}</h1>
          <p>
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form>
            {/* aagar apki email sent nahi hui toh ki ye field dikhe gi */}
            {!emailSent && (
              <label>
                <p>Email Address</p>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </label>
            )}

            <button>{!emailSent ? "Reset Password" : "Resend Email"}</button>
          </form>
          <div>
            <Link to={"/login"}>
              <p>Back to login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
