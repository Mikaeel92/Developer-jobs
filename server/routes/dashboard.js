import express from 'express'
import authMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router.get('/', authMiddleware, (req, res) => {
    if (!req.user) {
  return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({
        message: `Welcome user ${req.user.id}`, 
        role: req.user.role
    })
})

export default router