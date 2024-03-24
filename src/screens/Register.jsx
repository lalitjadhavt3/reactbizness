import React from "react";
import logo from "../assets/logo.png";
import { FaGoogle } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import Buttons from "../Components/Buttons";
import "../styles/register.css";
const Register = () => {
  return (
    <>
      <div className="container">
        <div className="register-box">
          <div className="logo-box">
            <img src={logo} className="logo" alt="" />
          </div>
          <div className="text-box">
            <h1>Sign up</h1>
          </div>
          <form>
            <div className="form-box card">
              <div className="input-group input-wrapper">
                <input type="text" id="input" required></input>
                <label for="input" className="placeholder">
                  Email
                </label>
              </div>
              <div className="input-group input-wrapper ">
                <input type="password" id="input" required></input>

                <label for="input" className="placeholder">
                  Password
                </label>

                <a href="" className="fa-eye">
                  <FaEye />
                </a>
              </div>

              <div className="input-group input-wrapper ">
                <input type="password" required></input>

                <label for="input" className="placeholder">
                  Confirm Password
                </label>

                <a href="" className="fa-eye">
                  <FaEye />
                </a>
              </div>

              <div className="input-group input-wrapper">
                <select
                  name="user_type"
                  id="user_type"
                  className="form-control text user_type Noround commonheight"
                  required=""
                  fdprocessedid="hajeiv"
                >
                  <option value="" selected=""></option>
                  <option value="business"> Business Account</option>
                  <option value="indivitual"> Personal Account</option>
                </select>

                <label htmlFor="input" className="placeholder select-lable">
                  Account Type
                </label>
              </div>

              <div className="button-box">
                <Buttons>Register</Buttons>
              </div>
            </div>
          </form>
          <div className="ragister">
            <span className="text-muted ">Already registered? </span>{" "}
            <a href="/signin">Log in</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
