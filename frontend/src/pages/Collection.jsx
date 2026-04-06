import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

export default function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    applyFilters();
  }, [category, subCategory, search, showSearch]);

  function toggleCategory(e, section) {
    const { value } = e.target;
    if (category.includes(value) && section === "CATEGORIES") {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else if (subCategory.includes(value) && section === "TYPE") {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else if (section === "TYPE") {
      setSubCategory((prev) => [...prev, value]);
    } else setCategory((prev) => [...prev, value]);
  }

  function applyFilters() {
    let productsCopy = JSON.parse(JSON.stringify(products));

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    } else if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }
    setFilterProducts(productsCopy);
  }

  function sortProducts(e) {
    const { value } = e.target;
    let fpCopy = JSON.parse(JSON.stringify(filterProducts));
    switch (value) {
      case "low-high":
        return setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
      case "high-low":
        return setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
      default:
        return applyFilters();
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
      {/* Filter Options Left Side */}
      <div className="min-w-60">
        <div
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          <p>FILTERS</p>
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </div>

        {/* Category & SubCategory Filter */}
        {[
          { section: "CATEGORIES", values: ["Men", "Women", "Kids"] },
          { section: "TYPE", values: ["Topwear", "Bottomwear", "Winterwear"] },
        ].map(({ section, values }) => (
          <div
            key={section}
            className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
          >
            <p className="mb-3 text-sm font-medium">{section}</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {values.map((currentValue) => (
                <div className="flex gap-2" key={currentValue}>
                  <input
                    className="w-3"
                    type="checkbox"
                    onChange={(e) => toggleCategory(e, section)}
                    value={currentValue}
                  />
                  <p>{currentValue}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* All Collections Right Side  */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-3">
          <Title text1="ALL" text2="COLLECTIONS" />
          {/* Product Sort */}
          <select
            onChange={sortProducts}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map(({ _id, image, name, price }) => (
            <div key={_id}>
              <ProductItem id={_id} image={image} name={name} price={price} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
