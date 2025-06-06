import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

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

/**
 * Validate image file before uploading
 * @param {Object} file - The file object from multer
 * @throws {Error} If file type is invalid or size exceeds limit
 */
const validateImage = (file) => {
  // Define allowed image types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  // Set maximum file size (5MB)
  const maxSize = 5 * 1024 * 1024;

  // Check if file type is allowed
  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.');
  }

  // Check if file size is within limit
  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.');
  }
};

/**
 * Safely delete an image file from the filesystem
 * @param {string} imagePath - Path to the image file
 */
const deleteImageFile = async (imagePath) => {
  try {
    // Check if file exists before attempting to delete
    if (fs.existsSync(imagePath)) {
      await fs.promises.unlink(imagePath);
    }
  } catch (error) {
    console.error(`Error deleting image ${imagePath}:`, error.message);
  }
};

/**
 * Create a new product with image handling
 * @route POST /api/products
 */
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

    // Check if product name already exists
    const existProduct = await checkNameProduct(name);
    if (existProduct) {
      return res.status(400).json({ message: "Product name already exists" });
    }

    // Validate all uploaded images
    if (req.files) {
      for (const file of req.files) {
        validateImage(file);
      }
    }

    // Get paths of uploaded images
    const images = req.files ? req.files.map((file) => file.path) : [];

    // Create new product with image paths
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
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    // If there's an error, clean up any uploaded images
    if (req.files) {
      await Promise.all(req.files.map(file => deleteImageFile(file.path)));
    }
    res.status(500).json({ message: error.message || "Error creating product" });
  }
};

/**
 * Update an existing product with image handling
 * @route PUT /api/products/:id
 */
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

    // Find existing product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if new name conflicts with other products
    const existingProduct = await checkNameProduct(name);
    if (existingProduct && existingProduct._id.toString() !== id) {
      return res.status(400).json({ message: "Product name already exists" });
    }

    // Validate new images if any are uploaded
    if (req.files) {
      for (const file of req.files) {
        validateImage(file);
      }
    }

    let images;
    if (req.files && req.files.length > 0) {
      // Get paths of new images
      images = req.files.map((file) => file.path);

      // Delete old images if new ones are uploaded
      if (product.images && product.images.length > 0) {
        await Promise.all(product.images.map(imgPath => deleteImageFile(imgPath)));
      }
    }

    // Prepare update data
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

    // Add new images to update data if any
    if (images) {
      updateData.images = images;
    }

    // Update product in database
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ message: `Product updated successfully` });
  } catch (error) {
    // Clean up any newly uploaded images if there's an error
    if (req.files) {
      await Promise.all(req.files.map(file => deleteImageFile(file.path)));
    }
    console.error("Update error:", error.message);
    res.status(500).json({ message: error.message || "Error updating product" });
  }
};

/**
 * Delete a product and its associated images
 * @route DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Find and delete product
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete all associated images
    if (product.images && product.images.length > 0) {
      await Promise.all(product.images.map(imgPath => deleteImageFile(imgPath)));
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error deleting product" });
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
