const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const companyRoutes = require('./routes/companyRoutes');
const User = require('./models/User');
const Company = require('./models/Company');
const Job = require('./models/Job');
const Application = require('./models/Application');

const app = express();

// Middleware
app.use(express.json());

// Define associations
User.hasMany(Application, { foreignKey: 'UserId' });
Company.hasMany(Job, { foreignKey: 'CompanyId' });
Job.hasMany(Application, { foreignKey: 'JobId' });
Application.belongsTo(User, { foreignKey: 'UserId' });
Application.belongsTo(Job, { foreignKey: 'JobId' });
Job.belongsTo(Company, { foreignKey: 'CompanyId' });
User.belongsTo(Company, { foreignKey: 'companyId' });

// Routes
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);
app.use('/companies', companyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Sync database and start server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => console.error('Unable to sync database:', err));