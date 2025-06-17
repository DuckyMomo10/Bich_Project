import express from "express";
import {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public routes - Không cần xác thực
router.get("/", getProducts);
router.get("/product/:id", getProductById);


// Protected admin routes - Yêu cầu xác thực và quyền admin
router.post(
  "/create",
  protect,
  adminOnly,
  upload.array("images", 5),
  createProduct
);

router.put(
  "/update/:id",
  protect,
  adminOnly,
  upload.array("images", 5),
  updateProduct
);

router.delete("/delete/:id", protect, adminOnly, deleteProduct);

export default router;
