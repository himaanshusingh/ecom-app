import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";

export default function List({ token }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchList();
  }, [list]);

  async function fetchList() {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      setList(res.data.products);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function removeProduct(id) {
    try {
      const res = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } });
      toast.success(res.data.message);
      await fetchList();
    } catch (err) {
      toast.error(err.message);
    }
  } // prettier-ignore

  return (
    <div className="flex flex-col p-10 items-start gap-3 md:min-w-[82%]">
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2 md:min-w-full h-120 overflow-scroll overflow-x-hidden">
        {/* List Table Title */}
        <div className="hidden md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm"
          >
            <img
              src={item?.images[0]}
              alt=""
              className="w-10 h-10 object-cover"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{`${currency} ${item.price}`}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
