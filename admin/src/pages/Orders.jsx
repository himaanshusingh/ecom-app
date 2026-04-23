import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  async function fetchAllOrders() {
    if (!token) return null;
    try {
      const res = await axios.post(
        "http://localhost:3000/api/order/list",
        {},
        { headers: { token } },
      );
      if (res.data.success) setOrders(res.data.orders);
      else toast.error(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h2>Orders</h2>
    </div>
  );
}
