import { NavLink } from "react-router-dom";
import { $Dashboard2_Components } from "../Atoms";
import { useRecoilState } from "recoil";
function Training() {
  const [selectedComponent2, setSelectedComponent2] = useRecoilState(
    $Dashboard2_Components
  );
  return (
    <>
      <div className="enrollcourse">
        <div className="course">
          <div className="info">
            <p>Object Oriented programming</p>
            <NavLink
              onClick={() => setSelectedComponent2("StudentRegTraining")}
              style={{ textDecoration: "none" }}
              className="NavLink"
            >
              <button type="button" class="btn btn-primary">
                Students
              </button>
            </NavLink>
          </div>
          <div className="img "></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Basics Of Lang Programming</p>
            <NavLink
              onClick={() => setSelectedComponent2("StudentRegTraining")}
              style={{ textDecoration: "none" }}
              className="NavLink"
            >
              <button type="button" class="btn btn-primary">
                Students
              </button>
            </NavLink>
          </div>
          <div className="img img2"></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Algorithms & Data Structure</p>
            <NavLink
              onClick={() => setSelectedComponent2("StudentRegTraining")}
              style={{ textDecoration: "none" }}
              className="NavLink"
            >
              <button type="button" class="btn btn-primary">
                Students
              </button>
            </NavLink>
          </div>
          <div className="img img3"></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Object Oriented programming</p>
            <NavLink
              onClick={() => setSelectedComponent2("StudentRegTraining")}
              style={{ textDecoration: "none" }}
              className="NavLink"
            >
              <button type="button" class="btn btn-primary">
                Students
              </button>
            </NavLink>
          </div>
          <div className="img "></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Basics Of Lang Programming</p>
            <NavLink
              onClick={() => setSelectedComponent2("StudentRegTraining")}
              style={{ textDecoration: "none" }}
              className="NavLink"
            >
              <button type="button" class="btn btn-primary">
                Students
              </button>
            </NavLink>
          </div>
          <div className="img img2"></div>
        </div>
        <div className="course">
          <div className="info">
            <p>Algorithms & Data Structure</p>
            <NavLink
              onClick={() => setSelectedComponent2("StudentRegTraining")}
              style={{ textDecoration: "none" }}
              className="NavLink"
            >
              <button type="button" class="btn btn-primary">
                Students
              </button>
            </NavLink>
          </div>
          <div className="img img3"></div>
        </div>
      </div>
      <div className="get_all_student">
        <h2> All Students Reg Training </h2>
        <table style={{ textAlign: "center" }} class="table">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">FullName</th>
              <th scope="col">Training_code</th>
              <th scope="col">Phone</th>
              <th scope="col">Level</th>
              <th scope="col">Training_Id</th>
              <th scope="col">Training_Grade</th>
              <th scope="col">Submit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

              <td>
                {" "}
                <input
                  style={{
                    width: "150px",
                    alignItems: "center",
                    height: "25px",
                  }}
                  type="text"
                  class="form-control"
                  placeholder="Student Grade"
                  aria-label="Student Grade"
                  name="Student_Grade"
                />
              </td>
              <td>
                <button
                  type="submit"
                  style={{
                    height: "25px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#996ae4",
                  }}
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

              <td>
                {" "}
                <input
                  style={{
                    width: "150px",
                    alignItems: "center",
                    height: "25px",
                  }}
                  type="text"
                  class="form-control"
                  placeholder="Student Grade"
                  aria-label="Student Grade"
                  name="Student_Grade"
                />
              </td>
              <td>
                <button
                  type="submit"
                  style={{
                    height: "25px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#996ae4",
                  }}
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

              <td>
                {" "}
                <input
                  style={{
                    width: "150px",
                    alignItems: "center",
                    height: "25px",
                  }}
                  type="text"
                  class="form-control"
                  placeholder="Student Grade"
                  aria-label="Student Grade"
                  name="Student_Grade"
                />
              </td>
              <td>
                <button
                  type="submit"
                  style={{
                    height: "25px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#996ae4",
                  }}
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

              <td>
                {" "}
                <input
                  style={{
                    width: "150px",
                    alignItems: "center",
                    height: "25px",
                  }}
                  type="text"
                  class="form-control"
                  placeholder="Student Grade"
                  aria-label="Student Grade"
                  name="Student_Grade"
                />
              </td>
              <td>
                <button
                  type="submit"
                  style={{
                    height: "25px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#996ae4",
                  }}
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

              <td>
                {" "}
                <input
                  style={{
                    width: "150px",
                    alignItems: "center",
                    height: "25px",
                  }}
                  type="text"
                  class="form-control"
                  placeholder="Student Grade"
                  aria-label="Student Grade"
                  name="Student_Grade"
                />
              </td>
              <td>
                <button
                  type="submit"
                  style={{
                    height: "25px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#996ae4",
                  }}
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

              <td>
                {" "}
                <input
                  style={{
                    width: "150px",
                    alignItems: "center",
                    height: "25px",
                  }}
                  type="text"
                  class="form-control"
                  placeholder="Student Grade"
                  aria-label="Student Grade"
                  name="Student_Grade"
                />
              </td>
              <td>
                <button
                  type="submit"
                  style={{
                    height: "25px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#996ae4",
                  }}
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

              <td>
                {" "}
                <input
                  style={{
                    width: "150px",
                    alignItems: "center",
                    height: "25px",
                  }}
                  type="text"
                  class="form-control"
                  placeholder="Student Grade"
                  aria-label="Student Grade"
                  name="Student_Grade"
                />
              </td>
              <td>
                <button
                  type="submit"
                  style={{
                    height: "25px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#996ae4",
                  }}
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">8</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

              <td>
                {" "}
                <input
                  style={{
                    width: "150px",
                    alignItems: "center",
                    height: "25px",
                  }}
                  type="text"
                  class="form-control"
                  placeholder="Student Grade"
                  aria-label="Student Grade"
                  name="Student_Grade"
                />
              </td>
              <td>
                <button
                  type="submit"
                  style={{
                    height: "25px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#996ae4",
                  }}
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">9</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

              <td>
                {" "}
                <input
                  style={{
                    width: "150px",
                    alignItems: "center",
                    height: "25px",
                  }}
                  type="text"
                  class="form-control"
                  placeholder="Student Grade"
                  aria-label="Student Grade"
                  name="Student_Grade"
                />
              </td>
              <td>
                <button
                  type="submit"
                  style={{
                    height: "25px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#996ae4",
                  }}
                >
                  Upload
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">10</th>
              <td>Ahmed Adel</td>
              <td>2132515155</td>
              <td>01558849371</td>
              <td>Four</td>
              <td>#xxc01230 </td>

              <td>
                {" "}
                <input
                  style={{
                    width: "150px",
                    alignItems: "center",
                    height: "25px",
                  }}
                  type="text"
                  class="form-control"
                  placeholder="Student Grade"
                  aria-label="Student Grade"
                  name="Student_Grade"
                />
              </td>
              <td>
                <button
                  type="submit"
                  style={{
                    height: "25px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#996ae4",
                  }}
                >
                  Upload
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Training;
