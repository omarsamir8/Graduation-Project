import { Button } from "react-bootstrap";
import testimg from "../assets/55.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
function Attendece() {
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [qr, setqr] = useState("");

  const fetchStudentQR = async () => {
    try {
      const response = await axios.get(
        `https://university-mohamed.vercel.app/Api/students/get/qr`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);
      setqr(response.data.url);
      // Log the updated state
    } catch (error) {
      console.error("Error fetching student info:", error);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }} className="department">
        <h3>Genrate Attendece QR</h3>
        <Button
          style={{
            background: "#996ae4",
            borderColor: "#996ae4",
            width: "200px",
            borderRadius: "10px",
            padding: "10px 0",
          }}
          onClick={() => {
            fetchStudentQR();
          }}
        >
          Generate
        </Button>
        <img
          style={{
            width: "200px",
            display: "block",
            margin: "30px auto",
            height: "180px",
          }}
          src={qr ? qr : "Loading"}
          alt=""
        ></img>
      </div>
    </>
  );
}
export default Attendece;
