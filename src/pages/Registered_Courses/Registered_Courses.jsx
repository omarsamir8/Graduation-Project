import { Button } from "react-bootstrap";
import "./Registered_Courses.scss";
import Table from 'react-bootstrap/Table';
import 'jspdf-autotable';
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
export default function Registered_Courses() {
  const usenavigate=useNavigate();
  const NavigateToStudent=()=>{
    usenavigate("/student")
  }


  return (
    <>
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
      <div className="Line_div"></div>
      <Table striped bordered hover size="md" className="col-12">
     
      <thead>
        <tr>
          <th>#</th>
          <th>Course Name</th>
          <th>Number Of Hours</th>
         
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>OOP</td>
          <td>3</td>
         
        </tr>
        <tr>
          <td>2</td>
          <td>Datastructure</td>
          <td>3</td>
          
        </tr>
        <tr>
          <td>3</td>
          <td>Information system</td>
          <td>3</td>
        </tr>
      </tbody>
    </Table>
   
      </div>
    
      <div className="col-12 BackToStu">
      <Button className="BackToStuBtn" onClick={NavigateToStudent}>Back</Button>
      <Button className="Print_semester" onClick={window.print}>Print</Button>
      </div>
    </div>
    
      </>
  );
}
