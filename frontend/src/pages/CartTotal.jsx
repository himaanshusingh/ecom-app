import { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "../components/Title";

export default function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);

  return (
    <div className="w-full lg:ml-7.5">
      <div className="text-xl py-2.5">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm p-7.5 border-2 border-[#4d8890]">
        <div className="flex justify-between text-white text-[18px] p-2.5">
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between text-white text-[18px] p-2.5">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee}
          </p>
        </div>
        <hr />
        <div className="flex justify-between text-white text-[18px] p-2.5">
          <b>Total</b>
          <b>
            {currency}{" "}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
          </b>
        </div>
      </div>
    </div>
  );
}
