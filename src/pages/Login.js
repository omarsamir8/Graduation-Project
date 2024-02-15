import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

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
      <div className="login-page">
        <div className="login-container">
          <div className="login">
            <div className="Title">
              <h2>Login</h2>
              <p>Enter Your Account Details</p>
            </div>
            <div className="inputs">
              <h4>Login As .......</h4>
              <div className="kind">
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
              <input
                type="Text"
                placeholder="Enter Your Code Or Email"
                name={name}
                required
                value={name}
                onChange={type2}
              />
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                required
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />{" "}
              <p className="error">{message.message}</p>
              <a href="#forgetpassword">Forget Password?</a>
            </div>
            <button to="/student" className="button" onClick={check}>
              Login
            </button>
          </div>
          <div className="logo">
            <img src="./assets/images/login.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
