const express = require('express');
const router = express.Router();

// Test route to verify the endpoint is working
router.get('/', (req, res) => {
    res.json({
        message: 'Auth endpoint is working!',
        timestamp: new Date().toISOString(),
        status: 'success'
    });
});

// Import auth routes from backend
try {
    const authRoutes = require('../backend/routes/auth');

    // Merge the imported routes with our test route
    Object.keys(authRoutes.stack || []).forEach(layer => {
        if (layer.route) {
            router.use(layer.route.path, layer.route.stack);
        }
    });

    console.log('Auth routes loaded successfully from backend');
} catch (error) {
    console.error('Error loading auth routes from backend:', error);

    // Add more test routes if import fails
    router.get('/test', (req, res) => {
        res.json({ message: 'Auth test route working' });
    });

    router.get('/login', (req, res) => {
        res.json({ message: 'Login endpoint placeholder' });
    });
}

module.exports = router; 