const User = require('../models/User');
const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
      const { name, email, password, role, companyId } = req.body;
  
      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }
  
      // Validate role
      const validRoles = ['user', 'company_admin'];
      if (role && !validRoles.includes(role)) {
        return res.status(400).json({ error: `Invalid role. Must be one of: ${validRoles.join(', ')}` });
      }
  
      // Require companyId for company_admin role
      if (role === 'company_admin' && !companyId) {
        return res.status(400).json({ error: 'companyId is required for company_admin role' });
      }
  
      // Validate companyId if provided
      if (companyId) {
        const company = await Company.findOne({ where: { id: companyId } });
        if (!company) {
          
          return res.status(400).json({ error: 'Invalid companyId' });
        }
      }
  
      // Check for existing user
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      // Create user
      const user = await User.create({
        name,
        email,
        password,
        role: role || 'user',
        companyId: role === 'company_admin' ? companyId : null,
      });
  
      // Generate JWT
      const token = jwt.sign({ id: user.id, role: user.role, companyId: user.companyId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
  
      res.status(201).json({ 
        user: { id: user.id, name, email, role: user.role, companyId: user.companyId }, 
        token 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ user: { id: user.id, name: user.name, email, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };