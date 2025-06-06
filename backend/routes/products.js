import express from 'express'
import {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct
} from '../controllers/productController.js'

import upload from '../middlewares/uploadMiddleware.js'

const router = express.Router()

// Upload và tạo sản phẩm
router.post('/create', upload.array('images', 5), createProduct)

// Cập nhật sản phẩm và ảnh mới nếu có
router.put('/update/:id', upload.array('images', 5), updateProduct)

// Lấy danh sách sản phẩm
router.get('/', getProducts)

// Lấy sản phẩm theo ID
router.get('/product/:id', getProductById)

// Xoá sản phẩm
router.delete('/delete/:id', deleteProduct)

export default router;
