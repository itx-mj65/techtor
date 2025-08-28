const express = require('express');
const router = express.Router();

// Import careers routes from backend
try {
    const careersRoutes = require('../backend/routes/careers');
    module.exports = careersRoutes;
} catch (error) {
    console.error('Error loading careers routes:', error);

    // Fallback route if import fails
    router.get('/', (req, res) => {
        res.json({ message: 'Careers routes loaded successfully' });
    });

    module.exports = router;
} 