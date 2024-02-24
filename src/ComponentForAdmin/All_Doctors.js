import { useEffect, useState } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";

function AllDoctors() {
  const [alldoctors, setalldoctors] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  // get all doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://university-system-rosy.vercel.app/Api/instructor/search?sort=1&select=email,FullName,Materials&size=5",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setalldoctors(data.Instructor);
        console.log(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log(alldoctors);
  }, [alldoctors]);
  //  delete doctors
  const handleDelete = async (doctorId) => {
    try {
      const response = await fetch(
        `https://university-system-rosy.vercel.app/Api/instructor/delete?userId=${doctorId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.ok) {
        // Remove the deleted doctor from the state
        setalldoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor._id !== doctorId)
        );
        console.log(`Doctor with ID ${doctorId} deleted successfully.`);
      } else {
        console.error(`Failed to delete doctor with ID ${doctorId}.`);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <>
      <div className="get_all_student">
        <h2>Get All Doctor </h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">FullName</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Department</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {alldoctors.map((doctor) => (
              <tr key={doctor._id}>
                <th scope="row">{doctor._id}</th>
                <td>{doctor.FullName}</td>
                <td>{doctor.email}</td>
                <td>01558849371</td>
                <td>Four</td>
                <td>
                  <div style={{ flexWrap: "nowrap" }} className="row">
                    <button type="button" className="btn btn-primary">
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(doctor._id)}
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

export default AllDoctors;
