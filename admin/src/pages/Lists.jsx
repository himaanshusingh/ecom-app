import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { authDataContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

export default function Lists() {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  async function fetchList() {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      setList(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeList(id) {
    try {
      let result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true },
      );
      if (result.data) fetchList();
      else console.log("Failed to remove Product");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-[white]">
      <Navbar />
      <div className="w-full h-full flex items-center justify-start">
        <SideBar />

        <div className="w-[82%] h-full lg:ml-80 md:ml-57.5 mt-17.5 flex flex-col gap-7.5 overflow-x-hidden py-12.5 ml-25">
          <div className="w-100 h-12.5 text-[28px] md:text-[40px] mb-5 text-white">
            All Listed Products
          </div>

          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                className="w-[90%] md:h-30 h-22.5 bg-slate-600 rounded-xl flex items-center justify-start gap-1.25 md:gap-7.5 p-2.5 md:px-7.5"
                key={index}
              >
                <img
                  src={item.image1}
                  className="w-[30%] md:w-30 h-[90%] rounded-lg"
                  alt=""
                />
                <div className="w-[90%] h-[80%] flex flex-col items-start justify-center gap-0.5">
                  <div className="w-full md:text-[20px] text-[15px] text-[#bef0f3]">
                    {item.name}
                  </div>
                  <div className="md:text-[17px] text-[15px] text-[#bef3da]">
                    {item.category}
                  </div>
                  <div className="md:text-[17px] text-[15px] text-[#bef3da]">
                    ₹{item.price}
                  </div>
                </div>
                <div className="w-[10%] h-full bg-transparent flex items-center justify-center">
                  <span
                    className="w-8.75 h-[30%] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer"
                    onClick={() => removeList(item._id)}
                  >
                    X
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-lg">No products available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
