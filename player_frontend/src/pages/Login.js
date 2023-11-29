import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

import TextInput from "../UI/common/TextInput";
import PurpleButton from "../UI/common/PurpleButton";
import Logo from "../assets/images/logo.png";

const Login = () => {
  return (
    <>
      <div className="roam-logo">
        <img src={Logo} />
      </div>
      <div className="login-form">
        <div className="email-field">
          <TextInput
            id="outlined-basic"
            label="Enter your email"
            variant="outlined"
            style={{ margin: "1.5rem 0rem 0 0rem" }}
          />
        </div>
        <div className="password-field">
          <TextInput
            id="outlined-basic"
            label="Enter your password"
            variant="outlined"
            style={{ margin: "1.5rem 0rem 0 0rem" }}
          />
        </div>
        <div className="login-button">
          <Link to="home">
            <PurpleButton
              variant="contained"
              style={{
                width: "25rem",
                height: "3rem",
                "@media (maxWidth: 415px)": {
                  width: "20rem",
                },
              }}
            >
              Login
            </PurpleButton>
          </Link>
        </div>
        {/* change to link later */}
        <div className="forgot-password">
          <a href="www.google.com">Forgot your password?</a>
        </div>
        <div>
          <p>
            <span className="text-with-link">Don't have an account?</span>
            <Link to="sign-up">Sign up to Roam</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
