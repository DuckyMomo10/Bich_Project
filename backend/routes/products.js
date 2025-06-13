import express from 'express'
import {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct
} from '../controllers/productController.js'
import { protect, adminOnly } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/uploadMiddleware.js'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/product/:id', getProductById)

// Protected admin routes
router.post('/create', protect, adminOnly, upload.array('images', 5), createProduct)
router.delete('/delete/:id', protect, adminOnly, deleteProduct)

// Cập nhật sản phẩm và ảnh mới nếu có
router.put('/update/:id', upload.array('images', 5), updateProduct)

export default router;
