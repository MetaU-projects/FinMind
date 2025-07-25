const router = require('express').Router();
const { getMentors, pendingRequests, removeRequest } = require('../controllers/menteeController');
const { getAllConnections, requestConnection, updateRequestStatus, createMentorship, updateMentorship, endMentorship } = require('../controllers/mentorshipController');
const { getMenteeRequests } = require('../controllers/mentorController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const mentorRecomendations = require('../controllers/recommendController');
const suggestSession = require('../controllers/sessionController');
const { getInterests } = require('../controllers/interestController');
const { createSession, removeSession, sessionsHistory, upcomingSessions, getTotalUpcoming } = require('../controllers/schedule.controller');
const { getTasks, createTask, updateTask, activeTasks } = require('../controllers/taskController');
const { searchMentors } = require('../controllers/searchController');


router.get('/mentee/home', isAuthenticated, getMentors);
router.get('/connections', isAuthenticated, getAllConnections);
router.post('/request', isAuthenticated, requestConnection);
router.patch('/request/update', isAuthenticated, updateRequestStatus);
router.get('/requests/mentor', isAuthenticated, getMenteeRequests);
router.post('/connected', isAuthenticated, createMentorship);
router.patch('/connected/update', isAuthenticated, updateMentorship);
router.get('/pending', isAuthenticated, pendingRequests);
router.delete('/request/remove/:requestId', isAuthenticated, removeRequest);
router.delete('/connection/remove/:connectionId', isAuthenticated, endMentorship);
router.get('/recommendations', isAuthenticated, mentorRecomendations);
router.get('/suggest-time/:mentorId', isAuthenticated, suggestSession);
router.get('/interests', getInterests);
router.post('/session', isAuthenticated, createSession);
router.delete('/remove/session/:sessionId', isAuthenticated, removeSession);
router.get('/session/past/:mentorshipId', isAuthenticated, sessionsHistory);
router.get('/session/upcoming/:mentorshipId', isAuthenticated, upcomingSessions);
router.post('/task', isAuthenticated, createTask);
router.get('/task/:mentorshipId', isAuthenticated, getTasks);
router.patch('/task/update', isAuthenticated, updateTask);
router.get('/task/active/total', isAuthenticated, activeTasks);
router.get('/session/total', isAuthenticated, getTotalUpcoming);
router.get('/mentor/search', isAuthenticated, searchMentors);

module.exports = router;