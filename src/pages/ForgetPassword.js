import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
// import { routes } from "../routes";
// import Swal from "sweetalert2";

function ForgetPassword() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ height: "200vh" }} className="col-12 login-page">
        <div className="col-12 login-container">
          <div style={{ marginTop: "100px" }} className=" col-12 login">
            <div className="col-12 title">
              <h1 className="col-12 login_title">Forget Password ?</h1>
            </div>
            <div className="col-12 labelWithInput">
              <Form.Label className="input_label">
                Enter Your Phone *
              </Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Your Phone here"
                className="login_input"
              />
            </div>
            <button
              style={{
                // marginLeft: "-100px",
                marginTop: "10px",
                width: "90%",
              }}
              className="button"
            >
              Send Phone
            </button>
            <div className="col-12 labelWithInput">
              <Form.Label className="input_label">Enter Your Code </Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                placeholder="Enter your password here"
                className="login_input"
              />
            </div>
            <button
              style={{
                // marginLeft: "-100px",
                marginTop: "10px",
                width: "90%",
              }}
              className="button"
            >
              Send Code
            </button>
            <div className="col-12 labelWithInput">
              <Form.Label className="input_label">New Password </Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                placeholder="Enter your New password here"
                className="login_input"
              />
            </div>
            <div className="col-12 labelWithInput">
              <Form.Label className="input_label">
                Confirm New Password{" "}
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                placeholder="Confirm Your New Password Here"
                className="login_input"
              />
            </div>
            <button
              style={{ marginTop: "10px", width: "90%" }}
              className="button"
            >
              Change Password
            </button>{" "}
            <a
              href="#forgetpassword"
              style={{ marginTop: "10px" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Back To Login ?
            </a>
          </div>
          <div className="logo">
            <img
              style={{ height: "550px", width: "550px", marginTop: "0px" }}
              src="./assets/images/login_logo.jpg"
              alt=""
              className="login_logo"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
