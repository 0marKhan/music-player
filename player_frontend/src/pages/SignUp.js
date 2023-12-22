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

  // for getting the setCookie function
  const [cookie, setCookie] = useCookies(["token"]);

  // for going to home page after signing up
  const navigate = useNavigate();

  const submitHandler = async () => {
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
        <img src={Logo} />
      </div>
      <div className="login-form">
        <div className="username-field">
          <TextInput
            id="outlined-basic"
            label="Enter your username"
            variant="outlined"
            style={{ margin: "1.5rem 0rem 0 0rem" }}
            onChange={setUsernameHandler}
            value={username}
          />
        </div>
        <div className="email-field">
          <TextInput
            id="outlined-basic"
            label="Enter your email"
            variant="outlined"
            style={{ margin: "1.5rem 0rem 0 0rem" }}
            onChange={setEmailHandler}
            value={email}
          />
        </div>
        <div className="password-field">
          <HiddenPasswordInput
            id="outlined-basic"
            label="Enter your password"
            variant="outlined"
            style={{ margin: "1.5rem 0rem 0 0rem" }}
            onChange={setPasswordHandler}
            value={password}
          />
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
    </>
  );
};

export default SignUp;
