import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
// import Sidebar from "./components/Sidebar.jsx";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

export const currency = "$";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env");

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <BrowserRouter>
        <ToastContainer />
        {!token ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Navbar setToken={setToken} />
            <hr className="border border-gray-300" />
            <div className="flex w-full">
              {/* <Sidebar /> */}
              <Routes>
                <Route path="/" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}
