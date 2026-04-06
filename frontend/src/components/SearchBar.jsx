import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const { search, setSearch } = useContext(ShopContext);
  const { showSearch, setShowSearch } = useContext(ShopContext);

  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else setVisible(false);
  }, [location]);

  return showSearch && visible ? (
    <div className="border-b border-gray-300 bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img src={assets.search_icon} alt="" className="w-4" />
      </div>
      <img
        alt=""
        src={assets.cross_icon}
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
      />
    </div>
  ) : null;
}
