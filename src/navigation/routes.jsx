import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import NotFound from "../screens/NotFound";
import SignIn from "../screens/SignIn";
import Register from "../screens/Register";
import Forgot_password from "../screens/Forgot_password";
import EditProfile from "../screens/EditProfile";
import Analytics from "../screens/Analytics";
import { AccordionDetails } from "@mui/material";
import Pricing from "../screens/Pricing";
import Accountdetails from "../screens/AccountDetails";
import Veiws_profile from "../screens/Veiews_profile";
const NavigationRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<Forgot_password />} />
        <Route path="/editProfile/:id" element={<EditProfile />} />
        <Route path="/account" element={<AccordionDetails />} />

        <Route path="/profile" element={<Accountdetails />} />
        <Route path="/veiews_profile" element={<Veiws_profile />} />

        <Route path="/pricing" element={<Pricing />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
};
export default NavigationRouter;
