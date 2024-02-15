import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageForStudent from "./pages/MainPageForStudent";
import MainPageForDoctor from "./pages/MainPageForDocTor";
import MainPageForAdmin from "./pages/MainPageForAdmin";
import Login from "./pages/Login";

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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
