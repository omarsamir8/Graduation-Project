import "../Styles_For_Admin/Create_Student_doctor_course_training.css";
function AllDoctor() {
  return (
    <>
      <div className="get_all_student">
        <h2>Get All Doctor </h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">FullName</th>
              <th scope="col">Student_code</th>
              <th scope="col">Phone</th>
              <th scope="col">Level</th>
              <th scope="col">Opreations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Omar Samir</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>
                {" "}
                <div className="row">
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Lionel Messi </td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>One</td>
              <td>
                {" "}
                <div className="row">
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Andres Inesta</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>
                {" "}
                <div className="row">
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Mohame Samir</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Three</td>
              <td>
                {" "}
                <div className="row">
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Phil Phoden</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>
                {" "}
                <div className="row">
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Bernaldo Silva</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>one</td>
              <td>
                {" "}
                <div className="row">
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Luka Modric</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>one</td>
              <td>
                {" "}
                <div className="row">
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">8</th>
              <td>Jack Girlish</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>two</td>
              <td>
                {" "}
                <div className="row">
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">9</th>
              <td>Ashraf Bensharki </td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>two</td>
              <td>
                {" "}
                <div className="row">
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">10</th>
              <td>YaYa Touraih </td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>three</td>
              <td>
                {" "}
                <div className="row">
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">11</th>
              <td>Ederson</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>three</td>
              <td>
                {" "}
                <div className="row">
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default AllDoctor;
