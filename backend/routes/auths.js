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
router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

// Protected routes
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)

export default router