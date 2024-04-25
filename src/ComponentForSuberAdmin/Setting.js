import axios from "axios";
import { useState, useEffect } from "react";
import { routes } from "../routes";
import Swal from "sweetalert2";
import { Table } from "react-bootstrap";

function Setting() {
  const [Setting, setSetting] = useState([]);
  const [deniedRoutes, setdeniedRoutes] = useState([]);
  const [allow, setallow] = useState("yes");
  const [MainSemsterId, setMainSemsterId] = useState("");
  const [MaxAllowTrainingToRegister, setMaxAllowTrainingToRegister] =
    useState("1");
  const [AllSemesters, setAllSemesters] = useState([]);
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
        "https://university-mohamed.vercel.app/Api/admin/setting/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            deniedRoutes,
            allow,
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
  console.log(Setting);
  // get all semetser
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.semster._id}${routes.semster.searchsemster}?page=1&size=20`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      const data = await response.json();
      setAllSemesters(data.semsters);
    } catch (error) {
      console.error("Fetch failed", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [accessToken, refreshToken]);

  // change Main Semester
  const ChangeMainSemester = async () => {
    try {
      const response = await fetch(
        "https://university-mohamed.vercel.app/Api/admin/setting/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            MainSemsterId,
            MaxAllowTrainingToRegister,
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
  // handle checked
  console.log(deniedRoutes);
  console.log(allow);
  return (
    <>
      <div className="setting-page">
        <div className="single-setting">
          <Table striped bordered hover class="table" style={{}}>
            <thead class="thead-dark">
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
              {Setting.map((setting, index) => {
                return (
                  <tr key={setting._id}>
                    <th scope="row">{index + 1}</th>
                    <td style={{ textAlign: "center" }}>{setting.name}</td>
                    <td style={{ textAlign: "center" }}>{setting.desc}</td>
                    <td>
                      <div style={{}} class="form-check form-switch">
                        <input
                          style={{ width: "70px", height: "20px" }}
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`flexSwitchCheck`}
                          onChange={(e) => {
                            setallow(e.target.checked === true ? "yes" : "no");
                            setdeniedRoutes(setting);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div
            style={{ display: "flex", gap: "10px" }}
            className="Change-Main-semester"
          >
            <select
              class="form-select form-select-md mb-3"
              aria-label=".form-select-lg example"
              style={{ width: "300px" }}
              onChange={(e) => {
                setMainSemsterId(e.target.value);
              }}
            >
              <option selected>Select Main Semester</option>
              {AllSemesters.map((Sem) => {
                return <option value={Sem._id}>{Sem.name}</option>;
              })}
            </select>
            <select
              class="form-select form-select-md mb-3"
              aria-label=".form-select-lg example"
              style={{ width: "300px" }}
              onChange={(e) => {
                setMaxAllowTrainingToRegister(e.target.value);
              }}
            >
              <option selected>Open Number Of Training </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <button
              style={{ height: "37px" }}
              type="button"
              class="btn btn-primary "
              onClick={() => {
                ChangeMainSemester();
              }}
            >
              Change Main Semester
            </button>
            <button
              style={{ height: "37px" }}
              type="button"
              class="btn btn-primary "
              onClick={() => {
                UpdateSettings();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Setting;


