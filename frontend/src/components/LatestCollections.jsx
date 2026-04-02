import { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";
import Card from "./Card";

export default function LatestCollection() {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <div>
      <div className="h-[8%] w-full text-center md:mt-12.5  ">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-full m-auto text-[13px] md:text-[20px] px-2.5 text-blue-100 ">
          Step Into Style - New Collection Dropping This Season!
        </p>
      </div>
      <div className="w-full h-[50%] mt-7.5 flex items-center justify-center flex-wrap gap-12.5">
        {latestProducts.map(({ _id, name, image1, price }, index) => (
          <Card key={index} name={name} image={image1} id={_id} price={price} />
        ))}
      </div>
    </div>
  );
}
