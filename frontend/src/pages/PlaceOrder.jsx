import { useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* Left Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-120">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          {["First Name", "Last Name"].map((item) => (
            <input
              type="text"
              key={item}
              placeholder={item}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          ))}
        </div>

        {[
          { type: "email", placeholder: "Email address" },
          { type: "text", placeholder: "Street" },
        ].map(({ type, placeholder }) => (
          <input
            type={type}
            key={placeholder}
            placeholder={placeholder}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        ))}

        <div className="flex gap-3">
          {["City", "State"].map((item) => (
            <input
              type="text"
              key={item}
              placeholder={item}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          ))}
        </div>

        <div className="flex gap-3">
          {[
            { type: "number", placeholder: "ZipCode" },
            { type: "text", placeholder: "Country" },
          ].map(({ type, placeholder }) => (
            <input
              type={type}
              key={placeholder}
              placeholder={placeholder}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          ))}
        </div>

        <input
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* Right Side Section */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        {/* Payment Method Selection */}
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex gap-3.5 flex-col lg:flex-row">
            {[
              { logo: assets.stripe_logo, payMethod: "stripe" },
              { logo: assets.razorpay_logo, payMethod: "razorpay" },
              { logo: "CASH ON DELIVERY", payMethod: "cod" },
            ].map(({ logo, payMethod }) => (
              <div key={payMethod} onClick={() => setMethod(payMethod)}>
                {/* prettier-ignore */}
                <div className="flex items-center gap-1 border p-2 px-3 cursor-pointer">
                  <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method == payMethod ? "bg-green-400" : ""}`}
                  ></p>
                  {logo !== "CASH ON DELIVERY" ? <img className="h-5 mx-4" src={logo} alt="" /> : (
                    <p className="text-gray-500 text-sm font-medium mx-4 ">CASH ON DELIVERY</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={() => navigate("/orders")}
              className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
