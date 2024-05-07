import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./ScanQr.scss";

function ScanQr() {
  const [scanResults, setScanResults] = useState([]);
  const [names, setNames] = useState([]);

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
      setScanResults((prevResults) => [...prevResults, result]);
    }

    function error(err) {
      console.warn(err);
    }

    return () => {
      Scanner.stop();
    };
  }, []);

  function saveScansToPDF() {
    const pdf = new jsPDF();
    pdf.setFontSize(12);
    pdf.text(20, 20, "Scanned QR Code Data:");

    const tableData = scanResults.map((data, index) => {
      return [data, names[index] || ""];
    });

    const headers = ["Scanned QR Code Data", "Name"];
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
    </div>
  );
}

export default ScanQr;
