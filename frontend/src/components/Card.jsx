import { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

export default function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  return (
    <div
      className="w-75 max-w-[90%] h-100 bg-[#ffffff0a] backdrop:blur-lg rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-2.5 cursor-pointer border border-[#80808049]"
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      <img src={image} className="w-full h-[80%] rounded-sm object-cover " />
      <div className="text-[#c3f6fa] text-[18px] py-2.5">{name}</div>
      <div className="text-[#f3fafa] text-[14px] ">
        {currency} {price}
      </div>
    </div>
  );
}
