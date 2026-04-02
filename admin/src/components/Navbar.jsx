import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.jpg";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);

  async function logout() {
    try {
      let result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-screen h-17.5 bg-[#dcdbdbf8] z-10 fixed top-0 flex  items-center justify-between px-7.5 overflow-x-hidden shadow-md shadow-black">
      <div
        className="w-[30%] flex items-center justify-start gap-2.5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="" className="w-7.5" />
        <h1 className="text-[25px] text-[black] font-sans ">coCart</h1>
      </div>

      <button
        className="text-[15px] hover:border-2 border-[#89daea] cursor-pointer bg-[#000000ca] py-2.5 px-5 rounded-2xl text-white "
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
