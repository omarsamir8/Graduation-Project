import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [Student_Code, setStudent_Code] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");
  const [type, settype] = useState("");
  const [name, setname] = useState("");

  useEffect(() => {
    // تحديث قيمة name عندما يتغير نوع المستخدم
    if (type === "student") {
      setname(Student_Code);
    } else if (type === "doctor" || type === "admin") {
      setname(email);
      // قد تحتاج إلى استخدام قيمة البريد الإلكتروني هنا
    }
  }, [type, Student_Code, email]);

  const type2 = (e) => {
    if (type === "student") {
      setStudent_Code(e.target.value);
    } else if (type === "doctor" || type === "admin") {
      setemail(e.target.value);
    }
  };

  const check = () => {
    if (type === "student") {
      handleLoginForStudent();
      console.log("this login for students");
    } else if (type === "doctor") {
      handleLoginforDoctor();
      console.log("this login for doctors");
    } else if (type === "admin") {
      handleLoginforadmin();
      console.log("this login for admin");
    } else {
      console.log("you must select type");
    }
  };

  const handleLoginForStudent = async () => {
    try {
      const response = await fetch(
        "https://university-system-dmg7.onrender.com/Api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Student_Code, password }),
        }
      );
      const data = await response.json();
      console.log(data);

      localStorage.setItem("accesstoken", data.accessToken);
      localStorage.setItem("refreshtoken", data.refreshToken);

      if (response.ok) {
        // If login is successful, navigate to the "/student" page
        navigate("/student");
      } else {
        setmessage(data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLoginforDoctor = async () => {
    try {
      const response = await fetch(
        "https://university-system-dmg7.onrender.com/Api/Instructor/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      console.log(data);

      localStorage.setItem("accesstoken", data.accessToken);
      localStorage.setItem("refreshtoken", data.refreshToken);

      if (response.ok) {
        // If login is successful, navigate to the "/doctor" page
        navigate("/doctor");
      } else {
        setmessage(data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLoginforadmin = async () => {
    try {
      const response = await fetch(
        "https://university-system-dmg7.onrender.com/Api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      console.log(data);

      localStorage.setItem("accesstoken", data.accessToken);
      localStorage.setItem("refreshtoken", data.refreshToken);

      if (response.ok) {
        // If login is successful, navigate to the "/admin" page
        navigate("/admin");
      } else {
        setmessage(data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <>
      <div className="col-12 login-page">
        <div className="col-12 login-container">
          <div className=" col-12 login">
            <div className="col-12">
              <h1 className="col-12 login_title">Login</h1>
              <h1 className="col-12 login_title">Welcome back !</h1>
            </div>

            {/* <div className="inputs col-12"> */}
            {/* <h4>Login As .......</h4> */}
            {/* <p className="col-12">Enter Your Account Details</p> */}
            <div className="kind">
              <label className="col-12">Login As...</label>
              <div className="col-12 radio_inputs">
                <input
                  type="radio"
                  name="kind"
                  className="student"
                  value="student"
                  onChange={(e) => {
                    settype(e.target.value);
                  }}
                />
                Student
                <input
                  type="radio"
                  name="kind"
                  value="doctor"
                  onChange={(e) => {
                    settype(e.target.value);
                  }}
                />
                Doctor
                <input
                  type="radio"
                  name="kind"
                  value="admin"
                  onChange={(e) => {
                    settype(e.target.value);
                  }}
                />
                Admin
              </div>
            </div>
            <div className="col-12 labelWithInput">
              <Form.Label className="input_label">email or code *</Form.Label>
              <Form.Control
                type="text"
                name={name}
                value={name}
                onChange={type2}
                required
                placeholder="Enter email or code here"
                className="login_input"
              />
            </div>
            <div className="col-12 labelWithInput">
              <Form.Label className="input_label">password *</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                required
                placeholder="Enter your password here"
                className="login_input"
              />
            </div>

            <p className="error">{message.message}</p>
            <a href="#forgetpassword">Forget Password?</a>
            {/* </div> */}
            <button to="/student" className="button" onClick={check}>
              Login
            </button>
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

export default Login;
