const express = require('express');
const router = express.Router();

// Import blog routes from backend
try {
    const blogRoutes = require('../backend/routes/blog');
    module.exports = blogRoutes;
} catch (error) {
    console.error('Error loading blog routes:', error);

    // Fallback route if import fails
    router.get('/', (req, res) => {
        res.json({ message: 'Blog routes loaded successfully' });
    });

    module.exports = router;
} 