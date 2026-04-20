import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext();

export default function ShopContextProvider({ children }) {
  const currency = "$";
  const deliveryFee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    getProductsData();
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  async function addToCart(itemId, size) {
    if (!size) return toast.error("Select Product Size");
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else cartData[itemId][size] = 1;
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/cart/add",
          { itemId, size },
          { headers: { token } },
        );
        toast.success(res.data.message);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  }

  function getCartCount() {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) totalCount += cartItems[items][item];
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalCount;
  }

  async function updateQuantity(itemId, size, quantity) {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          "http://localhost:3000/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } },
        );
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  }

  function getCartAmount() {
    let totalAmount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          let itemInfo = products.find((product) => product._id === items);
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (err) {
          // console.log(err);
        }
      }
    }
    return totalAmount;
  }

  async function getProductsData() {
    try {
      const res = await axios.get("http://localhost:3000/api/product/list");
      setProducts(res.data.products);
      toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function getUserCart(token) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/cart/get",
        {},
        { headers: { token } },
      );
      setCartItems(res.data.cartData);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  const value = { products, currency, deliveryFee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, backendUrl, token, setToken }; // prettier-ignore

  return (
    <>
      <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
    </>
  );
}
