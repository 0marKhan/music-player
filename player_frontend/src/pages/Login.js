import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
import { useCookies } from "react-cookie";

import "react-toastify/dist/ReactToastify.css";

import "./Login.css";

import TextInput from "../UI/common/TextInput";
import HiddenPasswordInput from "../UI/common/PasswordInout";
import PurpleButton from "../UI/common/PurpleButton";
import Logo from "../assets/images/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(["token"]);
  const [errorCheck, setErrorCheck] = useState(false);

  // for going to home page after signing up
  const navigate = useNavigate();

  const submitHandler = async () => {
    const data = { email, password };
    try {
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/login",
        data
      );

      if (!response.err) {
        // console.log(response);
        // storing the token generated
        const token = response.token;
        // storing the token in cookies

        // getting the current date
        const date = new Date();
        // setting the date to after 30 days
        date.setDate(date.getDate() + 30);
        // making it so the cookie expires after 30 days
        setCookie("token", token, { path: "/", expires: date });
        navigate("/home");
        setErrorCheck(false);
      } else {
        setErrorCheck(true);
      }
    } catch (error) {
      // console.error("Error during registration:", error);
    }
  };

  const setPasswordHandler = (event) => {
    setPassword(event.target.value);
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
        <div className="login-button">
          <PurpleButton
            onClick={submitHandler}
            variant="contained"
            style={{
              height: "3rem",
            }}
          >
            Login
          </PurpleButton>
        </div>
        {/* change to link later */}

        <div>
          <p>
            <span className="text-with-link">Don't have an account?</span>
            <Link to="sign-up">Sign up to Roam</Link>
          </p>
        </div>
      </div>
      {errorCheck && (
        <div className="error-msg">Incorrect username or password</div>
      )}
    </>
  );
};

export default Login;
