import React, { useEffect, useState } from "react";
import "../Styles_For_Admin/category.css";
import Swal from "sweetalert2";
import { routes } from "../routes";
import { Table } from "react-bootstrap";
import TitleAnimation from "../Loader/TitleAnimation";
function CreateSemester() {
  const [name, setname] = useState("");
  // const [level, setlevel] = useState("");
  const [term, setterm] = useState("");
  const [year, setyear] = useState("");
  const [message, setmessage] = useState("");
  const [AllSemesters, setAllSemesters] = useState([]);
  const [selectedSemesterId, setselectedSemesterId] = useState(null);
  const [Max_Hours, setMax_Hours] = useState("");
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  let [count, setcount] = useState(1);
  const [loading, setLoading] = useState(false);

  // create Semester
  const Createsemester = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.semster._id}${routes.semster.addsemster}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            name,
            year,
            Max_Hours,
            term,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setmessage(data.message);
      console.log(data.message);

      if (response.ok) {
        setLoading(false);
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Semester added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        setLoading(false);
        // Show an error message if needed
        if (data.message === "Semster name is already Exist") {
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: `${data.message}`,
            timer: 4500,
          });
        } else if (data.message === "validation Error") {
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: data.error_Message[0].message,
            timer: 4500,
          });
        }
      }
    } catch (error) {
      console.error("Training creation failed", error);
    }
  };

  // get all semester
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.semster._id}${routes.semster.searchsemster}?page=${count}&size=10`,
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
  }, [count, accessToken, refreshToken]);

  useEffect(() => {
    console.log(AllSemesters);
  }, [AllSemesters]);

  // delete semester
  const deleteSemester = async (semsterId) => {
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
          `https://university-mohamed.vercel.app${routes.semster._id}${routes.semster.deletesemster}?semsterId=${semsterId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        if (response.ok) {
          setLoading(false);
          // On success, update the state to remove the deleted course
          setAllSemesters((prevSemesters) =>
            prevSemesters.filter((semester) => semester._id !== semsterId)
          );
          console.log(`Course with ID ${semsterId} deleted successfully.`);
          Swal.fire({
            icon: "success",
            title: "Semester Deleted successfully",
            showConfirmButton: false,
            timer: 3500,
          });
        } else {
          setLoading(false);
          console.error(`Failed to delete course with ID ${semsterId}.`);
          Swal.fire({
            icon: "error",
            title: "Fail",
            text: "Semester Deleted Failed",
            timer: 4500,
          });
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  // update semester
  const updateSemester = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.semster._id}${routes.semster.updatesemster}?semsterId=${selectedSemesterId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            name,
            Max_Hours,
            year,
            term,
          }),
        }
      );
      const data = response.json();
      if (response.ok) {
        setLoading(false);
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Semester updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Update the state with the modified course
        setAllSemesters((prevSemesters) =>
          prevSemesters.map((prevSemesters) =>
            prevSemesters._id === selectedSemesterId
              ? {
                  ...prevSemesters,
                  name,
                  Max_Hours,
                  year,
                  term,
                }
              : prevSemesters
          )
        );

        // Clear the selected course and reset input fields
        setselectedSemesterId(null);
        setname("");
        setterm("");
        setyear("");
        setMax_Hours("");
      } else {
        setLoading(false);
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
  const increment = () => {
    setcount((prevCount) => prevCount + 1);
    // Increment count by 1
  };
  const decrement = () => {
    setcount((prevPage) => prevPage - 1);
    // Increment count by 1
  };
  console.log(count);
  if (loading) {
    return <TitleAnimation />;
  }
  return (
    <>
      <div className="CreateSemester">
        <h4 style={{ marginLeft: "10px", marginTop: "10px" }}>Add Semester </h4>
        <div
          style={{
            marginTop: "20px",
            height: "70px",
            display: "flex",
            gap: "10px",
          }}
          className="semester category-search animate__animated animate__fadeInDown"
        >
          <input
            style={{ width: "30%", marginLeft: "10px", height: "40px" }}
            className="form-control form-control-sm"
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            placeholder="Semester Name"
            aria-label=".form-control-sm example"
          />

          <input
            style={{ width: "30%", marginLeft: "10px", height: "40px" }}
            className="form-control form-control-sm"
            type="text"
            name="term"
            value={term}
            onChange={(e) => {
              setterm(e.target.value);
            }}
            placeholder="term"
            aria-label=".form-control-sm example"
          />
          <input
            style={{ width: "30%", marginLeft: "10px", height: "40px" }}
            className="form-control form-control-sm"
            type="text"
            name="year"
            value={year}
            onChange={(e) => {
              setyear(e.target.value);
            }}
            placeholder="Year"
            aria-label=".form-control-sm example"
          />
          <input
            style={{ width: "30%", marginLeft: "10px", height: "40px" }}
            className="form-control form-control-sm"
            type="number"
            name="Max_Hours"
            value={Max_Hours}
            onChange={(e) => {
              setMax_Hours(e.target.value);
            }}
            placeholder="Max Hour"
            aria-label=".form-control-sm example"
          />
          <button
            style={{
              width: "280px",
              height: "40px",
              marginRight: "30px",
              backgroundColor: "#996ae4",
              color: "white",
            }}
            onClick={selectedSemesterId ? updateSemester : Createsemester}
            // onClick={Createsemester}
            type="button"
            className="btn "
          >
            {selectedSemesterId ? "Update Semseter" : "Add Semester"}
          </button>
        </div>
        <h4
          className="table4"
          style={{ marginLeft: "10px", marginTop: "-10px" }}
        >
          All Semester{" "}
        </h4>
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th className="doctorInfo" scope="col">
                #ID
              </th>
              <th className="doctorInfo" scope="col">
                Semester Name
              </th>
              <th className="doctorInfo" scope="col">
                Acadimic Year
              </th>
              <th className="doctorInfo" scope="col">
                Term
              </th>
              {/* <th scope="col">Level</th> */}
              <th className="doctorInfo" scope="col">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {AllSemesters.map((semester) => (
              <tr key={semester._id}>
                <th className="doctorInfo" scope="row">
                  {semester._id}
                </th>
                <td className="doctorInfo">{semester.name}</td>
                <td className="doctorInfo">{semester.year}</td>
                <td className="doctorInfo">{semester.term}</td>
                {/* <td>{student.semesterId.level}</td> */}
                <td>
                  <div className="row">
                    <button
                      style={{
                        backgroundColor: "#996ae4",
                        borderColor: "#996ae4",
                        width: "45%",
                      }}
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setselectedSemesterId(semester._id); // Use setselectedSemesterId here
                        // Set the values of the selected semester to the input fields
                        setname(semester.name);
                        setMax_Hours(semester.Max_Hours);
                        setterm(semester.term);
                        setyear(semester.year);
                      }}
                    >
                      Update
                    </button>
                    <button
                      style={{ width: "45%", marginLeft: "10px" }}
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteSemester(semester._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li
                onClick={() => {
                  decrement();
                }}
                class="page-item"
              >
                <a class="page-link" href="#previous" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                onClick={() => {
                  setcount(1);
                }}
                class="page-item"
              >
                <a class="page-link" href="#1">
                  1
                </a>
              </li>
              <li
                onClick={() => {
                  setcount(2);
                }}
                class="page-item"
              >
                <a class="page-link" href="#2">
                  2
                </a>
              </li>
              <li
                onClick={() => {
                  setcount(3);
                }}
                class="page-item"
              >
                <a class="page-link" href="#3">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#3">
                  ......
                </a>
              </li>
              <li class="page-item">
                <a
                  onClick={() => {
                    increment();
                  }}
                  class="page-link"
                  href="#next"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
export default CreateSemester;
