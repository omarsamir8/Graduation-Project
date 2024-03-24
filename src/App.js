import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageForStudent from "./pages/MainPageForStudent";
import MainPageForDoctor from "./pages/MainPageForDocTor";
import MainPageForAdmin from "./pages/MainPageForAdmin";
import Login from "./pages/Login";
import Registered_Courses from "./pages/Registered_Courses/Registered_Courses";
import Reports_student from "./pages/Reports_student/Reports_student";
// import Reports_student_Reg_Course from "./pages/Stu_Reg_Course/StuRegCourse";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/student" element={<MainPageForStudent />}></Route>
            <Route path="/doctor" element={<MainPageForDoctor />}></Route>
            <Route path="/admin" element={<MainPageForAdmin />}></Route>
            <Route
              path="/Registered_Courses"
              element={<Registered_Courses />}
            ></Route>
            {/* <Route
              path="/StuRegCourse"
              element={<Reports_student_Reg_Course />}
            ></Route> */}

            <Route
              path="/Reports_student"
              element={<Reports_student />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
