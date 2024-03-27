const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated'); // Import isAuthenticated middleware
const dataController = require('../controllers/dataController');

// Apply isAuthenticated middleware to protect data API routes
// router.use(isAuthenticated);

// Define data API routes
router.get('/allDataset', dataController.getData);
router.get('/dataset/:id', dataController.getDatasetById);
router.get('/userDataset', isAuthenticated, dataController.getFollowedData);

module.exports = router;