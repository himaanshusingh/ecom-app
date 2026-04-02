import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import Logo from "../assets/logo.jpg";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";

export default function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);
  const { adminData } = useContext(adminDataContext);
  const navigate = useNavigate();

  async function adminLogin(e) {
    e.preventDefault();

    try {
      let result = await axios.post(
        serverUrl + "/api/auth/adminlogin",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(result.data);
      getAdmin();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-screen h-screen bg-linear-to-l from-[#141414] to-[#0c2025] flex flex-col text-[white] items-center justify-start">
      <div
        className="w-full h-20 flex items-center justify-start text-[25px] font-sans gap-2.5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-10 rounded-full ml-2" src={Logo} alt="" />
        <h1 className="text-[25px] font-sans">coCart</h1>
      </div>
      <div className="w-full h-20 flex items-center justify-center flex-col gap-1.75">
        <span className="text-[25px] font-semibold">Login</span>
        <span className="text-[16px] ">Welcome to coCart, Add your items</span>
      </div>
      <div className="max-w-125 w-[90%] h-75 border border-[#96969635] bg-[#00000025] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          action=""
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-5"
          onSubmit={adminLogin}
        >
          <div className="w-[90%] h-75 flex flex-col items-center justify-center gap-2.5 relative">
            <input
              type="email"
              className="w-full h-12.5 border-2 border-[#96969635] rounded-lg backdrop:blur-sm bg-transparent placeholder-[white] font-semibold p-2.5"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type={show ? "text" : "password"}
              className="w-full h-12.5 border-2 border-[#96969635] rounded-lg backdrop:blur-sm bg-transparent placeholder-[white] font-semibold p-2.5"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show && (
              <FaEye
                className="w-5 h-5 absolute right-[5%]  mb-5"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            {show && (
              <FaEyeSlash
                className="w-5 h-5 absolute right-[5%] mb-5 "
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            <button className="w-full h-10 mt-3.75 bg-[#6060f5] flex items-center justify-center rounded-lg">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
