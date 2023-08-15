import React, { useState } from "react";
import FormInput from "../Components/FormInput";
import FormButton from "../Components/FormButton";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    UserName: "",
    Password: "",
    EmailAddress: "",
  });
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const onFormChange = (e) => {
    e.preventDefault();
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onLoginClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("UserName", values.UserName);
      formData.append("Password", values.Password);
      formData.append("EmailAddress", values.EmailAddress);
      const res = await axios.post("/signup", formData);
      setErrors([]);
      navigate("/login")
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return (
    <>
      <nav className="text-2xl text-white">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li></li>
        </ul>
      </nav>

      <div className="flex flex-row  justify-center h-full">
        {/* <div className="p-20">
          <img src={"./"} />
        </div> */}

        <div className="flex flex-col gap-5 p-10">
          <h1 className="text-6xl self-center bg-zinc-900 text-zinc-400 w-full h-36 flex items-center justify-center rounded-3xl font-bold">
            Sign Up
          </h1>
          <FormInput
            classNames={""}
            label={"Username"}
            name={"UserName"}
            onChange={onFormChange}
            type={"text"}
            value={values.UserName}
          />
          <FormInput
            classNames={""}
            label={"Password"}
            name={"Password"}
            onChange={onFormChange}
            type={"password"}
            value={values.Password}
          />

          <FormInput
            classNames={""}
            label={"Email Address"}
            name={"EmailAddress"}
            onChange={onFormChange}
            type={"email"}
            value={values.EmailAddress}
          />
          <div className="flex flex-row items-center justify-evenly">
            <FormButton label={"SignUp"} onClick={onLoginClick} />
            <FormButton
              label={"Login"}
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
