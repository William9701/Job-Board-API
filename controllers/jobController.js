const Job = require('../models/Job');
const Company = require('../models/Company');

const createJob = async (req, res) => {
  try {
    const { title, description, companyId } = req.body;
    if (!title || !description || !companyId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const company = await Company.findOne({ where: { id: companyId } });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const job = await Job.create({ title, description, CompanyId: companyId });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const jobs = await Job.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: Company, attributes: ['name', 'industry', 'location'] }],
    });
    res.json({
      jobs: jobs.rows,
      totalPages: Math.ceil(jobs.count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [{ model: Company, attributes: ['name', 'industry', 'location'] }],
    });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createJob, getJobs, getJobById };