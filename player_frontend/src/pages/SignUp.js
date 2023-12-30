import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./SignUp.css";

import TextInput from "../UI/common/TextInput";
import HiddenPasswordInput from "../UI/common/PasswordInout";
import PurpleButton from "../UI/common/PurpleButton";
import Logo from "../assets/images/logo.png";

import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);

  // for getting the setCookie function
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(["token"]);

  // for going to home page after signing up
  const navigate = useNavigate();

  // for validations

  const validateEmail = () => {
    const emailPattern = /\S+@\S+\.\S+/;
    const validEmail = emailPattern.test(email);
    setEmailError(!validEmail);
    return validEmail;
  };

  const validateUsername = () => {
    const usernamePattern = /^[a-zA-Z0-9_]{3,}$/;
    const validUsername = usernamePattern.test(username);
    setUsernameError(!validUsername);
    return validUsername;
  };

  const validatePassword = () => {
    const validPassword = password.length >= 7;
    setPasswordError(!validPassword);
    return validPassword;
  };

  const validateEmptyFields = () => {
    const emptyFields = !email || !password || !username;
    setEmptyFieldsError(emptyFields);
    return !emptyFields;
  };

  const submitHandler = async () => {
    if (
      !validateEmptyFields() ||
      !validateEmail() ||
      !validateUsername() ||
      !validatePassword()
    ) {
      return;
    }

    const data = { email, password, username };
    try {
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/register",
        data
      );
      if (response) {
        console.log(response);
        alert("Success");
        // console.log(response);
        // storing the token generated
        const token = response.token;
        // storing the token in cookies

        // getting the current date
        const date = new Date();
        // setting the date to after 30 days
        date.setDate(date.getDate() + 30);
        // making it so the cookie epires after 30 days
        setCookie("token", token, { path: "/", expires: date });
        navigate("/home");
      } else {
        alert("Failure");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error during registration");
    }
  };

  const setPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const setUsernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const setEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  return (
    <>
      <div className="roam-logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="login-form">
        <div className="username-field">
          <TextInput
            id="outlined-basic"
            label="Enter your username"
            variant="outlined"
            style={{ margin: "1.5rem 0rem 0 0rem" }}
            error={usernameError}
            onChange={setUsernameHandler}
            value={username}
          />
          {usernameError && (
            <div className="username-error-msg">
              Username must be at least 3 characters with no symbols
            </div>
          )}
        </div>
        <div className="email-field">
          <TextInput
            id="outlined-basic"
            label="Enter your email"
            variant="outlined"
            style={{ margin: "1.5rem 0rem 0 0rem" }}
            error={emailError}
            onChange={setEmailHandler}
            value={email}
          />
          {emailError && (
            <div className="email-error-msg">Please enter a valid email</div>
          )}
        </div>
        <div className="password-field">
          <HiddenPasswordInput
            id="outlined-basic"
            label="Enter your password"
            variant="outlined"
            style={{ margin: "1.5rem 0rem 0 0rem" }}
            onChange={setPasswordHandler}
            value={password}
            error={passwordError}
          />
          {passwordError && (
            <div className="password-error-msg">
              Password must be at least 7 characters long
            </div>
          )}
        </div>
        <div className="signup-button">
          <PurpleButton
            variant="contained"
            onClick={submitHandler}
            style={{
              height: "3rem",
            }}
          >
            Sign up
          </PurpleButton>
        </div>
        <div>
          <p>
            <span className="text-with-link">Already have an account?</span>
            <Link to="/">Login here</Link>
          </p>
        </div>
      </div>
      {emptyFieldsError && (
        <div className="empty-fields-error-msg">Please fill all fields</div>
      )}
    </>
  );
};

export default SignUp;
