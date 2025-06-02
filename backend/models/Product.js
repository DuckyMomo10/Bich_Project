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
  description: {
    type: String,
    required: true,
  },
  specification: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
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
