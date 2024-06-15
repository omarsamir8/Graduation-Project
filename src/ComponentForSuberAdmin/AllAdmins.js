import axios from "axios";
import { useEffect, useState } from "react";
import { routes } from "../routes";
import Swal from "sweetalert2";
import { Table } from "react-bootstrap";
import TitleAnimation from "../Loader/TitleAnimation";

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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://university-mohamed.vercel.app/Api/admins/search/admin?page=1&size=20",
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
    setphone(Admin.phone);
  }
  // update Admins
  const updateAdmin = async () => {
    setLoading(true);
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
        setLoading(false);
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
        setLoading(false);
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

  // delete admin
  const handleDelete = async (adminId) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
      if (confirmed.isConfirmed) {
        setLoading(true);
        const response = await fetch(
          `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.deleteAdmin}?userId=${adminId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        if (!response.ok) {
          setLoading(false);
          // Remove the deleted doctor from the state
          setalladmins((prevAdmins) =>
            prevAdmins.filter((admin) => admin._id !== adminId)
          );
          console.log(`Doctor with ID ${adminId} deleted successfully.`);
          Swal.fire({
            icon: "success",
            title: "Admin Deleted successfully",
            showConfirmButton: false,
            timer: 3500,
          });
        } else {
          setLoading(false);
          console.error(`Failed to delete doctor with ID ${adminId}.`);
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: "Admin Deleted failed, please try again later",
            timer: 4500,
          });
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  if (loading) {
    return <TitleAnimation />;
  }
  return (
    <>
      <div className="All_Admins" style={{ marginTop: "1rem" }}>
        <marquee className="marquee" scrollamount="10">
          {" "}
          This section is related to all admins exissting in BFCAI{" "}
        </marquee>
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
              <select
                className="form-control mt-3"
                aria-label="gender"
                name="gender"
                onChange={(e) => {
                  setgender(e.target.value);
                }}
              >
                <option value="" disabled selected hidden>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
        <Table striped bordered hover className="table">
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
                      onClick={() => handleDelete(admin._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
export default AllAdmins;
