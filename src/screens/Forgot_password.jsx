// import React from "react";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import Buttons from '../Components/Buttons'
import "../styles/forgot_pass.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Forgot_password = () => {
  const [value, setValue] = useState();
  return (
    <>
      <form>
        <div className="container">
          <div className="login-box">
            <div className="logo-box">
              <img src={logo} className="logo" alt="" />
            </div>
            <div className="text-box">
              <h1>Forgot Password</h1>
            </div>

            <div className="d-flex">
              <PhoneInput
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
              />
            </div>
            <div className="button-box">
<Buttons>Send OTP</Buttons>
</div>
            <div className="ragister">
              <span className="text-muted ">Back to</span>{" "}
              <a href="/signin">Log in</a>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Forgot_password;
