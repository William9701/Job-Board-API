const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const Company = require('../models/Company');

const createApplication = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    if (!jobId) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const application = await Application.create({
      UserId: req.user.id,
      JobId: jobId,
      coverLetter,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { UserId: req.user.id },
      include: [{ model: Job, include: [{ model: Company }] }],
    });
    const all = await Application.findAll();
    console.log(all)
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompanyApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      include: [
        {
          model: Job,
          where: { CompanyId: req.user.companyId }, // Assuming companyId is set in user model or token
          include: [{ model: Company }],
        },
        { model: User, attributes: ['name', 'email'] },
      ],
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createApplication, getUserApplications, getCompanyApplications };