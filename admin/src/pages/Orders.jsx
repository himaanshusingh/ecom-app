import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const currency = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  async function fetchAllOrders() {
    if (!token) return null;
    try {
      const res = await axios.post(`${backendUrl}api/order/list`, {}, { headers: { token } });
      console.log(res.data)
      if (res.data.success) setOrders(res.data.orders);
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
      toast.error(res.data.message);
    }
  }

  return (
    <div>
      {orders.map((order, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:m-10 text-xs sm:text-sm text-gray-700"
        >
          <img src={assets.parcel_icon} alt="" className="w-12" />
          <div>
            <div>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return <p className="py-0.5" key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                } else {
                  return <p className="py-0.5" key={index}>{item.name} X {item.quantity} <span>{item.size}</span>,</p>
                } // prettier-ignore
              })}
            </div>
            <p className="mt-3 mb-2 font-medium">{`${order.address.firstName} ${order.address.lastName}`}</p>
            <div>
              <p>{order.address.street + ", "}</p>
              <p>
                {`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
              </p>
            </div>
            <p>{order.address.phone}</p>
          </div>
          <div>
            <p className="text-sm sm:text-[15px]">
              Items: {order.items.length}
            </p>
            <p className="mt-3">Method: {order.paymentMethod}</p>
            <p>Payment: {order.payment ? "Done" : "Pending"}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <p className="text-sm sm:text-[15px]">{`${currency} ${order.amount}`}</p>
          <select
            onChange={(e) => statusHandler(e, order._id)}
            value={order.status}
            className="p-2 font-semibold"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}
