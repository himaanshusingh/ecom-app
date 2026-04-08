import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { products, currency } = useContext(ShopContext);
  const { cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  function handleChange(e, _id, size) {
    const { value } = e.target;
    if (value === "" || value === "0") return null;
    else updateQuantity(_id, size, +value);
  }

  return (
    <div className="pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item) => {
          const { _id, size, quantity } = item;
          const productData = products.find((product) => product._id === _id);
          const { name, price, images } = productData;

          return (
            <div
              key={_id}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img src={images[0]} className="w-16 sm:w-20" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{name}</p>
                  <div className="flex items-center mt-2 flex-row gap-5">
                    <p>{`${currency} ${price}`}</p>
                    <p className="w-10 px-2 sm:px-3 sm:py-1 border bg-slate-50 text-center">
                      {size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                min={1}
                type="number"
                defaultValue={quantity}
                onChange={(e) => handleChange(e, _id, size)}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              />
              <img
                alt=""
                src={assets.bin_icon}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                onClick={() => updateQuantity(_id, size, 0)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-112.5">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
