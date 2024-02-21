import "../styles/NavBar.css";
import axios from "axios";
import { useState, useEffect } from "react";
function NavBar() {
  const [admininfo, setadmininfo] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://university-system-rosy.vercel.app/Api/admin/getinfo      ",
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
      <div className="nav-bar">
        <div className="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <div className="info">
          <img src="./assets/images/2.png" alt=""></img>
          <div className="details">
            <h3>{admininfo.FullName}</h3>
            <p>{admininfo.role}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;
