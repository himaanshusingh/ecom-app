import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useState } from "react";
import uploadImage from "../assets/upload image.jpg";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import Loading from "../components/Loading";

export default function Add() {
  let [image1, setImage1] = useState();
  let [image2, setImage2] = useState(false);
  let [image3, setImage3] = useState(false);
  let [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);

  async function handleAddProduct(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      let result = await axios.post(
        serverUrl + "/api/product/addproduct",
        formData,
        { withCredentials: true },
      );
      console.log(result.data);
      setLoading(false);

      if (result.data) {
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("TopWear");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative">
      <Navbar />
      <SideBar />

      <div className="w-[82%] h-full flex items-center justify-start overflow-x-hidden absolute  right-0 bottom-[5%] ">
        <form
          action=""
          onSubmit={handleAddProduct}
          className="w-full md:w-[90%] h-full  mt-17.5 flex flex-col gap-7.5 py-22.5 px-7.5 md:px-15"
        >
          <div className="w-100 h-12.5 text-[25px] md:text-[40px] text-white">
            Add Product Page
          </div>

          <div className="w-full h-full flex items-center justify-start ">
            <p className="text-[20px] md:text-[25px]  font-semibold">
              Upload Images
            </p>
            <div className="w-full h-full flex items-center justify-start ">
              <label
                htmlFor="image1"
                className=" w-16.25 h-16.25 md:w-25 md:h-25 cursor-pointer hover:border-[#46d1f7]"
              >
                <img
                  src={!image1 ? uploadImage : URL.createObjectURL(image1)}
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-2"
                />
                <input
                  type="file"
                  id="image1"
                  hidden
                  onChange={(e) => setImage1(e.target.files[0])}
                  required
                />
              </label>
              <label
                htmlFor="image2"
                className=" w-16.25 h-16.25 md:w-25 md:h-25 cursor-pointer hover:border-[#46d1f7]"
              >
                <img
                  src={!image2 ? uploadImage : URL.createObjectURL(image2)}
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-2"
                />
                <input
                  type="file"
                  id="image2"
                  hidden
                  onChange={(e) => setImage2(e.target.files[0])}
                  required
                />
              </label>
              <label
                htmlFor="image3"
                className=" w-16.25 h-16.25 md:w-25 md:h-25 cursor-pointer hover:border-[#46d1f7]"
              >
                <img
                  src={!image3 ? uploadImage : URL.createObjectURL(image3)}
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-2"
                />
                <input
                  type="file"
                  id="image3"
                  hidden
                  onChange={(e) => setImage3(e.target.files[0])}
                  required
                />
              </label>
              <label
                htmlFor="image4"
                className=" w-16.25 h-16.25 md:w-25 md:h-25 cursor-pointer hover:border-[#46d1f7]"
              >
                <img
                  src={!image4 ? uploadImage : URL.createObjectURL(image4)}
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-2"
                />
                <input
                  type="file"
                  id="image4"
                  hidden
                  onChange={(e) => setImage4(e.target.files[0])}
                  required
                />
              </label>
            </div>
          </div>

          <div className="w-[80%] h-25 flex items-start justify-center flex-col  gap-2.5">
            <p className="text-[20px] md:text-[25px]  font-semibold">
              Product Name
            </p>
            <input
              type="text"
              placeholder="Type here"
              className="w-150 max-w-[98%] h-10 rounded-lg hover:border-[#46d1f7] border-2 cursor-pointer bg-slate-600 px-5 text-[18px] placeholder:text-[#ffffffc2]"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="w-[80%] flex items-start justify-center flex-col  gap-2.5">
            <p className="text-5 md:text-[25px]  font-semibold">
              Product Description
            </p>
            <textarea
              type="text"
              placeholder="Type here"
              className="w-150 max-w-[98%] h-25 rounded-lg hover:border-[#46d1f7] border-2 cursor-pointer bg-slate-600 px-5 py-2.5 text-[18px] placeholder:text-[#ffffffc2]"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>

          <div className="w-[80%]  flex items-center  gap-2.5 flex-wrap ">
            <div className="md:w-[30%] w-full flex items-start sm:justify-center flex-col  gap-2.5">
              <p className="text-[20px] md:text-[20px]  font-semibold w-full">
                Product Category
              </p>
              <select
                name=""
                id=""
                className="bg-slate-600 w-[60%] px-2.5 py-1.75 rounded-lg hover:border-[#46d1f7] border-2 "
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="md:w-[30%] w-full flex items-start sm:justify-center flex-col  gap-2.5">
              <p className="text-[20px] md:text-[20px]  font-semibold w-full">
                Sub-Category
              </p>
              <select
                name=""
                id=""
                className="bg-slate-600 w-[60%] px-2.5 py-1.75 rounded-lg hover:border-[#46d1f7] border-2 "
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          <div className="w-[80%] h-25 flex items-start justify-center flex-col  gap-2.5">
            <p className="text-[20px] md:text-[25px]  font-semibold">
              Product Price
            </p>
            <input
              type="number"
              placeholder="₹ 2000"
              className="w-150 max-w-[98%] h-10 rounded-lg hover:border-[#46d1f7] border-2 cursor-pointer bg-slate-600 px-5 text-[18px] placeholder:text-[#ffffffc2]"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="w-[80%] h-55 md:h-25 flex items-start justify-center flex-col gap-2.5 py-2.5 md:py-0">
            <p className="text-5 md:text-[25px]  font-semibold">
              Product Size
            </p>

            <div className="flex items-center justify-start gap-3.75 flex-wrap">
              <div
                className={`px-5 py-1.75 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("S") ? "bg-green-400 text-black border-[#46d1f7]" : ""}`}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("S")
                      ? prev.filter((item) => item !== "S")
                      : [...prev, "S"],
                  )
                }
              >
                S
              </div>

              <div
                className={`px-5 py-1.75 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("M") ? "bg-green-400 text-black border-[#46d1f7]" : ""}`}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("M")
                      ? prev.filter((item) => item !== "M")
                      : [...prev, "M"],
                  )
                }
              >
                M
              </div>

              <div
                className={`px-5 py-1.75 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("L") ? "bg-green-400 text-black border-[#46d1f7]" : ""}`}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("L")
                      ? prev.filter((item) => item !== "L")
                      : [...prev, "L"],
                  )
                }
              >
                L
              </div>

              <div
                className={`px-5 py-1.75 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("XL") ? "bg-green-400 text-black border-[#46d1f7]" : ""}`}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("XL")
                      ? prev.filter((item) => item !== "XL")
                      : [...prev, "XL"],
                  )
                }
              >
                XL
              </div>

              <div
                className={`px-5 py-1.75 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("XXL") ? "bg-green-400 text-black border-[#46d1f7]" : ""}`}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("XXL")
                      ? prev.filter((item) => item !== "XXL")
                      : [...prev, "XXL"],
                  )
                }
              >
                XXL
              </div>
            </div>
          </div>

          <div className="w-[80%] flex items-center justify-start gap-2.5 mt-5">
            <input
              type="checkbox"
              id="checkbox"
              className="w-6.25 h-6.25 cursor-pointer"
              onChange={() => setBestSeller((prev) => !prev)}
            />
            <label
              htmlFor="checkbox"
              className="text-[18px] md:text-[22px]  font-semibold"
            >
              Add to BestSeller
            </label>
          </div>

          <button className="w-35 px-5 py-5 rounded-xl bg-[#65d8f7] flex items-center justify-center gap-2.5 text-black active:bg-slate-700 active:text-white active:border-2 border-white">
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
