import express from 'express'
import { 
  login, 
  register, 
  updateUserProfile, 
  getUserProfile,
  forgotPassword,
  resetPassword 
} from '../controllers/authController.js'
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router()

// Public routes
router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

// Protected routes
router.get('/profile', verifyToken, getUserProfile)
router.put('/profile', verifyToken, updateUserProfile)

export default router