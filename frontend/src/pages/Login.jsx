import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const [info, setInfo] = useState({ name: "", email: "", password: "" });
  const { email, password } = info;

  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const res = await axios.post(`http://localhost:3000/api/user/register`, info);
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else toast.error(res.data.message);
      } else {
        const res = await axios.post(`http://localhost:3000/api/user/login`, { email, password }); // prettier-ignore
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <div className="prata-regular text-3xl">{currentState}</div>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {[
        { type: "text", placeholder: "Name", name: "name" },
        { type: "email", placeholder: "Email", name: "email" },
        { type: "password", placeholder: "Password", name: "password" },
      ].map(({ type, placeholder, name }) =>
        currentState === "Login" && placeholder === "Name" ? (
          ""
        ) : (
          <input
            required
            type={type}
            key={placeholder}
            value={info[name]}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-800"
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, [name]: e.target.value }))
            }
          />
        ),
      )}

      {/* prettier-ignore */}
      <div className="w-full flex justify-between text-sm mt-2">
        <p className="cursor-pointer">Forgot your password</p>
        {currentState === "Login" ? (
          <p onClick={() => setCurrentState("Signup")} className="cursor-pointer">Create Account</p>
        ) : (
          <p onClick={() => setCurrentState("Login")} className="cursor-pointer">Login Here</p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-2 cursor-pointer">
        {currentState === "Login" ? "Login" : "Signup"}
      </button>
    </form>
  );
}
