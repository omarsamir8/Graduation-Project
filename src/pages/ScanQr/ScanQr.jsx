import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./ScanQr.scss";
import Swal from "sweetalert2";
import { Table } from "react-bootstrap";

function ScanQr() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [scanResults, setScanResults] = useState([]);
  const [names, setNames] = useState([]);
  const [data1, setdata1] = useState("");

  useEffect(() => {
    const Scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    Scanner.render(success, error);

    function success(result) {
      setScanResults((prevResults) => [...[prevResults], result]);
      setdata1(result.replace(/[""]/g, ""));
    }

    function error(err) {
      console.warn(err);
    }

    return () => {
      Scanner.stop();
    };
  }, []);
  console.log(scanResults);
  // get qr data
  const GetQrCodeData = async () => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/instructors/scann/qr`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            data1,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setScanResults(data.result.student);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "QR CODE DATA DONE SUCCESSFULLY",
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
  console.log(typeof scanResults);
  console.log(scanResults);
  // save pdf
  function saveScansToPDF() {
    const pdf = new jsPDF();
    pdf.setFontSize(12);
    pdf.text(20, 20, "Scanned QR Code Data:Attendence");

    const tableData = [scanResults.Full_Name, scanResults.Student_Code];

    const headers = ["Name", "Student Code"];
    const tableConfig = {
      startY: 30,
      head: [headers],
    };

    pdf.autoTable({
      ...tableConfig,
      body: tableData,
    });

    pdf.save("qr_scan_data.pdf");
  }
  return (
    <div className="ScanQr">
      <h1>QR Code Scanner</h1>

      <div style={{ display: "flex", gap: "50px", justifyContent: "center" }}>
        {" "}
        <button
          style={{
            marginBottom: "10px",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
          }}
          onClick={saveScansToPDF}
        >
          Download PDF
        </button>
        <button
          style={{
            marginBottom: "10px",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
          }}
          onClick={() => {
            GetQrCodeData();
          }}
        >
          Get Qr Data
        </button>
      </div>

      {scanResults.length > 0 ? (
        <div>
          {scanResults.map((result, index) => (
            <div className="camera" key={index}>
              Success: <a href={"http://" + result}>{result}</a>
              {/* <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => {
                  const updatedNames = [...names];
                  updatedNames[index] = e.target.value;
                  setNames(updatedNames);
                }}
              /> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="camera" id="reader"></div>
      )}
      <Table striped bordered hover className="table mt-3">
        <thead>
          <tr>
            <th className="doctorInfo" scope="col">
              FullName
            </th>
            <th className="doctorInfo" scope="col">
              Student_code
            </th>
          </tr>
        </thead>
        <tbody>
          <>
            {}
            <tr>
              <td className="doctorInfo">{scanResults.Full_Name}</td>
              <td className="doctorInfo">{scanResults.Student_Code}</td>
            </tr>
          </>
        </tbody>
      </Table>
    </div>
  );
}

export default ScanQr;



       