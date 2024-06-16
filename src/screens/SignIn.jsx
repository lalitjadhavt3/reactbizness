import React, { useEffect, useRef, useState } from "react";
import "../styles/SignIn.css";
import "../App.css";
import logo from "../assets/logo.png";
import { FaGoogle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { MdOutlineVisibilityOff, MdVisibility } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // Simple email validation
    if (!email) {
      errors.email = "Email is required";
    }

    // Password validation (add more conditions as needed)
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    setErrors(errors);
    console.log("🚀 ~ handleSubmit ~ errors:", errors);

    // If no errors, proceed with sign-in logic
    if (Object.keys(errors).length === 0) {
      try {
        const postData = {
          username: email,
          password: password,
        };

        const response = await api.post("/login.php", postData);
        if (response.data.success) {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("user_id", response.data.user_id);
          navigate("/");
          // Optionally, redirect or update UI to indicate successful login
        } else {
          console.error("Login failed:", response.data.message);
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
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
        <form onSubmit={handleSubmit} style={{ marginBottom: "10%" }}>
          <div className="form-box formCard">
            <FormControl
              variant="outlined"
              style={{ width: "100%", marginTop: "20px" }}>
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="text"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl
              variant="outlined"
              style={{ width: "100%", marginTop: "20px" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end">
                      {showPassword ? (
                        <MdVisibility />
                      ) : (
                        <MdOutlineVisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <div className="button-box">
              {" "}
              <CustomButton
                btnText={"Login"}
                // logoIcon={<FaEye />}
                iconPosition={"start"}
                btnType={"submit"}
              />
            </div>
          </div>
        </form>
        <CustomButton
          btnText={"Login with Google"}
          logoIcon={<FaEye />}
          iconPosition={"start"}
        />
        <div className="Forgot_pass">
          <Link to={"/forgot"}>Forgot your password?</Link>
        </div>

        <div className="ragister">
          <span className="text-muted">Don't have an account?</span>{" "}
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
