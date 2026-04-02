import axios from "axios";
import { useContext, useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { authDataContext } from "../context/AuthContext";

export default function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const { serverUrl } = useContext(authDataContext);

  async function fetchCounts() {
    try {
      const products = await axios.get(
        `${serverUrl}/api/product/list`,
        {},
        { withCredentials: true },
      );
      setTotalProducts(products.data.length);

      const orders = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true },
      );
      setTotalOrders(orders.data.length);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  }

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="w-full h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-[white] relative">
      <Navbar />
      <SideBar />

      <div className="w-[70vw] h-screen absolute left-[25%] flex items-Start justify-start flex-col  gap-10 py-25">
        <h1 className="text-[35px] text-[#afe2f2]">OneCart Admin Panel</h1>
        <div className="flex items-center justify-start gap-12.5 flex-col md:flex-row">
          <div className="text-[#dcfafd] w-100 max-w-[90%] h-50 bg-[#0000002e] flex items-center justify-center flex-col gap-5 rounded-lg shadow-sm shadow-black backdrop:blur-lg  md:text-[25px] text-5 border border-[#969595]">
            Total No. of Products :{" "}
            <span className="px-5 py-2.5 bg-[#030e11] rounded-lg flex items-center justify-center border border-[#969595]">
              {totalProducts}
            </span>
          </div>
          <div className="text-[#dcfafd] w-100 max-w-[90%] h-50 bg-[#0000002e] flex items-center justify-center flex-col gap-5 rounded-lg shadow-sm shadow-black backdrop:blur-lg  md:text-[25px] text-5 border border-[#969595]">
            Total No. of Orderss :{" "}
            <span className="px-5 py-2.5 bg-[#030e11] rounded-lg flex items-center justify-center border border-[#969595]">
              {totalOrders}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
