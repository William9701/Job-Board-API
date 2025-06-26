const Company = require('../models/Company');

const createCompany = async (req, res) => {
  try {
    const { name, industry, location } = req.body;

    // Validate required fields
    if (!name || !industry || !location) {
      return res.status(400).json({ error: 'Name, industry, and location are required' });
    }

    // Create company
    const company = await Company.create({
      name,
      industry,
      location,
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCompany };