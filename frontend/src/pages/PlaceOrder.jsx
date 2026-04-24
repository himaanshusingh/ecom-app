import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

export default function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", street: "", city: "", state: "", zipcode: "", country: "", phone: "" }); // prettier-ignore

  const navigate = useNavigate();
  const { token, backendUrl, cartItems, setCartItems, getCartAmount, products, deliveryFee } = useContext(ShopContext); // prettier-ignore

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function initPay(order) {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const res = await axios.post(
            `${backendUrl}api/order/verify-razorpay`,
            response,
            { headers: { token } },
          );
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          }
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let orderItems = [];
      for (let items in cartItems) {
        for (let item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id == items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      switch (method) {
        case "cod":
          const res = await axios.post(
            `${backendUrl}api/order/place`,
            orderData,
            { headers: { token } },
          );
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          } else toast.error(res.data.message);
          break;
        case "stripe":
          const resStripe = await axios.post(
            `${backendUrl}api/order/stripe`,
            orderData,
            { headers: { token } },
          );
          if (resStripe.data.success) {
            const { session_url } = resStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(resStripe.data.message);
          }
          break;
        case "razorpay":
          const resRazorpay = await axios.post(
            `${backendUrl}api/order/razorpay`,
            orderData,
            { headers: { token } },
          );
          if (resRazorpay.data.success) initPay(resRazorpay.data.order);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      {/* Left Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-120">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          {[
            {
              content: "First Name",
              name: "firstName",
              value: formData.firstName,
            },
            {
              content: "Last Name",
              name: "lastName",
              value: formData.lastName,
            },
          ].map(({ name, content, value }) => (
            <input
              required
              type="text"
              name={name}
              key={content}
              value={value}
              placeholder={content}
              onChange={handleChange}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          ))}
        </div>

        {[
          {
            type: "email",
            placeholder: "Email address",
            name: "email",
            value: formData.email,
          },
          {
            type: "text",
            placeholder: "Street",
            name: "street",
            value: formData.street,
          },
        ].map(({ type, placeholder, name, value }) => (
          <input
            required
            type={type}
            name={name}
            value={value}
            key={placeholder}
            onChange={handleChange}
            placeholder={placeholder}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        ))}

        <div className="flex gap-3">
          {[
            { name: "city", content: "City", value: formData.city },
            { name: "state", content: "State", value: formData.state },
          ].map(({ name, content, value }) => (
            <input
              required
              type="text"
              name={name}
              value={value}
              key={content}
              placeholder={content}
              onChange={handleChange}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          ))}
        </div>

        <div className="flex gap-3">
          {[
            {
              type: "number",
              placeholder: "ZipCode",
              name: "zipcode",
              value: formData.zipcode,
            },
            {
              type: "text",
              placeholder: "Country",
              name: "country",
              value: formData.country,
            },
          ].map(({ type, placeholder, name, value }) => (
            <input
              required
              type={type}
              name={name}
              value={value}
              key={placeholder}
              onChange={handleChange}
              placeholder={placeholder}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          ))}
        </div>

        <input
          type="number"
          name="phone"
          value={formData.phone}
          placeholder="Phone"
          onChange={handleChange}
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
            <button className="bg-black text-white px-16 py-3 text-sm cursor-pointer">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
