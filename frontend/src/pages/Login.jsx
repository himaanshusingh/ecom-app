import { useState } from "react";

export default function Login() {
  const [currentState, setCurrentState] = useState("Login");

  function handleSubmit(e) {
    e.preventDefault();
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
        { type: "text", placeholder: "Name" },
        { type: "text", placeholder: "Email" },
        { type: "text", placeholder: "Password" },
      ].map(({ type, placeholder }) =>
        currentState === "Login" && placeholder === "Name" ? (
          ""
        ) : (
          <input
            type={type}
            required={true}
            key={placeholder}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-800"
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
