import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import { FaStar, FaStarHalfAlt } from "react-icons/fa"


import RelatedProduct from '../components/RelatedProduct'
import Loading from '../components/Loading'

function ProductDetail() {
  const { productId } = useParams()
  const { products, currency, addtoCart, loading } = useContext(shopDataContext)

  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find(item => String(item._id) === String(productId))
      if (foundProduct) {
        setProductData(foundProduct)
        setImage1(foundProduct.image1)
        setImage2(foundProduct.image2)
        setImage3(foundProduct.image3)
        setImage4(foundProduct.image4)
        setImage(foundProduct.image1)
      }
    }
  }, [productId, products])

  if (!productData) return <div className="opacity-0"></div>

  return (
    <div className="bg-gradient-to-l from-[#141414] to-[#0c2025] min-h-screen w-full flex flex-col items-center text-white">
      {/* --- PRODUCT IMAGE SECTION --- */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 py-10 m-10">
        {/* Small Images */}
        <div className="flex lg:flex-col gap-4 justify-center ">
          {[image1, image2, image3, image4].map((img, idx) => (
            <div key={idx} className="w-20 h-24 md:w-24 md:h-28 bg-slate-300 border border-gray-600 rounded-md overflow-hidden">
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setImage(img)}
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="w-72 md:w-96 lg:w-[500px] h-72 md:h-96 lg:h-[500px] border border-gray-700 rounded-md overflow-hidden shadow-lg">
          <img src={image} alt="" className="w-full h-full object-contain rounded-md" />
        </div>
      </div>

      {/* --- PRODUCT INFO SECTION --- */}
      <div className="w-[90%] lg:w-[50%] flex flex-col items-start justify-start gap-4 py-6">
        <h1 className="text-2xl md:text-4xl font-bold">{productData.name.toUpperCase()}</h1>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-lg md:text-xl" />
          ))}
          <FaStarHalfAlt className="text-yellow-400 text-lg md:text-xl" />
          <p className="text-sm md:text-base font-semibold pl-2">(124)</p>
        </div>

        {/* Price */}
        <p className="text-xl md:text-3xl font-semibold">{currency} {productData.price}</p>

        {/* Description */}
        <p className="text-sm md:text-lg text-gray-200 leading-relaxed">
          {productData.description} — Stylish, breathable cotton shirt with a modern slim fit. Easy to wash,
          super comfortable, and designed for effortless style.
        </p>

        {/* Sizes */}
        <div className="mt-4">
          <p className="text-lg md:text-2xl font-semibold mb-2">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {productData.sizes.map((item, index) => (
              <button
                key={index}
                className={`border py-2 px-4 rounded-md transition-all duration-200 ${item === size
                  ? 'bg-[#2f97f1] text-black font-semibold'
                  : 'bg-slate-300 text-black hover:bg-slate-400'
                  }`}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <button
          className="bg-[#2f97f1] hover:bg-[#1679c4] text-white font-semibold py-2 px-6 rounded-lg shadow-md mt-4 transition-all duration-300"
          onClick={() => addtoCart(productData._id, size)}
        >
          {loading ? <Loading /> : "Add to Cart"}
        </button>

        <div className="w-full h-px bg-slate-600 my-4"></div>

        <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-1">
          <p>✅ 100% Original Product.</p>
          <p>💵 Cash on delivery is available on this product.</p>
          <p>🔁 Easy return and exchange policy within 7 days.</p>
        </div>
      </div>

      {/* --- DESCRIPTION & RELATED SECTION --- */}
      <div className="w-full bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-start justify-start py-10 px-4 md:px-10">
        <div className="flex gap-4 mb-4 border-b border-slate-700 pb-2">
          <p className="px-5 py-2 border text-sm md:text-base">Description</p>
          <p className="px-5 py-2 border text-sm md:text-base">Reviews (124)</p>
        </div>

        <div className="w-full md:w-[80%] bg-[#3336397c] border border-slate-600 rounded-md text-gray-200 text-sm md:text-lg p-4 md:p-6">
          <p>
            Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted
            from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to
            maintain and perfect for any setting, this shirt is a must-have essential for those who value both
            fashion and function.
          </p>
        </div>

        <div className="w-full mt-10">
          <RelatedProduct
            category={productData.category}
            subCategory={productData.subCategory}
            currentProductId={productData._id}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
