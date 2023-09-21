import React, { useContext, useState } from "react";
import FormInput from "../Components/FormInput";
import FormButton from "../Components/FormButton";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [values, setValues] = useState({
    UserName: "",
    Password: "",
  });
  const [errors, setErrors] = useState([]);
  const { login } = useContext(AuthContext);

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
      const res = await login(formData);
      setErrors([]);
      navigate("/");
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/" className="bg-gray-500 p-4 flex w-fit items-center rounded">Home</Link>
          </li>
          <li></li>
        </ul>
      </nav> */}

      <div className="flex flex-row items-center justify-center h-full">
        {/* <div className="p-20">
          <img src={"./"} />
        </div> */}

        <div className="flex flex-col gap-5 p-10">
        <h1 className="text-6xl self-center bg-zinc-900 text-zinc-400 w-full h-36 flex items-center justify-center rounded-3xl font-bold p-5">
            Login Form
          </h1>
          <FormInput
            classNames={""}
            label={"Username: "}
            name={"UserName"}
            onChange={onFormChange}
            type={"text"}
            value={values.UserName}
          />
          <FormInput
            classNames={""}
            label={"Password: "}
            name={"Password"}
            onChange={onFormChange}
            type={"password"}
            value={values.Password}
          />
          <div className="flex flex-row items-center justify-evenly">
            <FormButton label={"Login"} onClick={onLoginClick} classNames="bg-blue-500" />
            <FormButton
              label={"Signup"}
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
