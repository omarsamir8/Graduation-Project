import { useEffect, useState } from "react";
import "../Styles_For_Admin/Create_Student_doctor_course_training.css";

function All_Students() {
  const [allstudents, setallstudents] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://university-system-rosy.vercel.app/Api/user/searchuser?sort=-Full_Name&select=Full_Name,Student_Code,semesterId&page=1&size=12&search=ahmed",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = await response.json();
        setallstudents(data.students);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log(allstudents);
  }, [allstudents]);

  const handleDelete = async (studentId) => {
    try {
      const response = await fetch(
        `https://university-system-rosy.vercel.app/Api/user/deleteStudent?userId=${studentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.ok) {
        // Remove the deleted student from the state
        setallstudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== studentId)
        );
        console.log(`Student with ID ${studentId} deleted successfully.`);
      } else {
        console.error(`Failed to delete student with ID ${studentId}.`);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <>
      <div className="get_all_student">
        <h2>Get All Students </h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">FullName</th>
              <th scope="col">Student_code</th>
              <th scope="col">Phone</th>
              <th scope="col">Level</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {allstudents.map((student) => (
              <tr key={student._id}>
                <th scope="row">{student._id}</th>
                <td>{student.Full_Name}</td>
                <td>{student.Student_Code}</td>
                <td>01558849371</td>
                <td>{student.semesterId.level}</td>
                <td>
                  <div className="row">
                    <button type="button" className="btn btn-primary">
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(student._id)}
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

export default All_Students;
