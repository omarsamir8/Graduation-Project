import axios from "axios";
import { useEffect, useState } from "react";
import { routes } from "../routes";

function AllAdmins() {
  const [alladmins, setalladmins] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app/Api/admins/search/admin?page=1&size=5`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        console.log(response.data);
        setalladmins(response.data.admins);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th className="doctorInfo" scope="col">
              #ID
            </th>
            <th className="doctorInfo" scope="col">
              FullName
            </th>
            <th className="doctorInfo" scope="col">
              Email
            </th>
            <th className="doctorInfo" scope="col">
              Phone
            </th>
            {/* <th scope="col">Level</th> */}
            <th className="doctorInfo" scope="col">
              Operations
            </th>
          </tr>
        </thead>
        <tbody>
          {alladmins.map((admin, index) => (
            <tr key={admin._id}>
              <th className="doctorInfo" scope="row">
                {index + 1}
              </th>
              <td className="doctorInfo">{admin.FullName}</td>
              <td className="doctorInfo">{admin.email}</td>
              <td className="doctorInfo">{admin.phone}</td>
              {/* <td>{student.semesterId.level}</td> */}
              <td>
                <div style={{ gap: "10px" }} className="row">
                  <button
                    style={{
                      backgroundColor: "#996ae4",
                      borderColor: "#996ae4",
                      width: "45%",
                    }}
                    type="button"
                    // onClick={() => openUpdateModal(student)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                  <button
                    style={{ width: "45%" }}
                    type="button"
                    className="btn btn-danger"
                    // onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default AllAdmins;
