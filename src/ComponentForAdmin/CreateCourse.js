import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
function CreateCourse() {
  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Course</h2>
        <div class="row mt-4">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Course_Name"
              aria-label="Course_Name"
              name="Course_Name"
            />

            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Course_Id"
              aria-label="Course_Id"
              name="Course_Id"
            />
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Minimum Grade"
              aria-label="Minimum Grade"
              name="minimum Grade"
            />
          </div>
          <div class="col">
            <input
              type="email"
              class="form-control"
              placeholder="Enter Course_hours"
              aria-label="Course_hours"
              name="Course_hours"
            />
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Maximum Grade"
              aria-label="Maximum Grade"
              name="Maximum Grade"
            />
          </div>
        </div>
        <button type="button" class="btn btn-primary mt-3">
          Submit
        </button>
        <h2>All Courses Added</h2>
      </div>
      <div className="enrollcourse">
        <div className="course">
          <div className="info">
            <p>Object Oriented programming</p>
            <button type="button" class="btn btn-primary">
              Update
            </button>
          </div>
          <div className="img "></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Basics Of Lang Programming</p>
            <button type="button" class="btn btn-primary">
              Update
            </button>
          </div>
          <div className="img img2"></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Algorithms & Data Structure</p>
            <button type="button" class="btn btn-primary">
              Update
            </button>
          </div>
          <div className="img img3"></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Opreating System</p>
            <button type="button" class="btn btn-primary">
              Update
            </button>
          </div>
          <div className="img img4"></div>
        </div>
        <div className="course">
          <div className="info">
            <p>E-Commerce & E-bussniss</p>
            <button type="button" class="btn btn-primary">
              Update
            </button>
          </div>
          <div className="img img5"></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Data-----Mining</p>
            <button type="button" class="btn btn-primary">
              Update
            </button>
          </div>
          <div className="img img6"></div>
        </div>
      </div>
    </>
  );
}
export default CreateCourse;
