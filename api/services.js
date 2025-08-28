const express = require('express');
const router = express.Router();

// Import services routes from backend
try {
    const servicesRoutes = require('../backend/routes/services');
    module.exports = servicesRoutes;
} catch (error) {
    console.error('Error loading services routes:', error);

    // Fallback route if import fails
    router.get('/', (req, res) => {
        res.json({ message: 'Services routes loaded successfully' });
    });

    module.exports = router;
} 