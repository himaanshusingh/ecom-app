import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

export async function addProduct(req, res) {
  try {
    const { name, description, price, category } = req.body;
    const { subCategory, sizes, bestseller } = req.body;

    // Converting images to url :-
    const imagesArr = req.files.images;
    const images = imagesArr.filter((image) => image != undefined);
    const imagesUrl = await Promise.all(
      images.map((item) =>
        cloudinary.uploader
          .upload(item.path, { resource_type: "image" })
          .then((res) => res.secure_url)
          .catch((err) => console.log(err)),
      ),
    );

    // Creating a new product :-
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: Boolean(bestseller),
      image: imagesUrl,
      date: Date.now(),
    };

    await productModel.create(productData);
    res.status(200).json({ success: true, message: "Product added" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function listProducts(req, res) {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function removeProduct(req, res) {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function singleProduct(req, res) {
  try {
    const product = await productModel.findById(req.body.id);
    res.status(200).json({ success: true, product });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
}
