import Product from "../models/Product.js";
import fs from "fs";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const products = await Product.find().skip(skip).limit(limitNumber).exec();

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limitNumber);

    res.json({
      products,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

// Check name product is exist
const checkNameProduct = async (name) => {
  const product = await Product.findOne({
    name: { $regex: new RegExp("^" + name + "$", "i") },
  });
  return product;
};

// Create new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      specification,
      color,
      quantity,
      category,
      isAvailable,
    } = req.body;

    const existProduct = await checkNameProduct(name);
    if (existProduct) {
      return res.status(400).json({ message: "Product name already exists" });
    }

    const images = req.files ? req.files.map((file) => file.path) : [];

    const newProduct = new Product({
      name,
      price,
      description,
      specification,
      color,
      quantity,
      category,
      isAvailable,
      images,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct }); 
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      description,
      specification,
      color,
      quantity,
      category,
      isAvailable,
    } = req.body;

    // Lấy sản phẩm hiện tại
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Kiểm tra trùng tên với sản phẩm khác
    const existingProduct = await checkNameProduct(name);
    if (existingProduct && existingProduct._id.toString() !== id) {
      return res.status(400).json({ message: "Product name already exists" });
    }

    // Xử lý ảnh mới
    let images;
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path);

      // Xoá ảnh cũ
      if (product.images && product.images.length > 0) {
        product.images.forEach((imgPath) => {
          fs.unlink(imgPath, (err) => {
            if (err) {
              console.log("Error deleting old image: ", err.message);
            }
          });
        });
      }
    }

    // Cập nhật dữ liệu
    const updateData = {
      name,
      price,
      description,
      specification,
      color,
      quantity,
      category,
      isAvailable,
    };

    if (images) {
      updateData.images = images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ message: `Product ${name} updated successfully` });
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.images?.forEach((imgPath) => {
      fs.unlink(imgPath, (err) => {
        if (err) console.log("Error deleting image:", err.message);
      });
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error getting product" });
  }
};
    