import "../styles/Poster.css";
import axios from "axios";
import { useState, useEffect } from "react";
function Poster(props) {
  const [admininfo, setadmininfo] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://university-lyart.vercel.app/Api/admin/getinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setadmininfo(response.data.user);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  return (
    <>
      <div className="poster">
        <div>
          <p className="p1">September ,2024</p>
          <h2>Welcom Back, {admininfo.FullName} !</h2>
          <p className="p2">Alwayes Stay Updated In Your Student Portal</p>
        </div>
        <img
          src="./assets/images/student.png"
          className="studentt"
          alt=""
        ></img>
      </div>
    </>
  );
}
export default Poster;
