import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { backendUrl, currency } from "../App";

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  async function fetchAllOrders() {
    if (!token) return null;
    try {
      const res = await axios.post(`${backendUrl}api/order/list`, {}, { headers: { token } });
      console.log(res.data)
      if (res.data.success) setOrders(res.data.orders.reverse());
      else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    } // prettier-ignore
  }

  async function statusHandler(e, orderId) {
    const { value } = e.target;
    try {
      const res = await axios.post(
        `${backendUrl}api/order/status`,
        { orderId, status: value },
        { headers: { token } },
      );
      if (res.data.success) await fetchAllOrders();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
    }
  }

  return (
    <div className="flex flex-col p-4 sm:p-10 w-full gap-4">
      <h2 className="text-xl font-semibold text-gray-800">All Orders</h2>
      <div className="flex flex-col gap-4">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 rounded-lg p-5 md:p-6 bg-white text-xs sm:text-sm text-gray-600 hover:shadow-sm transition-shadow duration-200"
            >
              {/* Parcel Icon column */}
              <div className="flex items-center gap-3 md:block">
                <img src={assets.parcel_icon} alt="Parcel" className="w-12 h-12 md:w-16 md:h-16 object-contain bg-slate-50 p-2 rounded-lg border border-gray-100" />
                <div className="md:hidden">
                  <p className="font-semibold text-gray-800">Order #{order._id.slice(-6).toUpperCase()}</p>
                  <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Items & Address details */}
              <div className="flex flex-col gap-1.5">
                <div className="font-semibold text-gray-800">
                  {order.items.map((item, idx) => (
                    <span key={idx} className="block md:inline mr-1">
                      {item.name} x {item.quantity} <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded ml-0.5">{item.size}</span>
                      {idx < order.items.length - 1 && <span className="hidden md:inline">, </span>}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-gray-700">
                  <p className="font-medium text-gray-800">{order.address.firstName} {order.address.lastName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">📞 {order.address.phone}</p>
                </div>
              </div>

              {/* Payment & Meta Details */}
              <div className="flex flex-col gap-1 md:mt-0 mt-2 border-t md:border-t-0 pt-2 md:pt-0">
                <p className="font-medium text-gray-800">Method: <span className="text-gray-600 font-normal">{order.paymentMethod}</span></p>
                <p className="font-medium text-gray-800">
                  Payment:{" "}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${order.payment ? "bg-green-50 text-green-700 border border-green-200" : "bg-yellow-50 text-yellow-700 border border-yellow-200"}`}>
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p className="hidden md:block text-xs text-gray-500 mt-1">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              {/* Amount */}
              <div className="flex items-center md:block md:mt-0 mt-1">
                <span className="md:hidden text-gray-500 mr-2 font-medium">Total:</span>
                <p className="text-base font-bold text-gray-800">{currency} {order.amount}</p>
              </div>

              {/* Order Status Select */}
              <div className="w-full md:mt-0 mt-3 border-t md:border-t-0 pt-3 md:pt-0">
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="w-full p-2 border border-gray-200 rounded-md font-semibold text-gray-700 bg-slate-50 focus:outline-pink-500 focus:bg-white transition-colors duration-200 cursor-pointer"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
