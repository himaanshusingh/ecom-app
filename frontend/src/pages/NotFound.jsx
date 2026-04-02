import { useNavigate } from "react-router-dom";

export default function NotFound() {
  let navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-linear-to-l  from-[#141414] to-[#0c2025] md:text-[70px] text-[30px] flex items-center justify-center text-[white] flex-col gap-5">
      404 Page Not Found
      <button
        className="bg-[white] px-5 py-2.5 rounded-xl text-[18px] text-[black] cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
}
