const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const {signup, login, isLoggedIn, logout} = require('../controllers/authController');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts. Try again later!',
})

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', isLoggedIn);
router.post('/logout', logout);


module.exports = router;