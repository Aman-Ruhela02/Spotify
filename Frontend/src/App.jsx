import { Route, Routes } from "react-router";

import "./index.css";
import UserDashboard from "./pages/UserDashboard";
import Landingpage from "./pages/Landingpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArtistDashboard from "./pages/ArtistDashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/artistdashboard" element={<ArtistDashboard/>} />
      </Routes>
    </>
  );
};

export default App;
