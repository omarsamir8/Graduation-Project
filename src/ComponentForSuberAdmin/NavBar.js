import "../styles/NavBar.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../routes";
import Swal from "sweetalert2";
function NavBar() {
  const [SuperAdminInfo, setSuperAdminInfo] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  const [superImage, setsuperImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.Admin._id}${routes.Admin.getinfoSuper}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setSuperAdminInfo(response.data.user);
        console.log(SuperAdminInfo);
        // Log the updated state
      } catch (error) {
        console.error("Error fetching Super Admin info:", error);
      }
    };
    fetchData();
  }, [accessToken, refreshToken]);
  console.log(SuperAdminInfo);

  // uplode photo by suberadmin
  const uploadAdminimage = async () => {
    try {
      const formData = new FormData();
      formData.append("superImage", superImage);

      const response = await fetch(
        `https://university-mohamed.vercel.app/Api/admins/add/image/to/super/by/super`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Admin Image added successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Admin Image creation failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  // delete Photo
  const DeleteSuperAdminImage = async () => {
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
        const response = await axios.patch(
          `https://university-mohamed.vercel.app/Api/admins/delete/image/from/super/by/super`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const data = response.data;
        console.log(data);

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Admin image deleted successfully",
            showConfirmButton: false,
            timer: 3500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to delete admin image",
            showConfirmButton: false,
            timer: 3500,
          });
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
      Swal.fire({
        icon: "error",
        title: "Failed to delete admin image",
        text: error.response?.data?.message || "An error occurred",
        showConfirmButton: false,
        timer: 3500,
      });
    }
  };

  return (
    <>
      <div className="nav-bar">
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="info">
          <img
            type="button"
            class=""
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            src={SuperAdminInfo.urlImg}
            alt=""
          />

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Upload Photo
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div class="modal-body">
                  <input
                    type="file"
                    class="form-control mt-3"
                    placeholder="Enter Doctor Image"
                    aria-label="adminImage"
                    name="adminImage"
                    onChange={(e) => {
                      setsuperImage(e.target.files[0]);
                    }}
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => {
                      DeleteSuperAdminImage();
                    }}
                  >
                    Delete Image
                  </button>
                  <button
                    onClick={() => {
                      uploadAdminimage();
                    }}
                    type="button"
                    class="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="details">
            <h3>{SuperAdminInfo.FullName}</h3>
            <p> {SuperAdminInfo.role}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;
