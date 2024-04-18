import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageForStudent from "./pages/MainPageForStudent";
import MainPageForDoctor from "./pages/MainPageForDocTor";
import MainPageForAdmin from "./pages/MainPageForAdmin";
import Login from "./pages/Login";
import Registered_Courses from "./pages/Registered_Courses/Registered_Courses";
import Reports_student from "./pages/Reports_student/Reports_student";
import Semester_grade from "./pages/Semester_grade";
import { routes } from "./routes";
import MainPageForSuberAdmin from "./pages/MainPageForSuberAdmin";

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
              path="/superadmin"
              element={<MainPageForSuberAdmin />}
            ></Route>
            <Route
              path="/Registered_Courses"
              element={<Registered_Courses />}
            ></Route>
            <Route
              path="/Reports_student"
              element={<Reports_student />}
            ></Route>
            <Route path="/Semester_grade" element={<Semester_grade />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
