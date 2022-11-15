import React, { useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";

import { useNavigate, NavLink } from "react-router-dom";
const Register = () => {
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
    password: "",
    role: "USER"
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const postUser = async()=>{
    console.log(user)
    try{
      const response = await axios.post("/user", user)
      const data = response.data;
      console.log("User Data " ,data);
    }
    catch(err){
      alert("Failed")
    }
  }

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      error.firstName = "First Name is required";
    }
    if (!values.lastName) {
      error.lastName = "Last Name is required";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }if (!values.dob) {
      error.dob = "DOB is required";
    }if (!values.gender) {
      error.gender = "Gender is required";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    return error;
  };
  const signupHandler = (e) => {
    console.log(user);
    e.preventDefault();
    let error = validateForm(user);
    setFormErrors(error);
    console.log(Object.keys(error).length);
    if(Object.keys(error).length==0){
      postUser();
      // console.log("post");
    }
  };

  return (
    <>
      <div className={registerstyle.register}>
        <form>
          <h1>Create your account</h1>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            onChange={(e)=>{changeHandler(e)}}
            value={user.firstName}
          />
          <p className={basestyle.error}>{formErrors.fname}</p>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            onChange={(e)=>{changeHandler(e)}}
            value={user.lastName}
          />
          <p className={basestyle.error}>{formErrors.lname}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e)=>{changeHandler(e)}}
            value={user.email}
          />
          <p className={basestyle.error}>{formErrors.email}</p>
          <input
            type="date"
            name="dob"
            id="dob"
            placeholder="DOB"
            onChange={(e)=>{changeHandler(e)}}
            value={user.dob}
          />
          <p className={basestyle.error}>{formErrors.dob}</p>
          <input
            type="text"
            name="gender"
            id="gender"
            placeholder="Gender"
            onChange={(e)=>{changeHandler(e)}}
            value={user.gender}
          />
          <p className={basestyle.error}>{formErrors.gender}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e)=>{changeHandler(e)}}
            value={user.password}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <button className={basestyle.button_common} onClick={signupHandler}>
            Register
          </button>
        </form>
        <NavLink to="/login">Already registered? Login</NavLink>
      </div>
    </>
  );
};
export default Register;
