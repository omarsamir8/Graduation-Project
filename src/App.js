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
import Training_Info from "./pages/Training_Info/Training_Info";
import ScrollToTopButton from "./ScroollButton/ScrollToTopButton ";
import StudentResultReport from "./pages/StudentGradeReoprt/StudentGradeReoprt";
import TrainingResyltReport from "./pages/TrainingResyltReport/TrainingResyltReport";
function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/student" element={<MainPageForStudent />} />
            <Route path="/doctor" element={<MainPageForDoctor />} />
            <Route path="/admin" element={<MainPageForAdmin />} />
            <Route path="/superadmin" element={<MainPageForSuberAdmin />} />
            <Route
              path="/Registered_Courses"
              element={<Registered_Courses />}
            />
            <Route path="/Reports_student" element={<Reports_student />} />
            <Route path="/training/:trainingId" element={<Training_Info />} />
            <Route
              path="/traiingres/:TrainingId"
              element={<TrainingResyltReport />}
            />
            <Route
              path="/material/:courseId"
              element={<StudentResultReport />}
            />
            <Route path="/Semester_grade" element={<Semester_grade />} />
          </Routes>
        </BrowserRouter>
        <ScrollToTopButton />
      </div>
    </>
  );
}
export default App;
