import { useState } from "react";
import Swal from "sweetalert2";
import { routes } from "../routes";
import TitleAnimation from "../Loader/TitleAnimation";

function CreateAdmin() {
  const [FullName, setFullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Date_of_Birth, setDate_of_Birth] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");
  const [message, setmessage] = useState("");
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [loading, setLoading] = useState(false);
  // create admin

  const createAdmin = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.createAdmin}`,
        {
          method: "POST",
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
      const data = await response.json();
      console.log(data);
      setmessage(data.message);
      if (response.ok) {
        // Show SweetAlert on success
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Admin added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        setLoading(false);
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Admin creation failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  if (loading) {
    return <TitleAnimation />;
  }
  return (
    <>
      <div style={{ marginTop: "10px" }} className="Create_Student">
        <marquee className="marquee" scrollamount="10">
          {" "}
          It is not possible for more than one admin to have the same Full Name,
          Email, phone number{" "}
        </marquee>
        <form class="row mt-4">
          <div class="col ">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Full Name"
              aria-label="FullName"
              name="FullName"
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
              type="email"
              class="form-control"
              placeholder="Enter Admin Email"
              aria-label="email"
              name="email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              class="form-control mt-3"
              placeholder="Enter Admin Password"
              aria-label="password"
              name="password"
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
              onChange={(e) => {
                setDate_of_Birth(e.target.value);
              }}
            />
          </div>
        </form>

        <button
          type="button"
          class="btn btn-primary mt-3"
          onClick={createAdmin}
        >
          Submit
        </button>
      </div>
    </>
  );
}
export default CreateAdmin;
