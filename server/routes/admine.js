import express from 'express'
import authMiddleware from '../middleware/authMiddleware'
import checkRole from '../middleware/roleMiddleware'

const router = express.Router()

router.get('/', authMiddleware, checkRole(['admin']), (req, res) => {
    res.json({message: `welcome admine ${req.user.id}`})
})

export default router