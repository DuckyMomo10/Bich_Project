const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },            // tên tại thời điểm thêm
  price: { type: Number, required: true },           // giá tại thời điểm thêm
  color: { type: String, required: true },
  specification: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false }); // Không tạo _id riêng cho từng item (giảm rác nếu không cần)

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // true nếu bạn bắt buộc login mới có giỏ hàng
  },
  items: [CartItemSchema],
  status: {
    type: String,
    enum: ['active', 'checked_out', 'abandoned'],
    default: 'active',
  },
}, { timestamps: true }); // Thay vì tự tạo createdAt, updatedAt

module.exports = mongoose.model('Cart', CartSchema);
// Lưu ý: Giỏ hàng chỉ có thể có 1 bản ghi cho 1 user, nếu muốn có nhiều giỏ hàng thì thêm unique: true vào user