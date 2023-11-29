import React from "react";
import { Link } from "react-router-dom";

import "./SignUp.css";

import TextInput from "../UI/common/TextInput";
import PurpleButton from "../UI/common/PurpleButton";
import Logo from "../assets/images/logo.png";

const SignUp = () => {
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
          />
        </div>
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
        <div className="signup-button">
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
