import express from 'express'
import { protect, adminOnly } from '../middlewares/authMiddleware.js'
import { 
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  deactivateUser,
  activateUser
} from '../controllers/userController.js'

const router = express.Router()

// Protected and Admin routes
router.get('/', protect, adminOnly, getAllUsers)
router.get('/:id', protect, getUserById)
router.put('/:id', protect, express.json(), updateUser)
router.delete('/:id', protect, adminOnly, deleteUser)
router.put('/:id/deactivate', protect, express.json(), deactivateUser)
router.put('/:id/activate', protect, express.json(), activateUser)

export default router
