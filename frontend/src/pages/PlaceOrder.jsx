import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import { shopDataContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "./CartTotal";
import razorpay from "../assets/pictures/Razorpay.jpg";
import Loading from "../components/Loading";

export default function PlaceOrder() {
  let [method, setMethod] = useState("cod");
  let navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);
  let [loading, setLoading] = useState(false);

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  function initPay(order) {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        const { data } = await axios.post(
          serverUrl + "/api/order/verifyrazorpay",
          response,
          { withCredentials: true },
        );
        if (data) {
          navigate("/order");
          setCartItem({});
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        case "cod":
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true },
          );
          console.log(result.data);
          if (result.data) {
            setCartItem({});
            toast.success("Order Placed");
            navigate("/order");
            setLoading(false);
          } else {
            console.log(result.data.message);
            toast.error("Order Placed Error");
            setLoading(false);
          }

          break;

        case "razorpay":
          const resultRazorpay = await axios.post(
            serverUrl + "/api/order/placeorderrazorpay",
            orderData,
            { withCredentials: true },
          );
          if (resultRazorpay.data) {
            initPay(resultRazorpay.data);
            toast.success("Order Placed");
            setLoading(false);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-12.5  relative">
      <div className="lg:w-[50%] w-full h-full flex items-center justify-center  lg:mt-0 mt-22.5">
        <form
          onSubmit={handleSubmit}
          className="lg:w-[70%] w-[95%] lg:h-[70%] h-full"
        >
          <div className="py-2.5">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className="w-full h-17.5 flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="First name"
              className="w-[48%] h-12.5 rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-5 shadow-sm shadow-[#343434]"
              required
              onChange={handleChange}
              name="firstName"
              value={formData.firstName}
            />

            <input
              type="text"
              placeholder="Last name"
              className="w-[48%] h-12.5 rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-5"
              required
              onChange={handleChange}
              name="lastName"
              value={formData.lastName}
            />
          </div>

          <div className="w-full h-17.5 flex items-center justify-between px-2.5">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-12.5 rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-5"
              required
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
          </div>
          <div className="w-full h-17.5 flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="Street"
              className="w-full h-12.5 rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-5"
              required
              onChange={handleChange}
              name="street"
              value={formData.street}
            />
          </div>
          <div className="w-full h-17.5 flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="City"
              className="w-[48%] h-12.5 rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-5"
              required
              onChange={handleChange}
              name="city"
              value={formData.city}
            />
            <input
              type="text"
              placeholder="State"
              className="w-[48%] h-12.5 rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-5"
              required
              onChange={handleChange}
              name="state"
              value={formData.state}
            />
          </div>
          <div className="w-full h-17.5 flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="Pincode"
              className="w-[48%] h-12.5 rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-5"
              required
              onChange={handleChange}
              name="pinCode"
              value={formData.pinCode}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-[48%] h-12.5 rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-5"
              required
              onChange={handleChange}
              name="country"
              value={formData.country}
            />
          </div>
          <div className="w-full h-17.5 flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="Phone"
              className="w-full h-12.5 rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-5"
              required
              onChange={handleChange}
              name="phone"
              value={formData.phone}
            />
          </div>
          <div>
            <button
              type="submit"
              className="text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-2.5 px-12.5 rounded-2xl text-white flex items-center justify-center gap-5 absolute lg:right-[20%] bottom-[10%] right-[35%] border border-[#80808049] ml-7.5 mt-5"
            >
              {loading ? <Loading /> : "PLACE ORDER"}
            </button>
          </div>
        </form>
      </div>
      <div className="lg:w-[50%] w-full min-h-full flex items-center justify-center gap-7.5 ">
        <div className="lg:w-[70%] w-[90%] lg:h-[70%] h-full  flex items-center justify-center gap-2.5 flex-col">
          <CartTotal />
          <div className="py-2.5">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>
          <div className="w-full h-[20vh] lg:h-37.5 flex items-start mt-5 lg:mt-0 justify-center gap-12.5">
            <button
              onClick={() => setMethod("razorpay")}
              className={`w-37.5 h-12.5 rounded-sm  ${method === "razorpay" ? "border-[5px] border-blue-900 rounded-sm" : ""}`}
            >
              <img
                src={razorpay}
                className="w-full h-full object-fill rounded-sm "
                alt=""
              />
            </button>
            <button
              onClick={() => setMethod("cod")}
              className={`w-45 h-12.5 bg-linear-to-t from-[#95b3f8] to-[white] text-[14px] px-0 rounded-sm text-[#332f6f] font-bold ${method === "cod" ? "border-[5px] border-blue-900 rounded-sm" : ""}`}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
