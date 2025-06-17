import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  material: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specification: {
    type: String,
    required: true,
  },
  color: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        // Check if array is not empty
        if (!Array.isArray(v) || v.length === 0) {
          return false;
        }
        // Validate each color is a valid HEX code
        const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return v.every(color => hexColorRegex.test(color));
      },
      message: 'Colors must be valid HEX codes (e.g., #FF0000) and at least one color must be specified'
    }
  },
  images: {
    type: [String], // Mảng ảnh sản phẩm
    default: [],
  },
  category: {
    type: String,
    default: "general", // ví dụ: bàn, ghế, tủ...
  },
  isAvailable: {
    type: Boolean,
    default: true, // để chủ động tắt sản phẩm nếu hết hàng
  }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
