const router = require('express').Router();
const { getMentors } = require('../controllers/menteeController');
const { getAllConnections, requestConnection, updateRequestStatus, createMentorship, updateMentorship } = require('../controllers/mentorshipController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/mentee/home', isAuthenticated, getMentors);
router.get('/connections', isAuthenticated, getAllConnections);
router.post('/request', isAuthenticated, requestConnection);
router.patch('/request/update', isAuthenticated, updateRequestStatus);
router.post('/connected', isAuthenticated, createMentorship);
router.post('/connected/update', isAuthenticated, updateMentorship);

module.exports = router;