const router = require('express').Router();
const { getMentors } = require('../controllers/menteeController');
const { getAllConnections } = require('../controllers/mentorshipController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/mentee/home', isAuthenticated, getMentors);
router.get('/connections', isAuthenticated, getAllConnections);

module.exports = router;