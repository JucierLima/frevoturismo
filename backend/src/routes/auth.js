const express = require('express')
const router = express.Router()
const { register, login, me, forgotPassword, resetPassword } = require('../controllers/authController')
const authMiddleware = require('../middlewares/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword) // Nova
router.post('/reset-password', resetPassword)   // Nova
router.get('/me', authMiddleware, me)

module.exports = router