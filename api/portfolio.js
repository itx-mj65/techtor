const express = require('express');
const router = express.Router();

// Import portfolio routes from backend
try {
    const portfolioRoutes = require('../backend/routes/portfolio');
    module.exports = portfolioRoutes;
} catch (error) {
    console.error('Error loading portfolio routes:', error);

    // Fallback route if import fails
    router.get('/', (req, res) => {
        res.json({ message: 'Portfolio routes loaded successfully' });
    });

    module.exports = router;
} 