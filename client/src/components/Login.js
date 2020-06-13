import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const { push } = useHistory();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", formValues)
      .then((res) => {
        console.log(res);
        localStorage.setItem("react-bubbles-token", res.data.payload);
        push("/bubblepage");
      })
      .catch((err) => console.log(err.message, err.response.data.error));
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      {/* <p>Build a login page here</p> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
