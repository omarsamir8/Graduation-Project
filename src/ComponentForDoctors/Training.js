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
    </>
  );
}
export default Training;
