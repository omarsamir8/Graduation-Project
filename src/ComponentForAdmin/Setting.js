import axios from "axios";
import { useState, useEffect } from "react";

import { routes } from "../routes";
import Swal from "sweetalert2";
import Table from "react-bootstrap/Table";
function Setting() {
  const [Setting, setSetting] = useState([]);
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

  console.log(Setting);
  return (
    <>
      <div className="setting-page">
        <div className="single-setting">
          <Table
            striped
            bordered
            hover
            class="table"
            style={{ marginTop: "20px" }}
          >
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
                    <td>{setting.allow}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
export default Setting;
// #282a36
