const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);
router.post('/', authMiddleware, roleMiddleware(['company_admin']), jobController.createJob);

module.exports = router;