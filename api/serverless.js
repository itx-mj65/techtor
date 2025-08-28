const app = require('./index');

// Vercel serverless function handler
module.exports = async (req, res) => {
    // Handle the request through Expr
    return app(req, res);
}; 