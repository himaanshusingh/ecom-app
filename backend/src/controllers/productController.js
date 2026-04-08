import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Controller of adding a product :-
export async function addProduct(req, res) {
  try {
    const { name, description, price, category } = req.body;
    const { subCategory, sizes, bestseller } = req.body;
    const { image1, image2, image3, image4 } = req.files;

    const imageList = [image1?.[0], image2?.[0], image3?.[0], image4?.[0]];
    const images = imageList.filter((image) => image != undefined);

    // Converting images to url :-
    const imagesUrl = await Promise.all(
      images.map((image) =>
        cloudinary.uploader
          .upload(image.path, { resource_type: "image" })
          .then((res) => res.secure_url)
          .catch((err) => console.log(err.message)),
      ),
    );

    // Creating a new product :-
    const productData = {
      name,
      category,
      subCategory,
      description,
      images: imagesUrl,
      price: Number(price),
      sizes: JSON.parse(sizes),
      bestseller: Boolean(bestseller),
      date: Date.now(),
    };

    const product = await productModel.create(productData);
    res.status(200).json({ success: true, message: "Product added", product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

// Controller of removing a product :-
export async function removeProduct(req, res) {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

// Controller of sending a single product :-
export async function singleProduct(req, res) {
  try {
    const product = await productModel.findById(req.body.id);
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

// Controller of sending all products :-
export async function listProducts(req, res) {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}
