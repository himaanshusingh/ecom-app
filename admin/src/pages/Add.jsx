import { useState } from "react";
import { assets } from "../assets/assets.js";

export default function Add() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  return (
    <form className="flex flex-col m-10 items-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {["image1", "image2", "image3", "image4"].map(
            (item, index) =>
            <label htmlFor={item} key={item}>
              <img alt="" className="w-20" src={!images[index] ? assets.upload_area : URL.createObjectURL(images[index]) } />
              <input hidden type="file" id={item} onChange={(e) => setImages((prev) => [...prev, e.target.files[0]])} />
            </label>,
            // prettier-ignore
          )}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          required
          type="text"
          value={name}
          placeholder="Type here"
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-125 px-3 py-2"
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          required
          type="text"
          value={description}
          placeholder="Write description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-125 px-3 py-2"
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        {[
          { para: "Product Category", options: ["Men", "Women", "Kids"] },
          { para: "Product Sub Category", options: ["Topwear", "Bottomwear", "Winterwear"]}, // prettier-ignore
        ].map(({ para, options }) => (
          <div key={para}>
            <p className="mb-2">{para}</p>
            <select
              value={para == "Product Category" ? category : subCategory}
              className="w-full px-3 py-1 cursor-pointer"
              onChange={(e) =>
                para == "Product Category"
                  ? setCategory(e.target.value)
                  : setSubCategory(e.target.value)
              }
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div>
          <p className="mb-2">Product Price</p>
          <input
            type="number"
            value={price}
            placeholder="25"
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-1 sm:w-30"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL"].map((size) => (
            <div key={size}>
              <p className="bg-slate-200 px-3 py-1 cursor-pointer">{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          id="bestseller"
          type="checkbox"
          onChange={() => setBestSeller(!bestseller)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to BestSeller
        </label>
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white cursor-pointer">
        ADD
      </button>
    </form>
  );
}
