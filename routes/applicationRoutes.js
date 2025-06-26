const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/', authMiddleware, applicationController.createApplication);
router.get('/me', authMiddleware, applicationController.getUserApplications);
router.get('/company', authMiddleware, roleMiddleware(['company_admin']), applicationController.getCompanyApplications);

module.exports = router;