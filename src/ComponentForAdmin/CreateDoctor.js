import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
function CreateDoctor() {
  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Doctor</h2>
        <div class="row mt-4">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Full Name"
              aria-label="Full Name"
              name="Full_Name"
            />

            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Phone Number"
              aria-label="Phone Number"
              name="PhoneNumber"
            />
            <input
              type="gender"
              class="form-control mt-3"
              placeholder="Enter Gender"
              aria-label="Gender"
              name="Gender"
            />
            <input
              type="file"
              class="form-control mt-3"
              placeholder="Enter Image"
              aria-label="Image"
              name="Image"
            />
          </div>
          <div class="col">
            <input
              type="email"
              class="form-control"
              placeholder="Enter Email"
              aria-label="Email"
              name="email"
            />
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter National Id"
              aria-label="National Id"
              name="National_Id"
            />
            <input
              type="date"
              class="form-control mt-3"
              placeholder="Enter Date Of Birth"
              aria-label="Date Of Birth"
              name="Date_Of_Birth"
            />
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Department"
              aria-label="Department"
              name="Department"
            />
          </div>
        </div>
        <button type="button" class="btn btn-primary mt-3">
          Submit
        </button>
      </div>
    </>
  );
}
export default CreateDoctor;
