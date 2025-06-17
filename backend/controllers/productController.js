import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

// Get all products (without category filter)
export const getProducts = async (req, res) => {
  try {
    // Lấy toàn bộ sản phẩm từ DB, không phân trang
    const products = await Product.find().exec();
    console.log("Fetched products from database:", products);

    // Xử lý hình ảnh mặc định nếu thiếu
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const formattedProducts = products.map((product) => ({
      ...product.toObject(),
      images:
        product.images?.length > 0
          ? product.images
          : [`${baseUrl}/api/uploads/default-image.jpg`],
    }));

    res.json({
      products: formattedProducts,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
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
 * Validate HEX color code
 * @param {string} color - The color code to validate
 * @returns {boolean} Whether the color code is valid
 */
const isValidHexColor = (color) => {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(color);
};

/**
 * Validate array of colors
 * @param {Array} colors - Array of color codes to validate
 * @returns {boolean} Whether all colors are valid
 */
const validateColors = (colors) => {
  if (!Array.isArray(colors) || colors.length === 0) {
    return false;
  }
  return colors.every(color => isValidHexColor(color));
};

/**
 * Validate image file before uploading
 * @param {Object} file - The file object from multer
 * @throws {Error} If file type is invalid or size exceeds limit
 */
const validateImage = (file) => {
  // Define allowed image types
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  // Set maximum file size (5MB)
  const maxSize = 5 * 1024 * 1024;

  // Check if file type is allowed
  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error("Loại file không hợp lệ. Chỉ chấp nhận JPEG, PNG và GIF.");
  }

  // Check if file size is within limit
  if (file.size > maxSize) {
    throw new Error("Kích thước file quá lớn. Kích thước tối đa là 5MB.");
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
    console.log('Dữ liệu request:', req.body);
    const {
      name,
      price,
      material,
      description,
      specification,
      color,
      category,
      isAvailable,
    } = req.body;

    // Check if product name already exists
    const existProduct = await checkNameProduct(name);
    if (existProduct) {
      return res.status(400).json({ message: "Tên sản phẩm đã tồn tại" });
    }

    // Validate colors
    const colors = Array.isArray(color) ? color : [color];
    if (!validateColors(colors)) {
      return res.status(400).json({ 
        message: "Màu sắc không hợp lệ. Vui lòng sử dụng mã màu HEX (ví dụ: #FF0000)" 
      });
    }

    // Validate all uploaded images
    if (req.files) {
      for (const file of req.files) {
        validateImage(file);
      }
    }

    // Convert image paths to full URLs
    const images = req.files
      ? req.files.map(file => {
          console.log('Tên file gốc:', file.filename);
          let filename = file.filename;
          // Loại bỏ tiền tố /api/uploads/ nếu đã tồn tại
          if (filename.includes('/api/uploads/')) {
            filename = filename.split('/api/uploads/').pop();
          }
          return `${req.protocol}://${req.get("host")}/api/uploads/${filename}`;
        })
      : [];

    // Create new product
    const newProduct = new Product({
      name,
      price,
      material,
      description,
      specification,
      color: colors,
      category,
      isAvailable,
      images,
    });

    await newProduct.save();
    res.status(201).json({
      message: "Tạo sản phẩm thành công",
      product: newProduct,
    });
  } catch (error) {
    // Clean up uploaded images if error
    if (req.files) {
      await Promise.all(req.files.map((file) => deleteImageFile(file.path)));
    }
    res
      .status(500)
      .json({ message: error.message || "Lỗi khi tạo sản phẩm" });
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
      material,
      description,
      specification,
      color,
      category,
      isAvailable,
    } = req.body;

    // Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Validate colors
    const colors = Array.isArray(color) ? color : [color];
    if (!validateColors(colors)) {
      return res.status(400).json({ 
        message: "Màu sắc không hợp lệ. Vui lòng sử dụng mã màu HEX (ví dụ: #FF0000)" 
      });
    }

    // Check name conflict
    const existingProduct = await checkNameProduct(name);
    if (existingProduct && existingProduct._id.toString() !== id) {
      return res.status(400).json({ message: "Product name already exists" });
    }

    // Validate new images
    if (req.files) {
      for (const file of req.files) {
        validateImage(file);
      }
    }

    let images;
    if (req.files && req.files.length > 0) {
      // Convert new image paths to URLs
      images = req.files.map(file => {
          console.log('Tên file gốc trong updateProduct:', file.filename);
          let filename = file.filename;
          // Loại bỏ tiền tố /api/uploads/ nếu đã tồn tại
          if (filename.includes('/api/uploads/')) {
            filename = filename.split('/api/uploads/').pop();
          }
          return `${req.protocol}://${req.get("host")}/api/uploads/${filename}`;
        });

      // Delete old images
      if (product.images && product.images.length > 0) {
        const imagePaths = product.images.map((url) =>
          path.join("uploads", path.basename(url))
        );
        await Promise.all(
          imagePaths.map((imgPath) => deleteImageFile(imgPath))
        );
      }
    }

    // Prepare update data
    const updateData = {
      name,
      price,
      material,
      description,
      specification,
      color: colors,
      category,
      isAvailable,
    };

    if (images) {
      updateData.images = images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    if (req.files) {
      await Promise.all(req.files.map((file) => deleteImageFile(file.path)));
    }
    console.error("Update error:", error.message);
    res
      .status(500)
      .json({ message: error.message || "Error updating product" });
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
      await Promise.all(
        product.images.map((imgPath) => deleteImageFile(imgPath))
      );
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error deleting product" });
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

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productObj = product.toObject();

    productObj.images =
      productObj.images?.length > 0
        ? productObj.images
        : [`${baseUrl}/api/uploads/default-image.jpg`]; // fallback ảnh nếu không có

    res.status(200).json(productObj);
  } catch (error) {
    res.status(500).json({ message: "Error getting product" });
  }
};




