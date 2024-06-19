import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { routes } from "../routes";
import Swal from "sweetalert2";
import TitleAnimation from "../Loader/TitleAnimation";

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [Student_Code, setStudent_Code] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");
  const [type, settype] = useState("");
  const [name, setname] = useState("");
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken"); // تم إضافة حالة التحميل

  useEffect(() => {
    if (type === "student") {
      setname(Student_Code);
    } else if (type === "doctor" || type === "admin") {
      setname(email);
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
    setLoading(true); // بدء التحميل عند الضغط على زر تسجيل الدخول
    if (type === "student") {
      handleLoginForStudent();
      console.log("this login for students");
    } else if (type === "doctor") {
      handleLoginforDoctor();
      console.log("this login for doctors");
    } else if (type === "admin") {
      handleLoginforadmin();
      console.log("this login for admins and superadmins");
    } else {
      console.log("you must select type");
      setLoading(false); // إيقاف التحميل إذا لم يتم تحديد النوع
    }
  };

  const handleLoginForStudent = async () => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.student._id}${routes.student.login}`,
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
        setTimeout(() => {
          setLoading(false);
          navigate("/student");
        }, 1500); // التوجيه بعد 1.5 ثانية
      } else {
        setLoading(false);
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
      setLoading(false); // إيقاف التحميل عند حدوث خطأ
    }
  };

  const handleLoginforDoctor = async () => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.instructor._id}${routes.instructor.login}`,
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
        setTimeout(() => {
          setLoading(false);
          navigate("/doctor");
        }, 1500); // التوجيه بعد 1.5 ثانية
      } else {
        setLoading(false);
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
      setLoading(false); // إيقاف التحميل عند حدوث خطأ
    }
  };

  const handleLoginforadmin = async () => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.login}`,
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

      if (response.ok && data.role === "admin") {
        setTimeout(() => {
          setLoading(false);
          navigate("/admin");
        }, 1500); // التوجيه بعد 1.5 ثانية
      } else if (response.ok && data.role === "superAdmin") {
        setTimeout(() => {
          setLoading(false);
          navigate("/superadmin");
        }, 1500); // التوجيه بعد 1.5 ثانية
      } else {
        setLoading(false);
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
      setLoading(false); // إيقاف التحميل عند حدوث خطأ
    }
  };

  if (loading) {
    return <TitleAnimation />;
  }

  return (
    <>
      <div className="col-12 login-page">
        <div className="col-12 login-container">
          <div className="col-12 login">
            <div className="col-12 title">
              <h1 className="col-12 login_title">Login</h1>
              <h1 className="col-12 login_title">Welcome back!</h1>
            </div>

            <div className="kind">
              <label className="col-12">Login as...</label>
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
              <Form.Label className="input_label">
                Email or code <span className="required">*</span>
              </Form.Label>
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
              <Form.Label className="input_label">
                Password <span className="required">*</span>
              </Form.Label>
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

            <p style={{ fontSize: "15px", color: "red" }} className="error">
              {message}
            </p>
            <a
              href="#forgetpassword"
              onClick={() => {
                navigate("/forgetpassword");
              }}
            >
              Forget Password?
            </a>
            <button className="button" onClick={check}>
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
