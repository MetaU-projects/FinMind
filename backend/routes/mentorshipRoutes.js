const router = require('express').Router();
const { getMentors } = require('../controllers/menteeController');
const { getAllConnections, requestConnection, updateRequestStatus } = require('../controllers/mentorshipController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/mentee/home', isAuthenticated, getMentors);
router.get('/connections', isAuthenticated, getAllConnections);
router.post('/request', isAuthenticated, requestConnection);
router.patch('/request/update', isAuthenticated, updateRequestStatus);

module.exports = router;