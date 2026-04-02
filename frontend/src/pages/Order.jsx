import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import Title from "../components/Title";

export default function Order(){
  const [orderData, setOrderData] = useState([]);
  const { currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    loadOrderData();
  }, []);

  async function loadOrderData() {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/userorders",
        {},
        { withCredentials: true },
      );
      if (result.data) {
        let allOrdersItem = [];
        result.data.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[99vw] min-h-screen p-5 pb-37.5  overflow-hidden bg-linear-to-l from-[#141414] to-[#0c2025] ">
      <div className="h-[8%] w-full text-center mt-20">
        <Title text1={"MY"} text2={"ORDER"} />
      </div>
      <div className=" w-full h-[92%] flex flex-wrap gap-5">
        {orderData.map((item, index) => (
          <div key={index} className="w-full h-[10%] border-t border-b ">
            <div className="w-full h-[80%] flex items-start gap-6 bg-[#51808048]  py-2.5 px-5 rounded-2xl relative ">
              <img
                src={item.image1}
                alt=""
                className="w-32.5 h-32.5 rounded-md "
              />
              <div className="flex items-start justify-center flex-col gap-1.25">
                <p className="md:text-[25px] text-5 text-[#f3f9fc]">
                  {item.name}
                </p>
                <div className="flex items-center gap-2   md:gap-5">
                  <p className="md:text-[18px] text-[12px] text-[#aaf4e7]">
                    {currency} {item.price}
                  </p>
                  <p className="md:text-[18px] text-[12px] text-[#aaf4e7]">
                    Quantity: {item.quantity}
                  </p>
                  <p className="md:text-[18px] text-[12px] text-[#aaf4e7]">
                    Size: {item.size}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="md:text-[18px] text-[12px] text-[#aaf4e7]">
                    Date:{" "}
                    <span className="text-[#e4fbff] pl-2.5 md:text-[16px] text-[11px]">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="md:text-[16px] text-[12px] text-[#aaf4e7]">
                    Payment Method :{item.paymentMethod}
                  </p>
                </div>
                <div className="absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%]  ">
                  <div className="flex items-center gap-1.25">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="md:text-[17px] text-2.5 text-[#f3f9fc]">
                      {item.status}
                    </p>
                  </div>
                </div>
                <div className="absolute md:right-[5%] right-[1%] md:top-[40%] top-[70%]">
                  <button
                    className="md:px-3.75 px-1.25 py-0.75 md:py-1.75 rounded-md bg-[#101919] text-[#f3f9fc] text-[12px] md:text-[16px] cursor-pointe active:bg-slate-500"
                    onClick={loadOrderData}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
