import axios from "axios";
import { useEffect, useState } from "react";
import { routes } from "../routes";
import Swal from "sweetalert2";

function AllAdmins() {
  const [alladmins, setalladmins] = useState([]);
  const [selectedAdmin, setselectedAdmin] = useState(null);
  const [FullName, setFullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Date_of_Birth, setDate_of_Birth] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");
  const [showform, setshowform] = useState("none");
  const [test, settest] = useState(false);
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
  // return data into inputes
  function openUpdateModal(Admin) {
    test === false ? setshowform("block") : setshowform("none");
    setselectedAdmin(Admin);
    setFullName(Admin.FullName);
    setDate_of_Birth(Admin.Date_of_Birth);
    setemail(Admin.email);
    setgender(Admin.gender);
    setpassword(Admin.password);
    setphone(Admin.phone)
  }
  // update Admins
  const updateAdmin = async () => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.updateAdmin}?userId=${selectedAdmin._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            FullName,
            phone,
            email,
            password,
            Date_of_Birth,
            gender,
          }),
        }
      );

      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Admin updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Update the state with the modified student
        setalladmins((prevAdmins) =>
          prevAdmins.map((prevAdmin) =>
            prevAdmin._id === selectedAdmin._id
              ? {
                  ...prevAdmin,
                  FullName,
                  phone,
                  email,
                  password,
                  Date_of_Birth,
                  gender,
                }
              : prevAdmin
          )
        );

        // Clear the selected student and reset input fields
        setselectedAdmin("");
        setDate_of_Birth("");
        setFullName("");
        setemail("");
        setphone("");
        setpassword("");
        setgender("");
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Admin update failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };
  return (
    <>
      <div className="All_Admins">
        <div className="Create_Student" style={{ display: showform }}>
          <h2 className="create_student">Update Student</h2>
          <form class="row mt-4">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Full Name"
                aria-label="FullName"
                name="FullName"
                value={FullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
              <input
                type="text"
                class="form-control mt-3"
                placeholder="Enter Phone Number"
                aria-label="phone"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setphone(e.target.value);
                }}
              />
              <input
                type="text"
                class="form-control mt-3"
                placeholder="Enter Gender"
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={(e) => {
                  setgender(e.target.value);
                }}
              />
            </div>
            <div class="col part2">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Admin Email"
                aria-label="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <input
                type="text"
                class="form-control mt-3"
                placeholder="Enter Password"
                aria-label="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <input
                type="date"
                class="form-control mt-3"
                placeholder="Enter Date Of Birth"
                aria-label="Date_of_Birth"
                name="Date_of_Birth"
                value={Date_of_Birth}
                onChange={(e) => {
                  setDate_of_Birth(e.target.value);
                }}
              />
            </div>
          </form>
          <button
            type="button"
            class="btn btn-primary mt-3"
            onClick={updateAdmin}
          >
            Update
          </button>
        </div>
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
                      onClick={() => openUpdateModal(admin)}
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
      </div>
    </>
  );
}
export default AllAdmins;
