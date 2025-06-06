import express from 'express'
import { login, register, updateUserProfile, getUserProfile } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/update/:id', updateUserProfile)
router.get('/profile/:id', getUserProfile)


export default router