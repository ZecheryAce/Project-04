import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page is Login */}
        <Route path="/" element={<Login />} />

        {/* Registration page */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard — only accessible when logged in */}
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("token") ? <Dashboard /> : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
