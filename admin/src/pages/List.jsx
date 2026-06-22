import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";

export default function List({ token }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    try {
      const res = await axios.get(`${backendUrl}api/product/list`);
      setList(res.data.products);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function removeProduct(id) {
    try {
      const res = await axios.post(`${backendUrl}api/product/remove`, { id }, { headers: { token } });
      toast.success(res.data.message);
      await fetchList();
    } catch (err) {
      toast.error(err.message);
    }
  } // prettier-ignore

  return (
    <div className="flex flex-col p-4 sm:p-10 w-full gap-4">
      <h2 className="text-xl font-semibold text-gray-800">All Products List</h2>
      
      <div className="w-full flex flex-col gap-3">
        {/* Desktop Header */}
        <div className="hidden md:grid md:grid-cols-[1fr_3fr_1.5fr_1.2fr_0.8fr] items-center py-3 px-4 border border-gray-200 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product List */}
        <div className="flex flex-col gap-3">
          {list.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No products found.</p>
          ) : (
            list.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:grid md:grid-cols-[1fr_3fr_1.5fr_1.2fr_0.8fr] items-start md:items-center gap-3 md:gap-4 p-4 md:py-3 md:px-4 border border-gray-200 rounded-lg text-sm hover:shadow-sm transition-shadow duration-200 bg-white relative"
              >
                {/* Product Image & basic details for mobile, separate cols for desktop */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <img
                    src={item?.images?.[0] || ""}
                    alt={item.name}
                    className="w-12 h-12 md:w-10 md:h-10 object-cover rounded-md border border-gray-200 bg-slate-50"
                  />
                  <div className="md:hidden flex-1">
                    <p className="font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                    <p className="font-medium text-pink-600 mt-0.5">{currency}{item.price}</p>
                  </div>
                </div>

                {/* Desktop-only displays */}
                <p className="hidden md:block font-medium text-gray-800 line-clamp-2">{item.name}</p>
                <p className="hidden md:block text-gray-600">{item.category}</p>
                <p className="hidden md:block font-medium text-gray-800">{currency}{item.price}</p>

                {/* Action button - styled as a delete icon/text */}
                <button
                  onClick={() => removeProduct(item._id)}
                  className="absolute bottom-4 right-4 md:static md:mx-auto p-1.5 rounded-full hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                  title="Remove Item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
