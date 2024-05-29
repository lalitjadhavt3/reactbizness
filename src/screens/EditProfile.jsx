import React, { useEffect, useRef, useState } from "react";
import "../styles/EditProfile.css";
import "../App.css";
import logo from "../assets/logo.png";
import { FaCross, FaEdit, FaGoogle, FaWindowClose } from "react-icons/fa";
import { FaEye, FaEyeSlash, FaX } from "react-icons/fa6";
import CustomButton from "../components/CustomButton";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  OutlinedInput,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import { MdOutlineVisibilityOff, MdVisibility } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";
const EditProfile = () => {
  const id = useParams();
  const [errors, setErrors] = useState({});
  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return options;
  };

  const days = generateOptions(1, 31);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((month, index) => (
    <MenuItem key={index + 1} value={index + 1}>
      {month}
    </MenuItem>
  ));

  const handleStateChange = (event) => {
    setState(event.target.value);
  };
  const years = generateOptions(1940, 2024);
  const [isCountryLoading, setIsCountryLoading] = useState(true);
  const [userName, setUserName] = useState("Lalit Jadhav");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [businessName, setBusinessName] = useState("Kaikotech");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [businessType, setBusinessType] = useState();
  const [businessCategory, setBusinessCategory] = useState();
  const [pinCode, setPinCode] = useState();
  const [address, setAddress] = useState();
  const [area, setArea] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountryList(
          countryList.sort((a, b) => a.name.localeCompare(b.name))
        );
        setIsCountryLoading(false);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Fetch list of states for the selected country
  useEffect(() => {
    setIsCountryLoading(true);
    if (country) {
      setState("");
      fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: country }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result?.data?.states);
          const stateList = result?.data?.states?.map((state) => ({
            name: state.name,
            code: state.state_code,
          }));
          setStateList(stateList);
          setIsCountryLoading(false);
        })
        .catch((error) => console.log("error", error));
    }
  }, [country]);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    setState("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {!isCountryLoading ? (
        <div className="container">
          <div
            style={{ position: "fixed", zIndex: "200", right: "4%", top: "2%" }}
          >
            <Header />
          </div>
          <div className="profilebox">
            <Link to={"/"} style={{ marginBottom: "6%", display: "flex" }}>
              <FaX />
            </Link>

            <div className="profilebox-header">
              <div className="imgContainer">
                <img src={logo} alt="profile pic" className="profileImg" />
              </div>
              <div className="profileinfo">
                <h1 className="profileTitle">Profile</h1>
                <p className="profileActiveText">active since 2023-30-2</p>
              </div>
            </div>
            <div className="profileDetails">
              <FormControl className="formControl">
                <label htmlFor="emailId" className="formLabel">
                  Email
                </label>
                <TextField
                  disabled
                  style={{ backgroundColor: "lightgray" }}
                  variant="outlined"
                  id="email"
                  value={"test@gmail.com"}
                  placeholder="Enter Email"
                />
              </FormControl>
              <FormControl className="formControl">
                <label htmlFor="userName" className="formLabel">
                  Name
                </label>
                <TextField
                  variant="outlined"
                  id="userName"
                  value={userName}
                  placeholder="Enter User Name"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </FormControl>
              <div className="formControl">
                <label htmlFor="dob" className="formLabel">
                  DOB
                </label>
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <FormControl style={{ width: "22%" }}>
                    <InputLabel style={{ fontSize: "15px" }} id="day">
                      Date
                    </InputLabel>

                    <Select
                      labelId="day"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      label="Day"
                      inputProps={{
                        name: "day",
                        id: "day-select",
                      }}
                    >
                      <MenuItem aria-label="None" value="" />
                      {days}
                    </Select>
                  </FormControl>
                  <FormControl style={{ width: "33%" }}>
                    <InputLabel style={{ fontSize: "15px" }} id="month">
                      Month
                    </InputLabel>

                    <Select
                      labelId="month"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      label="Month"
                      inputProps={{
                        name: "month",
                        id: "month-select",
                      }}
                    >
                      <MenuItem aria-label="None" value="" />
                      {months}
                    </Select>
                  </FormControl>
                  <FormControl style={{ width: "25%" }}>
                    <InputLabel style={{ fontSize: "15px" }} id="year">
                      Year
                    </InputLabel>

                    <Select
                      labelId="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      label="Year"
                      inputProps={{
                        name: "year",
                        id: "year-select",
                      }}
                    >
                      <MenuItem aria-label="None" value="" />
                      {years}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <FormControl className="formControl">
                <label htmlFor="gender" className="formLabel">
                  Gender
                </label>
                <Select
                  labelId="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  inputProps={{
                    name: "day",
                    id: "day-select",
                  }}
                >
                  <MenuItem aria-label="None" value="" disabled />
                  <MenuItem key={0} value={"Male"}>
                    Male
                  </MenuItem>
                  <MenuItem key={1} value={"Female"}>
                    Female
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl className="formControl">
                <label htmlFor="businessName" className="formLabel">
                  Business Name
                </label>
                <TextField
                  variant="outlined"
                  id="businessName"
                  value={businessName}
                  placeholder="Enter Business Name"
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl className="formControl">
                <label htmlFor="businessType" className="formLabel">
                  Business Type
                </label>
                <Select
                  labelId="businessType"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  inputProps={{
                    name: "day",
                  }}
                >
                  <MenuItem
                    aria-label="Select Business Type"
                    value=""
                    disabled
                    selected
                  >
                    Select Business Type
                  </MenuItem>
                  <MenuItem value="SOLE PROPRIETORSHIP FIRM">
                    SOLE PROPRIETORSHIP FIRM
                  </MenuItem>
                  <MenuItem value="Partnership Firms">
                    Partnership Firms
                  </MenuItem>
                  <MenuItem value="Societies/Association / Clubs">
                    Societies/Association / Clubs
                  </MenuItem>
                  <MenuItem value="Hindu Undivided Family (HUF)">
                    Hindu Undivided Family (HUF)
                  </MenuItem>
                  <MenuItem value="Trusts">Trusts</MenuItem>
                  <MenuItem value="Unincorporated association or body of individuals">
                    Unincorporated association or body of individuals
                  </MenuItem>
                  <MenuItem value="Executors, Administrators and Liquidators">
                    Executors, Administrators and Liquidators
                  </MenuItem>
                  <MenuItem value="Govt. Authorities and Juridical Persons">
                    Govt. Authorities and Juridical Persons
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl className="formControl">
                <label htmlFor="businessCategory" className="formLabel">
                  Business Category
                </label>
                <TextField
                  variant="outlined"
                  id="businessCategory"
                  value={businessCategory}
                  placeholder="Enter Business Category"
                  onChange={(e) => {
                    setBusinessCategory(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl className="formControl">
                <label htmlFor="pincode" className="formLabel">
                  Pincode
                </label>
                <TextField
                  variant="outlined"
                  id="pincode"
                  value={pinCode}
                  placeholder="Enter Pincode"
                  onChange={(e) => {
                    setPinCode(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl className="formControl">
                <label htmlFor="address" className="formLabel">
                  Business Address
                </label>
                <TextField
                  variant="outlined"
                  id="address"
                  value={address}
                  placeholder="Enter Business Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl className="formControl">
                <label htmlFor="area" className="formLabel">
                  Business area
                </label>
                <TextField
                  variant="outlined"
                  id="area"
                  value={area}
                  placeholder="Enter Business area"
                  onChange={(e) => {
                    setArea(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl className="formControl">
                <label htmlFor="businessType" className="formLabel">
                  Country
                </label>
                <Select
                  labelId="Country"
                  value={country}
                  onChange={handleCountryChange}
                  inputProps={{
                    name: "Country",
                  }}
                >
                  <MenuItem
                    aria-label="Select Country"
                    value=""
                    disabled
                    selected
                  >
                    Country
                  </MenuItem>
                  {countryList?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item?.name}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className="formControl">
                <label htmlFor="stateList" className="formLabel">
                  State
                </label>
                <Select
                  labelId="State"
                  value={state}
                  onChange={handleStateChange}
                  inputProps={{
                    name: "State",
                  }}
                >
                  <MenuItem
                    aria-label="Select Country"
                    value=""
                    disabled
                    selected
                  >
                    State
                  </MenuItem>
                  {stateList?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item?.name}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className="formControl">
                <label htmlFor="deliveryOption" className="formLabel">
                  Provide Deliveries
                </label>
                <RadioGroup
                  row
                  aria-labelledby="deliveryOption"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            <CustomButton btnText={"Update"} iconPosition={"start"} />
          </div>
        </div>
      ) : (
        <Loader />
      )}

      <Footer />
    </div>
  );
};

export default EditProfile;
