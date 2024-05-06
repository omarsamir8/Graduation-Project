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
import StudentInfo from "./pages/studentInfo/StudentInfo";
import DoctorInfo from "./pages/DoctorInfo/DoctorInfo";
import Generate_department from "./pages/Generate_department/Generate_department";
import ForgetPassword from "./pages/ForgetPassword";
function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/student" element={<MainPageForStudent />} />
            <Route path="/doctor" element={<MainPageForDoctor />} />
            <Route path="/admin" element={<MainPageForAdmin />} />
            <Route path="/superadmin" element={<MainPageForSuberAdmin />} />
            <Route
              path="/Registered_Courses"
              element={<Registered_Courses />}
            />
            <Route path="/Reports_student" element={<Reports_student />} />
            <Route
              path="/generate_department"
              element={<Generate_department />}
            />
            <Route path="/training/:trainingId" element={<Training_Info />} />
            <Route path="/student/:studentId" element={<StudentInfo />} />
            <Route path="/doctor/:doctorId" element={<DoctorInfo />} />
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
