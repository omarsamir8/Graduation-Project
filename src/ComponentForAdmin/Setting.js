import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { routes } from "../routes";
import Swal from "sweetalert2";
import Table from 'react-bootstrap/Table';
function Setting() {
  const [Setting, setSetting] = useState([]);
  const [Allow, setAllow] = useState("No");
  const [ApiUrl, setApiUrl] = useState();
  const [selectedSetting, setselectedSetting] = useState(null);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.setting._id}${routes.setting.ViewSettingAdmin}?page=1&size=5`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        console.log(response.data);
        setSetting(response.data.routedescription);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  // Update Settings
  const UpdateSettings = async () => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/admin/setting/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            Allow,
            ApiUrl,
          }),
        }
      );

      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Setting updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Update the state with the modified student
        // setSetting((prevSettings) =>
        //   prevSettings.map((prevSetting) =>
        //     prevSetting._id === selectedSetting._id
        //       ? {
        //           ...prevSetting,
        //           Allow,
        //           ApiUrl,
        //         }
        //       : prevSetting
        //   )
        // );
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Setting update failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };
  console.log(Allow);
  console.log(ApiUrl);
  console.log(Setting);
  return (
    <>
      <div className="setting-page">
        <div className="single-setting">
          <table class="table" style={{}}>
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th style={{ textAlign: "center" }} scope="col">
                  Rule
                </th>
                <th style={{ textAlign: "center" }} scope="col">
                  Value
                </th>
                <th scope="col">Allow</th>
              </tr>
            </thead>
            <tbody>
              {Setting.map((setting, index) => {
                return (
                  <tr key={setting._id}>
                    <th scope="row">{index + 1}</th>
                    <td style={{ textAlign: "center" }}>{setting.name}</td>
                    <td style={{ textAlign: "center" }}>{setting.desc}</td>
                    <td>True</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Table example */}
        
      </div>
    </>
  );
}
export default Setting;
// #282a36