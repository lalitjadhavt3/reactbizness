import React, { useEffect, useRef, useState } from "react";
import "../styles/SignIn.css";
import logo from "../assets/logo.png";
import { FaGoogle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Buttons from "../Components/Buttons";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // Simple email validation
    if (!email.includes("@")) {
      alert("Invalid email address")
      errors.email = "Invalid email address";
    }

    // Password validation (add more conditions as needed)
    if (password.length < 8) {
      alert("Password must be at least 8 characters long")
      errors.password = "Password must be at least 8 characters long";
    }

    setErrors(errors);

    // If no errors, proceed with sign-in logic
    if (Object.keys(errors).length === 0) {
      // Your sign-in logic here
      console.log("Sign in successful!");
    }
  };

  const emailRef=useRef(null)
  useEffect(()=>{
if(errors.email){
  emailRef.current.value="";
}
  },[errors.email])
 const passwordRef=useRef(null)
 useEffect(()=>{
  if(errors.password){
    passwordRef.current.value="";
  }
 },[errors.password])
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
        <form onSubmit={handleSubmit}>
          <div className="form-box card">
            <div className="input-group input-wrapper">
              <input
              ref={emailRef}
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className="placeholder">
                Email
              </label>
             
            </div>
            <div className="input-group input-wrapper">
              <input
              ref={passwordRef}
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className="placeholder">
                Password
              </label>
              <a href="#!" className="fa-eye" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </a>
            </div>

            <div className="button-box">
              <Buttons type="submit">Login</Buttons>
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

