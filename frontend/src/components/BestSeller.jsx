import { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";
import Card from "./Card";

export default function BestSeller() {
  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filterProduct = products.filter((item) => item.bestseller);
    setBestSeller(filterProduct.slice(0, 4));
  }, [products]);

  return (
    <div>
      <div className="h-[8%] w-full text-center mt-12.5 ">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-full m-auto text-[13px] md:text-[20px] px-2.5 text-blue-100">
          Tried, Tested, Loved - Discover Our All-Time Best Sellers.
        </p>
      </div>
      <div className="w-full h-[50%] mt-7.5 flex items-center justify-center flex-wrap gap-12.5">
        {bestSeller.map(({ _id, name, price, image1 }, index) => (
          <Card key={index} name={name} id={_id} price={price} image={image1} />
        ))}
      </div>
    </div>
  );
}
