import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import "./Reports_student.scss";
import Report from "../../ComponentForStudents/Report";

export default function Reports_student() {
  const usenavigate = useNavigate();
  const NavigateToStudent = () => {
    usenavigate("/student");
  };
  return (
    <div className=" col-12 Registered_Courses">
      <img src="./assets/images/benha.png" className="Benha_img" />
      <div className="Title_registered col-4">
        <p className="col-12">
          Faculty of computers and artificial intelligence
        </p>
        <p className="col-12">Benha university</p>
        <p className="col-12">Student code :</p>
        <p className="col-12">Student name :</p>
        <p className="col-12">Level :</p>
        <p className="col-12">Semester :</p>
      </div>
      <img src="./assets/images/bfcai2.jpg" className="BFCAI_img" />
     
      <div className="col-11 Table_courses">
     
        <div className="col-12">
        <div className="Line_div_report"></div>
         <Report number_semester="1"/>
         <Report number_semester="2"/>
        </div>
      </div>

      <div className="col-12 BackToStu_report">
        <Button className="BackToStuBtn" onClick={NavigateToStudent}>
          Back
        </Button>
        <Button className="Print_semester" onClick={window.print}>
          Print
        </Button>
      </div>
    </div>
  );
}
