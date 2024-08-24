import {Navigate, Route, Routes} from "react-router-dom";

import Navbar from "./beforeAuth/Navbar";
import Homepage from "./beforeAuth/Homepage";
import Login from "./beforeAuth/Login";
import Register from "./beforeAuth/Register";

const BeforeAuth = () => {
  return (
    <div className="relative min-h-dvh font-mono w-full overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<>Page not found</>} />
      </Routes>
    </div>
  );
};

export default BeforeAuth;
