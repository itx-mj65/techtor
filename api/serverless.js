const app = require('./index');

// Vercel serverless function handler
module.exports = async (req, res) => {
    // Handle the request through Express
    return app(req, res);
}; 