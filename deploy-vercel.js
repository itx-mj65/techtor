#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel deployment for Techtornix Backend...\n');

// Check if vercel is installed
try {
    execSync('vercel --version', { stdio: 'pipe' });
} catch (error) {
    console.error('❌ Vercel CLI not found. Installing...');
    execSync('npm install -g vercel', { stdio: 'inherit' });
}

// Check if .env file exists
if (!fs.existsSync('.env')) {
    console.log('⚠️  No .env file found. Please create one with your environment variables.');
    console.log('📋 Required variables:');
    console.log('   - MONGODB_URI');
    console.log('   - JWT_SECRET');
    console.log('   - EMAIL_HOST, EMAIL_USER, EMAIL_PASS');
    console.log('   - CLIENT_URL');
    console.log('   - NODE_ENV=production\n');
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully\n');
} catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
}

// Deploy to Vercel
console.log('🚀 Deploying to Vercel...');
try {
    execSync('vercel --prod', { stdio: 'inherit' });
    console.log('\n🎉 Deployment completed successfully!');
    console.log('📱 Your backend is now live on Vercel');
} catch (error) {
    console.error('\n❌ Deployment failed');
    console.log('💡 Try running: vercel --prod');
    process.exit(1);
} 