import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
function CreateTraining() {
  return (
    <>
      <div className="Create_Student">
        <h2 className="create_student">Add Training</h2>
        <div class="row mt-4">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Training_Name"
              aria-label="Training_Name"
              name="Training_Name"
            />

            <input
              type="text"
              class="form-control mt-3"
              placeholder="Enter Training_Id"
              aria-label="Training_Id"
              name="Training_Id"
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
              placeholder="Enter Training_hours"
              aria-label="Training_hours"
              name="Training_hours"
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
        <button type="button" className="btn btn-primary mt-3">
          Submit
        </button>
        <h2>All Trainings Added</h2>
      </div>
      <div className="enrollcourse">
        <div className="course">
          <div className="info">
            <p>Object Oriented programming</p>
            <div className="img"></div>
            <div className="up-del-btn">
            <button type="button" className="btn btn-primary">
              Update
            </button>
            <button type="button" className="btn btn-danger delete_btn">
              Delete
            </button>
            </div>
          </div>
        </div>
        <div className="course">
          <div className="info">
            <p>Basics Of Lang Programming</p>
            <div className="img img2"></div>
            <div className="up-del-btn">
            <button type="button" className="btn btn-primary">
              Update
            </button>
            <button type="button" className="btn btn-danger delete_btn">
              Delete
            </button>
            </div>
          </div>
        </div>
        <div className="course">
          <div className="info">
            <p>Algorithms & Data Structure</p>
            <div className="img img3"></div>
            <div className="up-del-btn">
            <button type="button" className="btn btn-primary">
              Update
            </button>
            <button type="button" className="btn btn-danger delete_btn">
              Delete
            </button>
            </div>
          </div>
        </div>
        <div className="course">
          <div className="info">
            <p>Opreating System</p>
            <div className="img img4"></div>
            <div className="up-del-btn">
            <button type="button" className="btn btn-primary">
              Update
            </button>
            <button type="button" className="btn btn-danger delete_btn">
              Delete
            </button>
            </div>
          </div>
        </div>
        <div className="course">
          <div className="info">
            <p>E-Commerce & E-bussniss</p>
            <div className="img img5"></div>
            <div className="up-del-btn">
            <button type="button" className="btn btn-primary">
              Update
            </button>
            <button type="button" className="btn btn-danger delete_btn">
              Delete
            </button>
            </div>
          </div>
        </div>
        <div className="course">
          <div className="info">
            <p>Data-----Mining</p>
            <div className="img img6"></div>
            <div className="up-del-btn">
            <button type="button" className="btn btn-primary">
              Update
            </button>
            <button type="button" className="btn btn-danger delete_btn">
              Delete
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateTraining;
