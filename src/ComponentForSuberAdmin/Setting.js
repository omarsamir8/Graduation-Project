import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { routes } from "../routes";

function Setting() {
  const [Setting, setSetting] = useState([]);
  const [AllowTrainingRegister, setAllowTrainingRegister] = useState(true);
  const [MaxAllowTrainingToRegister, setMaxAllowTrainingToRegister] =
    useState();
  const [updateStudentLevel, setupdateStudentLevel] = useState(true);
  const [MainSemsterId, setMainSemsterId] = useState("");
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.setting._id}${routes.setting.ViewSetting}?page=1&size=5`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        console.log(response.data);
        setSetting(response.data);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  return (
    <>
      <div className="setting-page">
        <div className="single-setting">
          {/* <div class="form-check form-switch">
            <label class="form-check-label" for="flexSwitchCheckDefault">
              AllowTrainingRegister
            </label>
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div> */}
          <table class="table" style={{width:"80%"}}>
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Rule</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Setting;
