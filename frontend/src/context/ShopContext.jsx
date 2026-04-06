import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { products } from "../assets/assets";

export const ShopContext = createContext();

export default function ShopContextProvider({ children }) {
  const currency = "₹";
  const deliveryFee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

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
  }

  function getCartAmount() {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalAmount;
  }

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
  };

  return (
    <>
      <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
    </>
  );
}
