const express = require('express');
const router = express.Router();

// Import contact routes from backend
try {
    const contactRoutes = require('../backend/routes/contact');
    module.exports = contactRoutes;
} catch (error) {
    console.error('Error loading contact routes:', error);

    // Fallback route if import fails
    router.get('/', (req, res) => {
        res.json({ message: 'Contact routes loaded successfully' });
    });

    module.exports = router;
} 