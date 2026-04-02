import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { authDataContext } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase";
import { userDataContext } from "../context/UserContext";
import Logo from "../assets/logo.jpg";
import google from "../assets/google.webp";

export default function Registration() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { getCurrentUser } = useContext(userDataContext);

  async function handleSignup(e) {
    e.preventDefault();
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/registration",
        { name, email, password },
        { withCredentials: true },
      );
      getCurrentUser();
      navigate("/");
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function googleSignup() {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      let result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true },
      );
      console.log(result.data);
    } catch (error) {
      console.log("error", error);
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
        <span className="text-[25px] font-semibolf">Registration</span>
        <span className="text-[16px] ">
          Welcome to coCart, place your order
        </span>
      </div>
      <div className="max-w-125 w-[90%] h-100 border border-[#96969635] bg-[#00000025] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          action=""
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-5"
          onSubmit={handleSignup}
        >
          <div
            className="w-full h-12.5 bg-[#42656cae] flex items-center justify-center gap-2.5 p-5 cursor-pointer rounded-lg"
            onClick={googleSignup}
          >
            <img className="w-10 rounded-2xl " src={google} alt="" />{" "}
            <span>Registration with google</span>
          </div>
          <div className=" w-full h-px flex items-center justify-center gap-5">
            <div className="w-[50%] h-px bg-[#96969635]"></div> Or{" "}
            <div className="w-[50%] h-px bg-[#96969635]"></div>
          </div>

          <div className="w-[90%] h-75 flex flex-col items-center justify-center gap-2.5 relative">
            <input
              type="text"
              className="w-full h-12.5 border-2 border-[#96969635] rounded-lg backdrop:blur-sm bg-transparent placeholder-[white] font-semibold p-2.5"
              placeholder="Username"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
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
                className="w-5 h-5 absolute right-[5%] mt-5 "
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            {show && (
              <FaEyeSlash
                className="w-5 h-5 absolute right-[5%] mt-5"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            <button className="w-full h-10 mt-3.75 bg-[#6060f5] flex items-center justify-center rounded-lg">
              create account
            </button>
            <p className="flex gap-2.5">
              <span>You Have Any Account?</span>
              <span
                className="text-[#6060f5] cursor-pointer font-semibold"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
