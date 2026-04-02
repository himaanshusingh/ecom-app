import { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { shopDataContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "./CartTotal";

export default function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="w-[99vw] min-h-screen p-5 overflow-hidden bg-linear-to-l from-[#141414] to-[#0c2025] ">
      <div className="h-[8%] w-full text-center mt-20">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="w-full h-[92%] flex flex-wrap gap-5">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id,
          );

          return (
            <div key={index} className="w-full h-[10%] border-t border-b  ">
              <div className="w-full h-[80%] flex items-start gap-6 bg-[#51808048]  py-2.5 px-5 rounded-2xl relative ">
                <img
                  className="w-25 h-25 rounded-md "
                  src={productData.image1}
                  alt=""
                />
                <div className="flex items-start justify-center flex-col gap-2.5">
                  <p className="md:text-[25px] text-5 text-[#f3f9fc]">
                    {productData.name}
                  </p>
                  <div className="flex items-center   gap-5">
                    <p className="text-5 text-[#aaf4e7]">
                      {currency} {productData.price}
                    </p>
                    <p
                      className="w-10 h-10 text-[16px] text-[white] 
                      bg-[#518080b4] rounded-md mt-1.25 flex items-center justify-center border border-[#9ff9f9]"
                    >
                      {item.size}
                    </p>
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className=" md:max-w-20 max-w-10 md:px-2 md:py-2 py-1.25 px-2.5 text-[white] text-[18px] font-semibold bg-[#518080b4] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border border-[#9ff9f9] rounded-md "
                  onChange={(e) =>
                    e.target.value === " " || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value),
                        )
                  }
                />

                <RiDeleteBin6Line
                  className="text-[#9ff9f9] w-6.25 h-6.25 absolute top-[50%] md:top-[40%] md:right-[5%] right-1"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-start items-end my-20">
        <div className="w-full sm:w-112.5">
          <CartTotal />
          <button
            className="text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-2.5 px-12.5 rounded-2xl text-white flex items-center justify-center gap-5  border border-[#80808049] ml-7.5 mt-5"
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder");
              } else {
                console.log("Your cart is empty!");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
