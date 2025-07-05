const router = require('express').Router();
const { getMentors } = require('../controllers/menteeController');
const { getAllConnections, requestConnection, updateRequestStatus, createMentorship, updateMentorship } = require('../controllers/mentorshipController');
const { getMenteeRequests } = require('../controllers/mentorController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/mentee/home', isAuthenticated, getMentors);
router.get('/connections', isAuthenticated, getAllConnections);
router.post('/request', isAuthenticated, requestConnection);
router.patch('/request/update', isAuthenticated, updateRequestStatus);
router.get('/requests/mentor', isAuthenticated, getMenteeRequests);
router.post('/connected', isAuthenticated, createMentorship);
router.patch('/connected/update', isAuthenticated, updateMentorship);

module.exports = router;