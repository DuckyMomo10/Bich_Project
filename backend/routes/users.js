import express from 'express'
import { verifyToken, verifyAdmin } from '../middlewares/auth.js'
import { 
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  deactivateUser,
  activateUser
} from '../controllers/userController.js'

const router = express.Router()

// Admin only routes
router.use(verifyToken, verifyAdmin)

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/deactivate', deactivateUser)
router.put('/:id/activate', activateUser)

export default router
