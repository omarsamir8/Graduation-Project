import axios from "axios";
import { useState, useEffect } from "react";
import { routes } from "../routes";
import Swal from "sweetalert2";
import { Table } from "react-bootstrap";

function Setting() {
  const [setting, setSetting] = useState([]);
  const [apiUrls, setApiUrls] = useState([]);
  const [mainSemesterId, setMainSemesterId] = useState("");
  const [maxAllowTrainingToRegister, setMaxAllowTrainingToRegister] =
    useState("1");
  const [allSemesters, setAllSemesters] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

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

  useEffect(() => {
    const storedApiUrls = JSON.parse(localStorage.getItem("apiUrls"));
    if (storedApiUrls) {
      setApiUrls(storedApiUrls);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("apiUrls", JSON.stringify(apiUrls));
  }, [apiUrls]);

  const updateSettings = async () => {
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
            apiUrls,
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
          text: data.error_Message
            ? data.error_Message[0].message
            : data.message,
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  useEffect(() => {
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
    fetchData();
  }, [accessToken, refreshToken]);

  const handleAllowToggleChange = (url, checked) => {
    const existingApiUrlIndex = apiUrls.findIndex(
      (apiUrl) => apiUrl.url === url
    );
    if (existingApiUrlIndex !== -1) {
      const updatedApiUrls = [...apiUrls];
      updatedApiUrls[existingApiUrlIndex] = {
        ...updatedApiUrls[existingApiUrlIndex],
        allow: checked ? "yes" : "no",
      };
      setApiUrls(updatedApiUrls);
    } else {
      setApiUrls((prevApiUrls) => [
        ...prevApiUrls,
        { url: url, allow: checked ? "yes" : "no" },
      ]);
    }
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
              {setting.map((setting, index) => (
                <tr key={setting._id}>
                  <th scope="row">{index + 1}</th>
                  <td style={{ textAlign: "center" }}>{setting.name}</td>
                  <td style={{ textAlign: "center" }}>{setting.desc}</td>
                  <td>
                    <div className="form-check form-switch">
                      <div
                        style={{
                          width: "50px",
                          height: "25px",
                          backgroundColor:
                            apiUrls.find((apiUrl) => apiUrl.url === setting.url)
                              ?.allow === "yes"
                              ? "green"
                              : "red",
                          borderRadius: "12.5px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleAllowToggleChange(
                            setting.url,
                            apiUrls.find((apiUrl) => apiUrl.url === setting.url)
                              ?.allow !== "yes"
                          );
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div
            style={{ display: "flex", gap: "10px" }}
            className="Change-Main-semester"
          >
            <select
              className="form-select form-select-md mb-3"
              aria-label=".form-select-lg example"
              style={{ width: "300px" }}
              onChange={(e) => {
                setMainSemesterId(e.target.value);
              }}
            >
              <option selected>Select Main Semester</option>
              {allSemesters.map((Sem) => (
                <option key={Sem._id} value={Sem._id}>
                  {Sem.name}
                </option>
              ))}
            </select>
            <select
              className="form-select form-select-md mb-3"
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
              className="btn btn-primary"
              onClick={() => {
                updateSettings();
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
