const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const {signup, login} = require('../controllers/authController');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts. Try again later!',
})

router.post('/signup', signup);
router.post('/login', loginLimiter, login);


module.exports = router;