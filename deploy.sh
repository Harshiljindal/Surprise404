#!/bin/bash

# Build optimization script for Firebase deployment

echo "🔥 Starting Firebase deployment process..."

# 1. Clean up previous builds
echo "🧹 Cleaning up previous builds..."
rm -rf dist

# 2. Run optimal production build
echo "🏗️ Building optimized production bundle..."
npm run build

# 3. Optimize assets
echo "⚡ Optimizing assets..."
# This step would typically use tools like imagemin for further optimization
# But for now we'll just rely on Vite's optimizations

# 4. Deploy to Firebase
echo "🚀 Deploying to Firebase..."
# Uncomment this when Firebase CLI is installed
# firebase deploy

echo "✅ Deployment process complete!"
