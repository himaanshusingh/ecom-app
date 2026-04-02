import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { SiEbox } from "react-icons/si";

import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { authDataContext } from "../context/AuthContext";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  async function fetchAllOrders() {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/list",
        {},
        { withCredentials: true },
      );
      setOrders(result.data.reverse());
    } catch (error) {
      console.log(error);
    }
  }

  async function statusHandler(e, orderId) {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { withCredentials: true },
      );
      if (result.data) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-[99vw] min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-[white]">
      <Navbar />
      <div className="w-full h-full flex items-center lg:justify-start justify-center">
        <SideBar />
        <div className="lg:w-[85%] md:w-[70%] h-full lg:ml-77.5 md:ml-62.5 mt-17.5 flex flex-col gap-7.5 overflow-x-hidden py-12.5 ml-25">
          <div className="w-100 h-12.5 text-[28px] md:text-[40px] mb-5 text-white">
            All Orders List
          </div>
          {orders.map((order, index) => (
            <div
              key={index}
              className="w-[90%] h-[40%] bg-slate-600 rounded-xl flex lg:items-center items-start justify-between  flex-col lg:flex-row p-2.5 md:px-5  gap-5"
            >
              <SiEbox className="w-15 h-15 text-[black] p-1.25 rounded-lg bg-[white]" />

              <div>
                <div className="flex items-start justify-center flex-col gap-1.25 text-[16px] text-[#56dbfc]">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p key={index}>
                          {item.name.toUpperCase()} * {item.quantity}{" "}
                          <span>{item.size}</span>
                        </p>
                      );
                    } else {
                      return (
                        <p key={index}>
                          {item.name.toUpperCase()} * {item.quantity}{" "}
                          <span>{item.size}</span>,
                        </p>
                      );
                    }
                  })}
                </div>

                <div className="text-[15px] text-green-100">
                  <p>
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <p>{order.address.street + ", "}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.pinCode}
                  </p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
              <div className="text-[15px] text-green-100">
                <p>Items : {order.items.length}</p>
                <p>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-[20px] text-[white]"> ₹ {order.amount}</p>
              </div>
              <select
                value={order.status}
                className="px-1.25 py-2.5 bg-slate-500 rounded-lg border border-[#96eef3]"
                onChange={(e) => statusHandler(e, order._id)}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
