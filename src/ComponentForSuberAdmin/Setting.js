import axios from "axios";
import { useState, useEffect } from "react";
import { Table, ToggleButton } from "react-bootstrap";
import Swal from "sweetalert2";
import { routes } from "../routes";

function Setting() {
  const [settings, setSettings] = useState([]);
  const [checkedValues, setCheckedValues] = useState({});
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // Fetch setting data
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
        setSettings(response.data.routedescription);
        
        // Initialize checkedValues state with default values
        const initialCheckedValues = {};
        response.data.routedescription.forEach(setting => {
          initialCheckedValues[setting._id] = setting.value === "yes";
        });
        setCheckedValues(initialCheckedValues);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  // Update Settings
  const updateSettings = async () => {
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
            deniedRoutes: checkedValues,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Setting updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });
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

  const handleCheckboxChange = (settingId, checked) => {
    setCheckedValues(prevCheckedValues => ({
      ...prevCheckedValues,
      [settingId]: checked,
    }));
  };

  return (
    <>
      <div className="setting-page">
        <div className="single-setting">
          <Table striped bordered hover className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th style={{ textAlign: "center" }} scope="col">
                  Rule
                </th>
                <th style={{ textAlign: "center" }} scope="col">
                  Value
                </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {settings.map((setting, index) => (
                <tr key={setting._id}>
                  <th scope="row">{index + 1}</th>
                  <td style={{ textAlign: "center" }}>{setting.name}</td>
                  <td style={{ textAlign: "center" }}>{setting.desc}</td>
                  <td>
                    <ToggleButton
                      id={`flexSwitchCheck-${setting._id}`}
                      type="checkbox"
                      variant="outline-primary"
                      checked={checkedValues[setting._id]}
                      onChange={(e) =>
                        handleCheckboxChange(setting._id, e.target.checked)
                      }
                    >
                      {checkedValues[setting._id] ? "Yes" : "No"}
                    </ToggleButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button
            style={{ height: "37px" }}
            type="button"
            className="btn btn-primary"
            onClick={updateSettings}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default Setting;