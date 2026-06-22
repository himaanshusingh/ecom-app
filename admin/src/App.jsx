import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar.jsx";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

export const currency = "₹";
export const backendUrl = import.meta.env.VITE_BACKEND_URL || (
  typeof window !== "undefined"
    ? (window.location.port === "5174" ? "http://localhost:3000/" : window.location.origin + "/")
    : "http://localhost:3000/"
);

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 h-screen overflow-hidden flex flex-col">
      <BrowserRouter basename="/admin">
        <ToastContainer />
        {!token ? (
          <div className="overflow-y-auto h-full flex items-center justify-center">
            <Login setToken={setToken} />
          </div>
        ) : (
          <>
            <Navbar setToken={setToken} />
            <hr className="border border-gray-300" />
            <div className="flex flex-1 w-full overflow-hidden">
              <Sidebar />
              <div className="flex-1 h-full overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}
