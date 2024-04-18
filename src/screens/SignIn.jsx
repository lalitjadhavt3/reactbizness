
import React, { useState } from "react";
import "../styles/SignIn.css";
import logo from "../assets/logo.png";
import { FaGoogle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6"; // Import FaEyeSlash for the hide icon
import Buttons from "../Components/Buttons";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="logo-box">
          <img src={logo} className="logo" alt="" />
        </div>
        <div className="text-box">
          <h1>Sign In</h1>
          <h3 className="alllables">Continue to Business Shelter</h3>
        </div>
        <form>
          <div className="form-box card">
            <div className="input-group input-wrapper">
              <input type="text" id="input" required />
              <label htmlFor="input" className="placeholder">
                Email
              </label>
            </div>
            <div className="input-group input-wrapper">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password type
                id="input"
                required
              />
              <label htmlFor="input" className="placeholder">
                Password
              </label>
              <a href="#!" className="fa-eye" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </a>
            </div>

            <div className="button-box">
              <Buttons>Login</Buttons>
            </div>
          </div>
        </form>

        <Buttons logo={<FaGoogle />}>Login with Google</Buttons>

        <div className="Forgot_pass">
          <a href="/forgot">Forgot your password?</a>
        </div>

        <div className="ragister">
          <span className="text-muted">Don't have an account?</span>{" "}
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

