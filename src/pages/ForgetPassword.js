import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
// import { routes } from "../routes";
import Swal from "sweetalert2";

function ForgetPassword() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [email, setemail] = useState("");
  const [myRole, setmyRole] = useState("");
  const sendemail = async () => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/auth/forgetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            email,
            myRole,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Email And Role Sended successfully",
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
              <h1 className="col-12 login_title">Forget Password ?</h1>
              <h1 className="col-12 login_title">Welcom Back ?</h1>
            </div>
            <div className="col-12 labelWithInput">
              <Form.Label className="input_label">Enter Your Email</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Enter Your Email here"
                className="login_input"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <select
                className="form-control mt-3"
                style={{ width: "90%" }}
                aria-label="department"
                name="department"
                onChange={(e) => {
                  setmyRole(e.target.value);
                }}
              >
                <option value="" disabled selected hidden>
                  Select Role
                </option>
                <option value="student">Student</option>
                <option value="instructor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              style={{
                marginTop: "10px",
                width: "90%",
              }}
              className="button"
              onClick={() => {
                sendemail();
              }}
            >
              Send Email
            </button>
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

export default ForgetPassword;
