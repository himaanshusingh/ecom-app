import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  async function verifyPament() {
    try {
      if (!token) return null;
      const res = await axios.post(
        `${backendUrl}api/order/verify-stripe`,
        { success, orderId },
        { headers: { token } },
      );

      if (res.data.success) {
        setCartItems({});
        navigate("/orders");
      } else navigate("/cart");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <div>
      <h1>Verify</h1>
    </div>
  );
};

export default Verify;
