import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-17.5 sm:w-[18%] min-h-[89vh] border-r-2 border-gray-300 shrink-0">
      <div className="flex flex-col gap-4 pt-6 pl-3 sm:pl-[20%] text-[15px]">
        {[
          { to: "/", src: assets.add_icon, text: "Add Items" },
          { to: "/list", src: assets.order_icon, text: "List Items" },
          { to: "/orders", src: assets.order_icon, text: "Orders" },
        ].map(({ to, src, text }) => (
          <NavLink
            to={to}
            key={text}
            className="flex items-center gap-3 border-2 border-gray-300 border-r-0 px-3 py-2 rounded-l-md"
          >
            <img src={src} alt="" className="w-5 h-5 shrink-0" />
            <p className="hidden md:block whitespace-nowrap">{text}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
