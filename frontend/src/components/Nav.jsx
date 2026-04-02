import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoMdCart, IoMdHome } from "react-icons/io";
import { BiCollection } from "react-icons/bi";
import { MdPermContactCalendar } from "react-icons/md";

import logo from "../assets/logo.jpg";
import { shopDataContext } from "../context/ShopContext";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "HOME", path: "/" },
  { label: "COLLECTIONS", path: "/collections" },
  { label: "ABOUT", path: "/about" },
  { label: "CONTACT", path: "/contact" },
];

export default function Nav() {
  const [showProfile, setShowProfile] = useState(false);
  const { user, setUser, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { search, showSearch, setSearch, setShowSearch, getCartCount } =
    useContext(shopDataContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  }

  const cartCount = getCartCount();

  return (
    <>
      {/* ── Top Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 bg-slate-100 shadow-md shadow-black/10 flex items-center justify-between px-5 md:px-8">

        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="coCart logo"
            className="h-10 w-10 rounded-lg"
          />
          <span className="text-xl font-semibold text-black tracking-tight">
            coCart
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="text-sm font-medium text-white bg-black hover:bg-slate-600 rounded-full px-4 py-2 transition-colors duration-150"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search Toggle */}
          <button
            aria-label="Toggle search"
            onClick={() => {
              setShowSearch((prev) => !prev);
              if (!showSearch) navigate("/collections");
            }}
            className="text-black hover:text-slate-600 transition-colors"
          >
            <BsFillSearchHeartFill className="w-6 h-6" />
          </button>

          {/* Profile Avatar / Icon */}
          {user ? (
            <button
              aria-label="Open profile menu"
              onClick={() => setShowProfile((prev) => !prev)}
              className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              {user.name.slice(0, 1).toUpperCase()}
            </button>
          ) : (
            <button
              aria-label="Open profile menu"
              onClick={() => setShowProfile((prev) => !prev)}
              className="text-black hover:text-slate-600 transition-colors"
            >
              <CgProfile className="w-6 h-6" />
            </button>
          )}

          {/* Desktop Cart */}
          <div className="relative hidden md:block">
            <button
              aria-label="View cart"
              onClick={() => navigate("/cart")}
              className="text-black hover:text-slate-600 transition-colors"
            >
              <IoMdCart className="w-6 h-6" />
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 bg-black text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1 pointer-events-none">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        {/* Search Dropdown */}
        {showSearch && (
          <div className="absolute inset-x-0 top-full h-18 bg-sky-50/90 backdrop-blur-sm flex items-center justify-center border-t border-slate-200">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full max-w-lg h-10 rounded-full bg-slate-700 placeholder:text-slate-300 text-white text-sm px-5 outline-none focus:ring-2 focus:ring-white/40 transition"
            />
          </div>
        )}

        {/* Profile Dropdown */}
        {showProfile && (
          <div className="absolute right-4 top-[calc(100%+8px)] w-44 bg-black/90 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl z-50 overflow-hidden">
            <ul className="flex flex-col py-2 text-sm text-white">
              {!user ? (
                <li>
                  <button
                    onClick={() => { navigate("/login"); setShowProfile(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-white/10 transition-colors"
                  >
                    Login
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => { handleLogout(); setShowProfile(false); setUser(""); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-white/10 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => { navigate("/order"); setShowProfile(false); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-white/10 transition-colors"
                >
                  Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate("/about"); setShowProfile(false); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-white/10 transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="fixed bottom-0 inset-x-0 h-16 bg-black flex items-center justify-around px-4 md:hidden z-50">
        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center gap-1 text-white/70 hover:text-white active:text-white transition-colors text-[11px]"
        >
          <IoMdHome className="w-5 h-5" />
          Home
        </button>
        <button
          onClick={() => navigate("/collections")}
          className="flex flex-col items-center gap-1 text-white/70 hover:text-white active:text-white transition-colors text-[11px]"
        >
          <BiCollection className="w-5 h-5" />
          Collections
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="flex flex-col items-center gap-1 text-white/70 hover:text-white active:text-white transition-colors text-[11px]"
        >
          <MdPermContactCalendar className="w-5 h-5" />
          Contact
        </button>
        <div className="relative">
          <button
            onClick={() => navigate("/cart")}
            className="flex flex-col items-center gap-1 text-white/70 hover:text-white active:text-white transition-colors text-[11px]"
          >
            <IoMdCart className="w-5 h-5" />
            Cart
          </button>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 min-w-4 h-4 bg-white text-black text-[9px] font-bold rounded-full flex items-center justify-center px-1 pointer-events-none">
              {cartCount}
            </span>
          )}
        </div>
      </nav>
    </>
  );
}