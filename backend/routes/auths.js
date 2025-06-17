import express from 'express'
import { 
  login, 
  register, 
  updateUserProfile, 
  getUserProfile,
  forgotPassword,
  resetPassword 
} from '../controllers/authController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Public routes
router.post('/register', express.json(), register)
router.post('/login', express.json(), login)
router.post('/forgot-password', express.json(), forgotPassword)
router.post('/reset-password', express.json(), resetPassword)

// Protected routes
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, express.json(), updateUserProfile)

export default router