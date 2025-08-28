const express = require('express');
const router = express.Router();

// Import admin routes from backend
try {
    const adminRoutes = require('../backend/routes/admin');
    module.exports = adminRoutes;
} catch (error) {
    console.error('Error loading admin routes:', error);

    // Fallback route if import fails
    router.get('/', (req, res) => {
        res.json({ message: 'Admin routes loaded successfully' });
    });

    module.exports = router;
} 