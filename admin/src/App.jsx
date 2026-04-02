import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Home from "./pages/Home";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import Lists from "./pages/Lists";
import Login from "./pages/Login";
import { adminDataContext } from "./context/AdminContext";

export default function App() {
  let { adminData } = useContext(adminDataContext);
  return (
    <div>
      <ToastContainer />
      {!adminData ? (
        <Login />
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      )}
    </div>
  );
}
