import { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";
import Card from "./Card";

const RelatedProduct = ({ category, subCategory, currentProductId }) => {
  let { products } = useContext(shopDataContext);
  let [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => {
        return subCategory === item.subCategory;
      });
      productsCopy = productsCopy.filter((item) => {
        return currentProductId !== item._id;
      });
      setRelated(productsCopy.slice(0, 4));
    }
  }, [products, category, subCategory, currentProductId]);

  return (
    <div className="my-32.5 md:my-10  md:px-15 ">
      <div className="ml-5 lg:ml-20">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="w-full  mt-7.5 flex items-center justify-center flex-wrap gap-12.5">
        {related.map(({ _id, name, price, image1 }, index) => (
          <Card key={index} id={_id} name={name} price={price} image={image1} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
