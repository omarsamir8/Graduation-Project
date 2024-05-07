import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
// import { routes } from "../routes";
import Swal from "sweetalert2";

function ConfirmPassword() {
  const navigate = useNavigate();
  const { key } = useParams();
  const [password, setpassword] = useState("");
  const [confrimPassword, setconfrimPassword] = useState("");
  console.log(key);
  console.log(password);
  console.log(confrimPassword);
  const resetpassword = async () => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/auth/reset/password/aaa`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key,
            password,
            confrimPassword,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Password Changed successfully",
          showConfirmButton: false,
          timer: 4500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: data.error_Message
            ? data.error_Message[0].message
            : data.message,
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <>
      <div style={{ height: "120vh" }} className="col-12 login-page">
        <div className="col-12 login-container">
          <div className=" col-12 login">
            <div className="col-12 title">
              <h1 className="col-12 login_title">Confirm Password ?</h1>
              <h1 className="col-12 login_title">Welcom Back ?</h1>
            </div>
            <div className="col-12 labelWithInput">
              <Form.Label className="input_label">New Password </Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
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
                name="confrimPassword"
                onChange={(e) => {
                  setconfrimPassword(e.target.value);
                }}
                required
                placeholder="Confirm Your New Password Here"
                className="login_input"
              />
            </div>
            <button
              style={{ marginTop: "10px", width: "90%" }}
              className="button"
              onClick={() => {
                resetpassword();
              }}
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

export default ConfirmPassword;
